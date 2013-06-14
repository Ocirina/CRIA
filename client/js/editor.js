(function($, window){
  var dimensions = {
      "4": { width: 270, height: 532 },
      "5": { width: 270, height: 569 }
  };
  var canvas = null;
  var $body = $(document.body);
  var $doc = $(document);
  var $window = $(window);
  var Handler = {
      handleTextObject: function (obj) {
          $('#text').find('button').attr('disabled', false);
          $('#text textarea').val(obj.getText());
      },
      handleImageObject: function (obj) {
          console.log(obj);
      },
      handlePathObject: function (obj) {
          console.log(obj);
      },
      handleGroupObject: function (obj) {
          console.log(obj);
      },
      handleDefaultObject: function (obj) {
          console.log(obj);
      }
  };
  
  $window.on('beforeunload', leavingPage);
  $window.on('hashchange', leavingPage);
  
  function leavingPage(e) {
    canvas = null;
    $(document.body).removeClass('case-editor');
    //TODO: onhashchange save canvas to sessionStorage.
    if (e.type === "beforeunload") {
      return 'Weet u zeker dat u de pagina wilt verlaten zonder op te slaan?';
    }
  }
  $doc.ready(function(e) { $body.addClass('case-editor'); });
  $doc.on('StartEditor', function (e, data) {
      $body.addClass('case-editor');
      initCanvas();
      setCanvasDimensions(data.phone);
      setObjectSelected();
      console.log(canvas);
  });
  
  function setObjectSelected() {
    canvas.on('object:selected', function (e) {
      var selectedObject = e.target,
          type = selectedObject.type,
          fn = 'handle' + capitaliseFirstLetter(type) + 'Object';
      try { Handler[fn](selectedObject); }
      catch (err) { Handler.handleDefaultObject(selectedObject); }
    });
  }
  
  function initCanvas() {
    if (isEmpty(canvas)) {
      canvas = new fabric.Canvas('case-editor', {
          centerTransform: true,
          controlsAboveOverlay: true,
          selectionBorderColor: "black",
          selectionColor: "rgba(255, 255, 255, 0.3)",
          selectionLineWidth: 2
      });
    }
  }
  
  function setCanvasDimensions(id) {
    canvas.setWidth(dimensions[id].width);
    canvas.setHeight(dimensions[id].height);
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
    return stopEvent(e);
});

$('.sel-bg').on('click', '.icon-caret-left', function (e) {
    move('.sel-bg .sliderow', '+=250');
    return stopEvent(e);
});

$('.sel-object').on('click', '.icon-caret-right', function (e) {
    move('.sel-object .sliderow', '-=150');
    return stopEvent(e);
});

$('.sel-object').on('click', '.icon-caret-left', function (e) {
    move('.sel-object .sliderow', '+=150');
    return stopEvent(e);
});

function move(el, value) {
    $(el).animate({
        left: value,
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
$('input#name').on('keyup', function(e){
  var target = $('.form-horizontal').find('button');
  var val = $(this).val();
  if (!isEmpty(val) && val.length > 3) { target.attr('disabled', false); }
  else { target.attr('disabled', true); }
});

$('.form-horizontal').on('click', 'button', function (e) {
    $(this).attr('disabled', true);
    if (window.sessionStorage["loggedInUser"]) {
        try {
            canvas.deactivateAll().renderAll();
            var data = setJSONData();
            console.log(data);
            sendCanvasAsync(data);
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

      data.name = $('input#name').val();
      data.preview = img;
      data.canvas = json;
      data.shared = true;
      data.user = user._id;
      return data;
    }
    
    function sendCanvasAsync(data) {
      $.ajax({
          url: 'http://autobay.tezzt.nl:43083/casedesigns',
          type: 'POST',
          data: data,
          success: function (response) {
              if (isEmpty(response.error)) {
                  window.location.hash = '/product/' + response.result._id;
                  Application.notify('ok', 'Uw case is succesvol opgelsagen.');
              } else {
                  Application.notify('error', response.error);
              }
          }
      });
    }
    return stopEvent(e);
});

function addSvg(svg) {
    fabric.loadSVGFromURL(svg, function (objects, options) {
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
    if (isEmpty(hex)) {
        hex = false;
    }
    if (!isEmpty(hex)) {
        setting = {
            source: background,
            repeat: 'repeat'
        };
    }
    canvas.setBackgroundColor(setting, function () {
        canvas.renderAll();
    });
}
function handleDroppedFiles(e) {
    console.log(e);
    //addFiles(e.dataTransfer.files, canvas);
    return stopEvent(e);
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
    var reader = null, i = 0;
    for (i = 0, f; f = files[i]; i++) {
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

/* TEKST FUNCS */
$('.sel-text').on('click', 'a', handleChange);
$('.sel-text').on('change', 'select', handleChange);
$('.sel-text').on('keydown', 'input, textarea', handleChange);

function handleChange(e) {
  var $this = $(this),
      type = $this.data('type'),
      setting = $this.data('setting') || $this.val();
  if ($this.attr('type') === 'number') { setting = parseInt(setting, 10); }
  setChange(type, setting, $this);
}

function setChange(style, input, $this) {
  var element = canvas.getActiveObject();
  if (!isEmpty(element) && element.type === "text") {
      if (element[style] == input) {
          element[style] = "normal";
          $this.toggleClass('active');
      }
      else {
          element[style] = input;
          $this.toggleClass('active');
      }
      canvas.renderAll();
      canvas.calcOffset();
  } else { console.log("u moet eerst een tekst selecteren!!"); }
}
    
    
})(jQuery, this);