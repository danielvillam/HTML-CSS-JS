var grayImage = null;
var redImage = null;
var myImage = null;
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
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        if(avg < 128){
            pixel.setRed(avg*2);
            pixel.setGreen(0);
            pixel.setBlue(0); 
        }else{
            pixel.setRed(255);
            pixel.setGreen((avg*2)-255);
            pixel.setBlue((avg*2)-255); 
        }
    }
}

// change image to red
function makeMyFilter(){
    myImage = image;
    var line = myImage.getWidth()/9;
    for(var pixel of myImage.values()){
        if(pixel.getX()<line || pixel.getX()>line*2 && pixel.getX()<line*3 || pixel.getX()>line*4 && pixel.getX()<line*5 || pixel.getX()>line*6 && pixel.getX()<line*7 || pixel.getX()>line*8){
            var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
            pixel.setRed(avg+40);
            pixel.setGreen(avg+40);
        }
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

  // draw red image
  function doMyFilter() {
    if ( imageIsLoaded() ) {     // check if image is loaded
        makeMyFilter();	                      // function performs the grayscale work
        myImage.drawTo(canvas);	          // display image
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