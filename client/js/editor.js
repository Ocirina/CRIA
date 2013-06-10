$(document).on('StartEditor', function(e){
  var canvas = new fabric.Canvas('case-editor');
  canvas.setWidth(270);
  canvas.setHeight(572);
  addTextToCanvas("Hello, this is dog!!!", 'normal', canvas);
  
  if (hasFileUploadSupport()) {
<<<<<<< Local Changes
<<<<<<< Local Changes
    $('#upload').on('change', function(e){
      addFiles(e.target.files, canvas);
      return stopEvent(e);
    });
    //$(document.body).on({"dragover": stopEvent, "drop": stopEvent});
    //$('.phone').on({"dragover": stopEvent, "drop": handleDroppedFiles});
  }
  $('#add-text').on('click', function(e){
    return stopEvent(e);
  });
  var textSample = new fabric.Text(text.slice(0, getRandomInt(0, text.length)), {
        left: getRandomInt(350, 400),
        top: getRandomInt(350, 400),
        fontFamily: 'helvetica',
        angle: getRandomInt(-10, 10),
        fill: '#' + getRandomColor(),
        scaleX: 0.5,
        scaleY: 0.5,
        fontWeight: '',
        originX: 'left',
        hasRotatingPoint: true
      });
      canvas.add(textSample);
  
  
  
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
  function addTextToCanvas(text, weight, canvas) {
      var text = new fabric.Text(text, {
        fontSize: 20,
        lineHeight: 1,
        originX: 'left',
        fontFamily: 'Helvetica',
        fontWeight: weight
      });
      canvas.add(text);
  }
  function addImageToCanvas(data, canvas) {
      fabric.Image.fromURL(data, function(obj) {
          var ratio = calculateRatio(data, 270, 572);
          var settings = calculateCenter(270, 572);
          canvas.add(obj.scale(ratio).set(settings));
      });
  }
  function addFiles(files, canvas) {
      var reader = null;
      for (var i = 0, f; f = files[i]; i++) {
          if (!f.type.match('image.*')) { continue; }
          reader = new FileReader();
          reader.onload = (function(theFile) {
              return function(e) {
                  addImageToCanvas(e.target.result, canvas);
              };
          })(f);
          reader.readAsDataURL(f);
=======
      var input = document.getElementById('upload');
      input.addEventListener('change', function(e){
        addFiles(e.dataTransfer.files, canvas);
        return stopEvent(e);
      }, false);
      
      var zone = document.querySelector('.canvas-container');
      zone.addEventListener('dragover', function(e) {
        return stopEvent(e);
      }, false);
    
      zone.addEventListener('drop', function(e) {
        addFiles(e.dataTransfer.files, canvas);
        return stopEvent(e);
      }, false);
      
      function stopEvent(e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
>>>>>>> External Changes
=======
      var input = document.getElementById('upload');
      input.addEventListener('change', function(e){
        addFiles(e.dataTransfer.files, canvas);
        return stopEvent(e);
      }, false);
      
      var zone = document.querySelector('.canvas-container');
      zone.addEventListener('dragover', function(e) {
        return stopEvent(e);
      }, false);
    
      zone.addEventListener('drop', function(e) {
        addFiles(e.dataTransfer.files, canvas);
        return stopEvent(e);
      }, false);
      
      function stopEvent(e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
>>>>>>> External Changes
      }
  }
});

function hasFileUploadSupport() {
  return (window.File && window.FileReader && window.FileList && window.Blob);
}
function addTextToCanvas(text, weight, canvas) {
    var text = new fabric.Text(text, {
      fontSize: 20,
      lineHeight: 1,
      originX: 'left',
      fontFamily: 'Helvetica',
      fontWeight: weight
    });
    canvas.add(text);
}
function addImageToCanvas(data, canvas) {
    fabric.Image.fromURL(data, function(obj) {
        var ratio = calculateRatio(data, 270, 572);
        var settings = calculateCenter(270, 572);
        canvas.add(obj.scale(ratio).set(settings));
    });
}
function addFiles(files, canvas) {
    var reader = null;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) { continue; }
        reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
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
    var finalWidth = (canvasWidth/2);
    var finalHeight = (canvasHeight/2);
    return { left: finalWidth, top: finalHeight };
}