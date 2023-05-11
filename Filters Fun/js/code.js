var grayImage = null;
var redImage = null;
var image = null;
var canvas;
var fileinput = null;

// upload image to canvas1
function upload(){
    canvas = document.getElementById("can");
    fileinput = document.getElementById("finput");
    image = new SimpleImage(fileinput);
    image.drawTo(canvas);
}

// change image to grayscale
function makeGray(){
    grayImage = image;
    for(var pixel of grayImage.values()){
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
}

// change image to red
function makeRed(){
    redImage = image;
    for(var pixel of redImage.values()){
        pixel.setRed(255);
    }
}

// draw grayscale image
function doGray() {
    if ( imageIsLoaded() ) {     // check if image is loaded
        makeGray();	                      // function performs the grayscale work
        grayImage.drawTo(canvas);	          // display image
    }else{
        alert("Image not loaded")
    }
  }

  // draw red image
  function doRed() {
    if ( imageIsLoaded() ) {     // check if image is loaded
        makeRed();	                      // function performs the grayscale work
        redImage.drawTo(canvas);	          // display image
    }else{
        alert("Image not loaded")
    }
  }

  // check if there is an image uploaded
  function imageIsLoaded(){
    if(fileinput != null){
        return true;
    }else{
        return false;
    }
  }

  function resetImage(){
    if ( imageIsLoaded() ) {     // check if image is loaded
        image = new SimpleImage(fileinput);
        image.drawTo(canvas);	          // display image
        grayImage = null;
        redImage = null;
    }else{
        alert("Image not loaded")
    }
  }