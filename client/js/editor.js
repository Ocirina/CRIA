(function ($, window) {
    var dimensions = {
        "4": { width: 270, height: 532 },
        "5": { width: 270, height: 569 }
    };
    var _phoneType = 4;
    var _caseType = 0;
    var canvas = null;
    var $body = $(document.body);
    var $doc = $(document);
    var $window = $(window);
    var Handler = {
        handleTextObject: function (obj) {
            $('#text').find('button').attr('disabled', false);
            $('#text textarea').val(obj.getText());
        },
        handleImageObject: function (obj) {},
        handlePathObject: function (obj) {},
        handleGroupObject: function (obj) {},
        handleDefaultObject: function (obj) {}
    };
    var CANVAS_SETTINGS = {
        centerTransform: true,
        controlsAboveOverlay: true,
        selectionBorderColor: "black",
        selectionColor: "rgba(255, 255, 255, 0.3)",
        selectionLineWidth: 2
    };
    var canvasLoaded = false;

    $window.on('beforeunload', leavingPage);
    $window.on('hashchange', leavingPage);

    function leavingPage(e) {
        canvasLoaded = false;
        $(document.body).removeClass('case-editor');
        saveCanvasToSession();

        $doc.off('StartEditor');
        if (e.type === "beforeunload") {
            return 'Weet u zeker dat u de pagina wilt verlaten zonder op te slaan?';
        }
        canvas = null;
    }

    function saveCanvasToSession() {
        var jsonCanvas = null, design = {};
        var typeOfPage = document.getElementById("putCanvas");
        if (typeOfPage === null) {
            jsonCanvas = JSON.stringify(canvas);
            design.canvas = jsonCanvas;
            design.phone = _phoneType;
            design.case = _caseType;
            window.sessionStorage["design"] = JSON.stringify(design);
        }
    }

    $doc.ready(function (e) {
        $body.addClass('case-editor');
    });
    $doc.on('StartEditor', function (e, data) {
        console.log(data);
        $body.addClass('case-editor');
        initCanvas();
        setCanvasDimensions(data.phone, data.case);
        setObjectSelected();
        loadCanvasFromData(data.design);
    });

    function setObjectSelected() {

        canvas.on('object:selected', handleSelected);
        canvas.on('group:selected', handleSelected);
        canvas.on('selection:cleared', handleDeselected);
        
        function handleSelected(e) {
            var selectedObject = e.target,
                type = selectedObject.type,
                fn = 'handle' + capitaliseFirstLetter(type) + 'Object';
            $('#object-controls').show();
            handleType(fn, selectedObject);
        }
        
        function handleType(fn, obj) {
          try {
              Handler[fn](obj);
          }
          catch (err) {
              Handler.handleDefaultObject(obj);
          }
        }

        function handleDeselected(e) {
            $('#object-controls').hide();
        }
    }

    function initCanvas() {
        if (isEmpty(canvas)) {
            canvas = new fabric.Canvas('case-editor', CANVAS_SETTINGS);
            canvas.setBackgroundColor('#000000');
        }
    }

    function setCanvasDimensions(phoneId, caseId) {
        _phoneType = phoneId;
        _caseType = caseId ? caseId : 1;
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

        //$(document.body).on({"dragover": stopEvent, "drop": stopEvent});
        //$('.phone').on({"dragover": stopEvent, "drop": handleDroppedFiles});
    }
    else {
        $('#upload').hide();
    }

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
        }
        else {
            $this.css("visibility", "hidden");
        }
        if (left < 0) {
            move('.sel-bg .sliderow', '+=250');
        }
        else {
            $this.css("visibility", "hidden")
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
        }
        else {
            $this.css("visibility", "hidden");
        }
        if (left < 0) {
            move('.sel-object .sliderow', '+=150');
        }
        else {
            $this.css("visibility", "hidden")
        }
        return stopEvent(e);
    });

    function move(el, value) {
        $(el).animate({
            left: value
        }, 500, function () {
        });
    }

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
        setBackground($(this).data('url'));
    });

    $('.sel-object').find('.background-slider').on('click', 'img', function (e) {
        addSvg($(this).data('url'));
    });

    $('.form-horizontal').find('button').attr('disabled', true);
    $('input#name').on('keyup', function (e) {
        var target = $('.form-horizontal').find('button');
        var val = $(this).val();
        if (!isEmpty(val) && val.length > 3) {
            target.attr('disabled', false);
        }
        else {
            target.attr('disabled', true);
        }
    });

    $('.form-horizontal').on('click', 'button', function (e) {
        var $this = $(this);
        $this.attr('disabled', true);
        if (window.sessionStorage["loggedInUser"]) {
            try {
                canvas.deactivateAll().renderAll();
                var data = setJSONData();
                if($(this).attr("id") === "postCanvas") {
                    sendCanvasAsync(data, 'POST', "casedesigns");
                } else if($(this).attr("id") === "putCanvas") {
                    sendCanvasAsync(data, 'PUT', "casedesign/" + $this.data("id"));
                }
            }
            catch (e) {
                Application.notify('error', 'Je browser ondersteund geen export van de canvas, helaas!' + e);
            }
        } else {
            Application.notify('error', 'Je moet ingelogd zijn om een ontwerp te kunnen opslaan.');

        }

        function setJSONData() {
            var img = canvas.toDataURL('png'),
                json = JSON.stringify(canvas),
                data = {},
                user = JSON.parse(window.sessionStorage["loggedInUser"]);
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
            $.ajax({
                url: 'http://autobay.tezzt.nl:43083/' + route,
                type: type,
                data: data,
                success: handleResponse
            });

            function handleResponse(response) {
              if (isEmpty(response.error)) {
                  window.location.hash = '/product/' + response.result._id;
                  Application.notify('ok', 'Uw case is succesvol opgelsagen.');
              } else {
                  Application.notify('error', response.error);
              }
            }
        }

        return stopEvent(e);
    });

    function addSvg(svg) {
        var loadedObject = null;
        fabric.loadSVGFromURL(svg, function (objects, options) {
            loadedObject = fabric.util.groupSVGElements(objects, options);
            loadedObject.set(svgSettings());
            canvas.add(loadedObject);
            refreshCanvas();
        });
        
        function svgSettings() {
          var offset = 50;
          return {
                left: fabric.util.getRandomInt(0 + offset, 270 - offset),
                top: fabric.util.getRandomInt(0 + offset, 650 - offset),
                angle: fabric.util.getRandomInt(-20, 40),
                padding: 10,
                cornersize: 10
            };
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

    function addText(text, settings) {
        var dimensions = calculateCenter();
        settings.left = dimensions.left;
        settings.top = dimensions.top;
        var text = new fabric.Text(text, settings);
        canvas.add(text);
        refreshCanvas();
    }

    function addImageToCanvas(data) {
        fabric.Image.fromURL(data, function (obj) {
            var ratio = calculateRatio(data,
                dimensions[_phoneType].width, dimensions[_phoneType].height);
            var settings = calculateCenter();
            canvas.add(obj.scale(ratio).set(settings));
            refreshCanvas();
        });
    }

    function addFiles(files) {
        var reader = null, i = 0, f = null;
        for (i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            readFile(f);
        }
        
        function readFile(f) {
          reader = new FileReader();
          reader.onload = (function (theFile) {
              return function (e) {
                  addImageToCanvas(e.target.result, canvas);
              };
          })(f);
          reader.readAsDataURL(f);
        }
    }

    function addTextToCanvas(text, weight) {
        var text = new fabric.Text(text, {
            fontSize: 20,
            lineHeight: 1,
            originX: 'left',
            fontFamily: 'Helvetica',
            fontWeight: weight
        });
        canvas.add(text);
        refreshCanvas();
    }

    function addImageToCanvas(data) {
        fabric.Image.fromURL(data, function (obj) {
            var ratio = calculateRatio(data,
                dimensions[_phoneType].width, dimensions[_phoneType].height);
            var settings = calculateCenter();
            canvas.add(obj.scale(ratio).set(settings));
            refreshCanvas();
        });
    }

    function calculateRatio(data, canvasHeight, canvasWidth) {
        var img = document.createElement('img');
        img.src = data;
        var photoImgWidth = img.width;
        var photoImgHeight = img.height;

        if (photoImgWidth < canvasWidth && photoImgHeight < canvasHeight) {
            return 1;
        }

        var hRatio = canvasWidth / photoImgWidth;
        var vRatio = canvasHeight / photoImgHeight;
        return Math.min(hRatio, vRatio);
    }

    function calculateCenter() {
        var finalWidth = (dimensions[_phoneType].width / 2);
        var finalHeight = (dimensions[_phoneType].height / 2);
        return { left: finalWidth, top: finalHeight };
    }

    /* TEKST FUNCS */
    $('.sel-text').on('click', 'a', handleChange);
    $('.sel-text').on('change', 'select, input', handleChange);
    $('.sel-text').on('keydown', 'input, textarea', handleChange);

    $('#color').on('change', handleColour);
    $('#opacity').on('change', handleOpacity);
    $('#del-object').on('click', handleDelete);
    $('#del-all').on('click', handleClear);
    $('.index-group').on('click', 'a', handleZIndex);

    function handleChange(e) {
        var $this = $(this),
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
            activeGroup = canvas.getActiveGroup();
        if (activeObject || activeGroup) {
            (activeObject || activeGroup).setOpacity(parseInt($(this).val(), 10) / 100);
            refreshCanvas();
        }
        else {
            Application.notify('error', 'U heeft geen element geselecteerd.');
        }
    }

    function handleDelete(e) {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeGroup) {
            activeGroup.forEachObject(function (o) {
                canvas.remove(o);
            });
            canvas.discardActiveGroup()
        } else if (activeObject) {
            canvas.remove(canvas.getActiveObject());
        } else {
            Application.notify('error', 'U heeft geen element geselecteerd.');
        }
        refreshCanvas();
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
            fn = $(this).data('fn');
        if (activeObject || activeGroup) {
            (activeObject || activeGroup)[fn]();
            refreshCanvas();
        }
        else {
            Application.notify('error', 'U heeft geen element geselecteerd.');
        }
    }

    function handleColour(e) {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject || activeGroup) {
            (activeObject || activeGroup).setFill($(this).val());
            refreshCanvas();
        }
        else {
            Application.notify('error', 'U heeft geen element geselecteerd.');
        }
    }

    function setChange(style, input, $this) {
        var element = canvas.getActiveObject();
        if (!isEmpty(element) && element.type === "text") {
            toggleInput(element, style, input, $this);
            refreshCanvas();
        } else {
            Application.notify('error', 'U heeft geen tekst geselecteerd.');
        }
        
        function toggleInput(element, style, input, $this) {
          if (element[style] == input) { element[style] = "normal"; }
          else { element[style] = input; }
          $this.toggleClass('active');
        }
    }

    function loadCanvasFromData(data) {
        if (data && data.hasOwnProperty('canvas') && !canvasLoaded) {
            canvas.loadFromJSON(data.canvas);
            console.log(data.canvas);
            refreshCanvas();
            canvasLoaded = true;
        }
    }
    function refreshCanvas() {
      canvas.calcOffset();
      canvas.renderAll();
    }

    $('#background-color').on('change', function (e) {
        var color = $(this).val();
        setBackground(color, true);
    });

})(jQuery, this);