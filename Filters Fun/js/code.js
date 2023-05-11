var grayImage;
var redImage;
var image = null;
var canvas = null;

// upload image to canvas1
function upload(){
    canvas = document.getElementById("can");
    var fileinput = document.getElementById("finput");
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

// draw grayscale image
function doGray() {
    if ( imageIsLoaded() ) {     // check if image is loaded
        makeGray();	                      // function performs the grayscale work
        grayImage.drawTo(canvas);	          // display image
    }else{
        alert("Image not loaded")
    }
  }

  // check if there is an image uploaded
  function imageIsLoaded(){
    if(image != null){
        return true;
    }else{
        return false;
    }
  }