var canvas = new fabric.Canvas('case-editor');
canvas.setWidth(270);
canvas.setHeight(572);
//addTextToCanvas("Hello, this is dog!!!", 'normal');

if (window.File && window.FileReader && window.FileList && window.Blob) {
    var zone = document.querySelector('.canvas-container');
    zone.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    }, false);
    
    zone.addEventListener('drop', function(e) {
        addFiles(e.dataTransfer.files);
        e.stopPropagation();
        e.preventDefault();
    }, false);
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
    fabric.Image.fromURL(data, function(obj) {
        var ratio = calculateRatio(data, 400, 400);
        var settings = calculateCenter(500, 500);
        canvas.add(obj.scale(ratio).set(settings));
    });
}

function addFiles(files) {
    var reader = null;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) { continue; }
        reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                addImageToCanvas(e.target.result);
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