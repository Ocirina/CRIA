var dimensions = {
  "4": {
    width: 270,
    height: 532
  },
  "5": {
    width: 270,
    height: 569
  }
};
var canvas = null;
$(document).on('StartEditor', function (e, data) {
  
  if (canvas === null) {
    canvas = new fabric.Canvas('case-editor', {
      centerTransform: true,
      controlsAboveOverlay: true,
      selectionBorderColor: "black",
      selectionColor: "rgba(255, 255, 255, 0.3)",
      selectionLineWidth: 2
    });
  }
  
  if (canvas) {
    var id = data.phone;
    canvas.setWidth(dimensions[id].width);
    canvas.setHeight(dimensions[id].height);
    canvas.renderAll();
  }

  var Handler = {
      handleTextObject: function(obj) {
      $('#text').find('button').attr('disabled', false);
          $('#text textarea').val(obj.getText());
      },
      handleImageObject: function(obj) {
          console.log(obj);
      },
      handlePathObject: function(obj) {
          console.log(obj);
      },
      handleGroupObject: function(obj) {
          console.log(obj);
      },
      handleDefaultObject: function(obj) {
          console.log(obj);
      }
  };
    
    canvas.on('object:selected', function(e){
        var selectedObject = e.target,
        type = selectedObject.type,
        fn = 'handle'+capitaliseFirstLetter(type)+'Object';

        try {
            Handler[fn](selectedObject);
        }
        catch(err) {
            Handler.handleDefaultObject(selectedObject);
        }
    });

    if (hasFileUploadSupport()) {
        $('#upload').on('change', function (e) {
            addFiles(e.target.files, canvas);
            return stopEvent(e);
        });

        //$(document.body).on({"dragover": stopEvent, "drop": stopEvent});
        //$('.phone').on({"dragover": stopEvent, "drop": handleDroppedFiles});
    }

    $('.sel-bg').on('click', '.icon-caret-right', function(e){
        move('.sel-bg .sliderow', '-=300');

        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    $('.sel-bg').on('click', '.icon-caret-left', function(e){
        move('.sel-bg .sliderow', '+=300');

        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    $('.sel-object').on('click', '.icon-caret-right', function(e){
        move('.sel-object .sliderow', '-=120');

        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    $('.sel-object').on('click', '.icon-caret-left', function(e){
        move('.sel-object .sliderow', '+=120');

        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    function move(el, value) {
        $(el).animate({
            left: value,
        }, 500, function() {
        });
    }

    $('#add-text').on('click', function (e) {
        var settings = {
            originX:        'left',
            lineHeight:     1,
            fontFamily:     $('#set-font').val().toLowerCase(),
            fontSize:       +$('#set-font-size').val(),
            fill:           $('#set-font-color').val(),
            fontWeight:     'normal'
         };

        addText($('#set-text').val(), settings);
        $('#set-text').val('');
        return stopEvent(e);
    });
    
    $('.sel-bg').find('.background-slider').on('click', 'img', function(e){
      var src = e.target.src;
      setBackground(src);
    });

    $('.sel-object').find('.background-slider').on('click', 'img', function(e){
        var src = e.target.src;
        addSvg(src);
    });

    $('.form-horizontal').on('click', 'button', function(e){
        if(window.sessionStorage["loggedInUser"]) {
            try {

              var img = canvas.toDataURL('png'),
              json = JSON.stringify(canvas),
              data = {},
              user = JSON.parse(window.sessionStorage["loggedInUser"]);

              data.name = $('input#name').val();
              data.preview = img;
              data.canvas = json;
              data.shared = true;
              data.user = user._id;

              $.ajax({
                url: 'http://autobay.tezzt.nl:43083/casedesigns',
                type: 'POST',
                data: data,
                success: function(response) {
                  console.log(response);
                    Application.notify('ok', 'Je hoesje is opgeslagen!');
                }
              });
              console.log(json);
            }
            catch(e) {
              Application.notify('error', 'Je browser ondersteund geen export van de canvas, helaas!');
            }
      } else {
            Application.notify('error', 'Je moet ingelogd zijn om een ontwerp te kunnen opslaan.');
        }
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    function addSvg(svg) {
      fabric.loadSVGFromURL(svg, function(objects, options) {
        var loadedObject = fabric.util.groupSVGElements(objects, options);
        var offset = 50,
            left = fabric.util.getRandomInt(0 + offset, 270 - offset),
            top = fabric.util.getRandomInt(0 + offset, 650 - offset),
            angle = fabric.util.getRandomInt(-20, 40);
        loadedObject.set({
          left: left,
          top: top,
          angle: angle,
          padding: 10,
          cornersize: 10
        });
        canvas.add(loadedObject);
      });
    }
    
    function setBackground(background, hex) {
      var setting = background;
      if (hex === null) { hex = false; }
      if (!hex) { setting = { source: background, repeat: 'repeat' }; }
      canvas.setBackgroundColor(setting, function () { 
        canvas.renderAll(); 
      });
    }
    
    function capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function handleDroppedFiles(e) {
        console.log(e);
        //addFiles(e.dataTransfer.files, canvas);
        return stopEvent(e);
    }

    function stopEvent(e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    function hasFileUploadSupport() {
        return (window.File && window.FileReader && window.FileList && window.Blob);
    }

    function addText(text, settings) {
        var text = new fabric.Text(text, settings);
        canvas.add(text);
    }

    function addImageToCanvas(data) {
        fabric.Image.fromURL(data, function (obj) {
            var ratio = calculateRatio(data, 270, 572);
            var settings = calculateCenter(270, 572);
            canvas.add(obj.scale(ratio).set(settings));
        });
    }

    function addFiles(files) {
        var reader = null;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) { continue; }
            reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    addImageToCanvas(e.target.result, canvas);
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    function hasFileUploadSupport() {
        return (window.File && window.FileReader && window.FileList && window.Blob);
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
    }

    function addImageToCanvas(data) {
      console.log(data);
        fabric.Image.fromURL(data, function (obj) {
            var ratio = calculateRatio(data, 270, 572);
            var settings = calculateCenter(270, 572);
            canvas.add(obj.scale(ratio).set(settings));
        });
    }

    function addFiles(files) {
        var reader = null;

        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }

            reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    addImageToCanvas(e.target.result, canvas);
                };
            })(f);

            reader.readAsDataURL(f);
        }
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

    function calculateCenter(canvasWidth, canvasHeight) {
        var finalWidth = (canvasWidth / 2);
        var finalHeight = (canvasHeight / 2);
        return { left: finalWidth, top: finalHeight };
    }
});