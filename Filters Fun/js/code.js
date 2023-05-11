var image;
var imageDefault;

// upload image to canvas1
function upload(){
    var imgcanvas = document.getElementById("can");
    var fileinput = document.getElementById("finput");
    imageDefault = new SimpleImage(fileinput);
    imageDefault.drawTo(imgcanvas);
}

// draw grayscale image on canvas1
function makeGray(){
    image = imageDefault;
    for(var pixel of image.values()){
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    var imgcanvas = document.getElementById("can");
    image.drawTo(imgcanvas);
}