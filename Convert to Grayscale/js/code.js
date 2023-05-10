var image;

// upload image to canvas1
function upload(){
    var imgcanvas = document.getElementById("canvas1");
    var fileinput = document.getElementById("finput");
    image = new SimpleImage(fileinput);
    image.drawTo(imgcanvas);
}

// draw grayscale image on canvas2
function makeGray(){
    for(var pixel of image.values()){
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    var imgcanvas = document.getElementById("canvas2");
    image.drawTo(imgcanvas);
}