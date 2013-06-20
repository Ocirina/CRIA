/*global Application, app, $, EventController, fabric, stopEvent, capitaliseFirstLetter, isEmpty, jQuery */
/*jslint browser: true, node: true, nomen: true, plusplus: true */
/*global document: false */

(function ($, window) {
    "use strict";

    var dimensions = {
            "4": {
                width: 270,
                height: 532
            },
            "5": {
                width: 270,
                height: 569
            }
        },
        _phoneType = 4,
        _caseType = 0,
        canvas = null,
        $body = $(document.body),
        $doc = $(document),
        $window = $(window),
        Handler = {
            handleTextObject: function (obj) {
                $('#text').find('button').attr('disabled', false);
                $('#text textarea').val(obj.getText());
            },
            handleDefaultObject: function (obj) { }
        },
        CANVAS_SETTINGS = {
            centerTransform: true,
            controlsAboveOverlay: true,
            selectionBorderColor: "black",
            selectionColor: "rgba(255, 255, 255, 0.3)",
            selectionLineWidth: 2
        },
        canvasLoaded = false;

    function refreshCanvas() {
        canvas.calcOffset();
        canvas.renderAll();
    }

    function initCanvas() {
        if (isEmpty(canvas)) {
            canvas = new fabric.Canvas('case-editor', CANVAS_SETTINGS);
            canvas.setBackgroundColor('#000000');
        }
    }

    function calculateRatio(data, canvasHeight, canvasWidth) {
        var img = document.createElement('img'),
            photoImgWidth = img.width,
            photoImgHeight = img.height,
            hRatio,
            vRatio;

        img.src = data;

        if (photoImgWidth < canvasWidth && photoImgHeight < canvasHeight) {
            return 1;
        }

        hRatio = canvasWidth / photoImgWidth;
        vRatio = canvasHeight / photoImgHeight;
        return Math.min(hRatio, vRatio);
    }

    function calculateCenter() {
        var finalWidth = (dimensions[_phoneType].width / 2),
            finalHeight = (dimensions[_phoneType].height / 2);

        return { left: finalWidth, top: finalHeight };
    }

    function addSvg(svg) {
        var loadedObject = null,
            offset = 50,
            svgSettings = {
                left: fabric.util.getRandomInt(offset, 270 - offset),
                top: fabric.util.getRandomInt(offset, 650 - offset),
                angle: fabric.util.getRandomInt(-20, 40),
                padding: 10,
                cornersize: 10
            };

        fabric.loadSVGFromURL(svg, function (objects, options) {
            loadedObject = fabric.util.groupSVGElements(objects, options);
            loadedObject.set(svgSettings);
            canvas.add(loadedObject);
            refreshCanvas();
        });
    }

    function addImageToCanvas(data) {
        var ratio, settings;

        fabric.Image.fromURL(data, function (obj) {
            ratio = calculateRatio(
                data,
                dimensions[_phoneType].width,
                dimensions[_phoneType].height
            );
            settings = calculateCenter();
            canvas.add(obj.scale(ratio).set(settings));
            refreshCanvas();
        });
    }

    function addFiles(files) {
        var reader = null, i = 0, f = null;

        function readFile(f) {
            reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    addImageToCanvas(e.target.result, canvas);
                };
            }(f));
            reader.readAsDataURL(f);
        }

        for (i = 0; i < files.length; i++) {
            f = files[i];
            if (f.type.match('image.*')) {
                readFile(f);
            }
        }
    }

    function addText(text, settings) {
        var dimensions;
        dimensions = calculateCenter();
        settings.left = dimensions.left;
        settings.top = dimensions.top;
        text = new fabric.Text(text, settings);
        canvas.add(text);
        refreshCanvas();
    }

    function saveCanvasToSession() {
        var jsonCanvas = null,
            design = {},
            typeOfPage = document.getElementById("putCanvas");

        if (typeOfPage === null) {
            jsonCanvas = JSON.stringify(canvas);
            design.canvas = jsonCanvas;
            design.phone = _phoneType;
            design.case = _caseType;
            window.sessionStorage.design = JSON.stringify(design);
        }
    }

    function leavingPage(e) {
        canvasLoaded = false;
        $body.removeClass('case-editor');
        saveCanvasToSession();

        $doc.off('StartEditor');
        if (e.type === "beforeunload") {
            return 'Weet u zeker dat u de pagina wilt verlaten zonder op te slaan?';
        }
        canvas = null;
    }

    $window.on('beforeunload', leavingPage);
    $window.on('hashchange', leavingPage);

    $doc.ready(function (e) {
        $body.addClass('case-editor');
    });

    function setObjectSelected() {
        function handleType(fn, obj) {
            try {
                Handler[fn](obj);
            } catch (err) {
                Handler.handleDefaultObject(obj);
            }
        }

        function handleSelected(e) {
            var selectedObject = e.target,
                type = selectedObject.type,
                fn = 'handle' + capitaliseFirstLetter(type) + 'Object';

            $('#object-controls').show();

            handleType(fn, selectedObject);
        }

        function handleDeselected(e) {
            $('#object-controls').hide();
        }

        canvas.on('object:selected', handleSelected);
        canvas.on('group:selected', handleSelected);
        canvas.on('selection:cleared', handleDeselected);
    }

    function setCanvasDimensions(phoneId, caseId) {
        _phoneType = phoneId;
        _caseType = (caseId || 1);
        canvas.setWidth(dimensions[phoneId].width);
        canvas.setHeight(dimensions[phoneId].height);
        canvas.renderAll();
    }

    if (hasFileUploadSupport()) {
        $('#upload').show();
        $('#upload').on('change', function (e) {
            addFiles(e.target.files, canvas);

            return stopEvent(e);
        });

    } else {
        $('#upload').hide();
    }

    function move(el, value) {
        $(el).animate({ left: value },
            500, function () { });
    }

    function loadCanvasFromData(data) {
        if (data && data.hasOwnProperty('canvas') && !canvasLoaded) {
            canvas.loadFromJSON(data.canvas);
            refreshCanvas();
            canvasLoaded = true;
        }
    }

    function setBackground(background, hex) {
        var setting = background;
        if (isEmpty(hex)) {
            hex = false;
        }
        if (!hex) {
            setting = {
                source: background,
                repeat: 'repeat'
            };
        }
        canvas.setBackgroundColor(setting, function () {
            refreshCanvas();
        });
    }

    function handleDroppedFiles(e) {
        //addFiles(e.dataTransfer.files, canvas);
        return stopEvent(e);
    }

    function addTextToCanvas(text, weight) {
        var textArray = new fabric.Text(text, {
            fontSize: 20,
            lineHeight: 1,
            originX: 'left',
            fontFamily: 'Helvetica',
            fontWeight: weight
        });
        canvas.add(textArray);
        refreshCanvas();
    }

    /* TEKST FUNCS */
    function handleDelete(e) {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeGroup) {
            activeGroup.forEachObject(function (o) {
                canvas.remove(o);
            });
            canvas.discardActiveGroup();
        } else if (activeObject) {
            canvas.remove(canvas.getActiveObject());
        }
        refreshCanvas();
    }

    function setChange(style, input, $this) {
        var element = canvas.getActiveObject();

        function toggleInput(element, style, input, $this) {
            if (element[style] === input) {
                element[style] = "normal";
            } else {
                element[style] = input;
            }

            $this.toggleClass('active');
        }

        if (!isEmpty(element) && element.type === "text") {
            toggleInput(element, style, input, $this);
            refreshCanvas();
        }
    }

    function handleChange(e) {
        var $this = $(e.target),
            type = $this.data('type'),
            setting = $this.data('setting') || $this.val(),
            input = $this.attr('type');

        if (input === 'number' || input === 'range') {
            setting = parseInt(setting, 10);
        }

        setChange(type, setting, $this);
    }

    function handleOpacity(e) {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup(),
            target = (activeObject || activeGroup),
            val = $(e.target).val(),
            input = parseInt(val, 10);
        if (target) {
            target.setOpacity(input / 100);
            refreshCanvas();
        }
    }

    function handleClear(e) {
        if (confirm("Weet u het zeker?")) {
            canvas.setBackgroundColor('#000000');
            canvas.clear();
            refreshCanvas();
        }
    }

    function handleZIndex(e) {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup(),
            func = $(e.target).data('fn'),
            target = (activeObject || activeGroup);
        if (target) {
            target[func]();
            refreshCanvas();
        }
    }

    function handleColour(e) {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup(),
            target = (activeObject || activeGroup),
            val = $(e.target).val();
        if (target) {
            target.setFill(val);
            refreshCanvas();
        }
    }

    $doc.on('StartEditor', function (e, data) {
        $body.addClass('case-editor');
        initCanvas();
        setCanvasDimensions(data.phone, data.case);
        setObjectSelected();
        loadCanvasFromData(data.design);
    });

    $('.sel-bg').on('click', '.icon-caret-right', function (e) {
        move('.sel-bg .sliderow', '-=250');
        $('.icon-caret-left').css("visibility", "visible");

        return stopEvent(e);
    });

    $('.icon-caret-left').css("visibility", "hidden");

    $('.sel-bg').on('click', '.icon-caret-left', function (e) {
        var target = $('.sel-bg .sliderow'),
            $this = $(e.target),
            left = parseInt(target.position().left, 10);

        if ((left + 250) < 0) {
            $this.css("visibility", "visible");
        } else {
            $this.css("visibility", "hidden");
        }

        if (left < 0) {
            move('.sel-bg .sliderow', '+=250');
        } else {
            $this.css("visibility", "hidden");
        }

        return stopEvent(e);
    });

    $('.sel-object').on('click', '.icon-caret-right', function (e) {
        move('.sel-object .sliderow', '-=150');

        return stopEvent(e);
    });

    $('.sel-object').on('click', '.icon-caret-left', function (e) {
        var target = $('.sel-bg .sliderow'),
            $this = $(e.target),
            left = parseInt(target.position().left, 10);

        if ((left + 150) < 0) {
            $this.css("visibility", "visible");
        } else {
            $this.css("visibility", "hidden");
        }

        if (left < 0) {
            move('.sel-object .sliderow', '+=150');
        } else {
            $this.css("visibility", "hidden");
        }

        return stopEvent(e);
    });

    $('#add-text').on('click', function (e) {
        var settings = {
            originX: 'left',
            lineHeight: 1,
            fontFamily: $('#set-font').val().toLowerCase(),
            fontSize: +$('#set-font-size').val(),
            fill: $('#set-font-color').val(),
            fontWeight: 'normal'
        };

        addText($('#set-text').val(), settings);
        $('#set-text').val('');

        return stopEvent(e);
    });

    $('.sel-bg').find('.background-slider').on('click', 'img', function (e) {
        setBackground($(e.target).data('url'));
    });

    $('.sel-object').find('.background-slider').on('click', 'img', function (e) {
        addSvg($(e.target).data('url'));
    });

    $('.form-horizontal').find('button#postCanvas').attr('disabled', true);
    $('input#name').on('keyup', function (e) {
        var target = $('.form-horizontal').find('button'),
            val = $(e.target).val();

        if (!isEmpty(val) && val.length > 3) {
            target.attr('disabled', false);
        } else {
            target.attr('disabled', true);
        }
    });

    $('.form-horizontal').on('click', 'button', function (e) {
        var $this = $(e.target),
            data = null,
            img = '<img alt="" src="http://94.210.234.160/_design_your_own/img/loading.gif">';
        $this.attr('disabled', true);
        $this.html(img + ' Bezig met opslaan.');
        $('.ontwerpen').addClass('transparent');

        function setJSONData() {
            var img = canvas.toDataURL('png'),
                json = JSON.stringify(canvas),
                user = JSON.parse(window.sessionStorage.loggedInUser);

            return {
                name: $('input#name').val(),
                preview: img,
                canvas: json,
                phone: _phoneType,
                case: _caseType,
                shared: true,
                user: user._id
            };
        }

        function sendCanvasAsync(data, type, route) {
            function handleResponse(response) {
                if (isEmpty(response.error)) {
                    window.location.hash = '/product/' + response.result._id;
                    Application.notify('ok', 'Uw case is succesvol opgelsagen.');
                } else {
                    Application.notify('error', response.error);
                }
            }

            $.ajax({
                url: 'http://autobay.tezzt.nl:43083/' + route,
                type: type,
                data: data,
                success: handleResponse
            });
        }

        if (window.sessionStorage.loggedInUser) {
            try {
                canvas.deactivateAll().renderAll();
                data = setJSONData();
                if ($(e.target).attr("id") === "postCanvas") {
                    sendCanvasAsync(data, 'POST', "casedesigns");
                } else if ($(e.target).attr("id") === "putCanvas") {
                    sendCanvasAsync(data, 'PUT', "casedesign/" + $this.data("id"));
                }
            } catch (error) {
                Application.notify('error', 'Je browser ondersteund geen export van de canvas, helaas!' + error);
            }
        } else {
            Application.notify('error', 'Je moet ingelogd zijn om een ontwerp te kunnen opslaan.');
        }
        return stopEvent(e);
    });

    $('.sel-text').on('click', 'a', handleChange);
    $('.sel-text').on('change', 'select, input', handleChange);
    $('.sel-text').on('keydown', 'input, textarea', handleChange);

    $('#color').on('change', handleColour);
    $('#opacity').on('change', handleOpacity);
    $('#del-object').on('click', handleDelete);
    $('#del-all').on('click', handleClear);
    $('.index-group').on('click', 'a', handleZIndex);

    $('#background-color').on('change', function (e) {
        var color = $(e.target).val();
        setBackground(color, true);
    });
    function moveTarget(target, shift, position, direction) {
      var current = parseInt(target[position], 10);
      if (direction === '-') { current -= (shift ? 10 : 1); }
      if (direction === '+') { current += (shift ? 10 : 1); }
      target[position] = current;
    }
    /* KEY NAVIGATION */
    /* @see http://stackoverflow.com/a/10062031 */
    $doc.on('keydown', function(e) {
      var key = e.which,
          keyPressed = String.fromCharCode(key),
          target = (canvas.getActiveObject() || canvas.getActiveGroup()),
          newText = '',
          stillTyping = true;
        
       if (target) {
           if (key === 46) { // DELETE
               canvas.remove(target);
               return stopEvent(e);
           }
           else if (key === 27) // ESC
           {
               canvas.deactivateAll();
               refreshCanvas();
               if (!target.originalText) {
                 return stopEvent(e); 
               }
               newText = target.originalText;
               stillTyping = false;
           }
           else if (key == 38) {
             moveTarget(target, e.shiftKey, 'top', '-');
           }
           else if (key == 40) {
             moveTarget(target, e.shiftKey, 'top', '+');
           }
           else if (key == 37) {
             moveTarget(target, e.shiftKey, 'left', '-');
           }
           else if (key == 39) {
             moveTarget(target, e.shiftKey, 'left', '+');
           }
           // If the user wants to make a correction
           else if (target.type === "text")
           {
             // Store the original target before beginning to type
             if (!target.originalText) {
                 target.originalText = target.text;
             }
             if (key === 16) { //shift
                 newText = target.text;
             }
             else if (key === 8) //backspace
             {
                 e.preventDefault();
                 newText = target.text.substr(0, target.text.length - 1);
             }
             else if (key === 13) //enter
             {
               newText = target.text + "\n";
               stillTyping = true;
             }
             //if the user is typing alphanumeric characters
             else if (isAllowedChar(key))
             {
               console.log("Allowed char");
                 if (target.text === target.originalText) {
                   target.text = '';
                 }
                 if (keyPressed.match(/[A-Z]/) && !e.shiftKey) {
                   keyPressed = keyPressed.toLowerCase();
                 }
                 newText = target.text + keyPressed;
             }
             $('#set-text').val(newText);
             target.set({ text: newText }); // Change the target

             if (!stillTyping) {
                 this.target.originalText = null;
             }
           }
           refreshCanvas();
           return stopEvent(e);
       }
   });

}(jQuery, this));