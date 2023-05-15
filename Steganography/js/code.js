var startImage = null;
var hideImage = null;
var startCanvas;
var hideCanvas;

function loadStartImage() {
  var file = document.getElementById("imgstart");
  startImage = new SimpleImage(file);
  startCanvas = document.getElementById("start");
  startImage.drawTo(startCanvas);
}

function loadHideImage() {
  var file = document.getElementById("imghide");
  hideImage = new SimpleImage(file);
  hideCanvas = document.getElementById("hide");
  hideImage.drawTo(hideCanvas);
}

function doCombine() {
  //check that images are loaded
  if (startImage == null  || ! startImage.complete()) {
    alert("Start image not loaded");
  }
  if (hideImage == null || ! hideImage.complete()) {
    alert("Hide image not loaded");
  }
  //clear canvases
  clearCanvas();
  //crop image if they are of different sizes, taking the smaller one
  doCrop();
  startImage = chop2hide(startImage);
  hideImage = shift(hideImage);

  var finalImage = combine(startImage,hideImage);
  finalImage.drawTo(startCanvas);
}

function clearCanvas() {
  doClear(startCanvas);
  doClear(hideCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

// steganography
function clearbits(colorval){
  //compute the same color value with the low bits zeroed
  var x = Math.floor(colorval/16)*16;
  return x;
}
function chop2hide(image){
  //for each pixel in the image
  for(var px of image.values()){
      //clear the low bits of the red
      px.setRed(clearbits(px.getRed()));
      //clear the low bits of the green
      px.setGreen(clearbits(px.getGreen()));
      //clear the low bits of the blue
      px.setBlue(clearbits(px.getBlue()));
  }
  // after doing each pixel return the image as the answer
  return image;
}
function shift(image){
  //for each pixel in the image
  for(var px of image.values()){
      //shift the red bits over
      px.setRed(px.getRed()/16);
      //shift the green bits over
      px.setGreen(px.getGreen()/16);
      //shift the blue bits over
      px.setBlue(px.getBlue()/16);
  }
  //after doing each pixel return the image as the answer
  return image;
}
function combine(show,hide){
  //make a new image the same size as "show" (call it answer)
  var answer = new SimpleImage(show.getWidth(), show.getHeight());
  //for each pixel in the image
  for(var px of answer.values()){
      //get the x and y of that pixel
      var x = px.getX();
      var y = px.getY();
      //get the pixel in the same place from show
      var showPixel = show.getPixel(x,y);
      //get the pixel in the same place from hide
      var hidePixel = hide.getPixel(x,y);
      //set the red of px to the sum of showPixel's red + hidePixel's red
      px.setRed(showPixel.getRed()+hidePixel.getRed());
      //set the green of px to the sum of showPixel's green + hidePixel's green
      px.setGreen(showPixel.getGreen()+hidePixel.getGreen());
      //set the blue of px to the sum of showPixel's blue + hidePixel's blue
      px.setBlue(showPixel.getBlue()+hidePixel.getBlue());
  }
  //after doing each pixel, return ans answer of the image we called "answer"
  return answer;
}

function crop(image, width, height){
  var n = new SimpleImage(width,height);
  for(var p of image.values()){
     var x = p.getX();
     var y = p.getY();
     if (x < width && y < height){
      var np = n.getPixel(x,y);
      np.setRed(p.getRed());
      np.setBlue(p.getBlue());
      np.setGreen(p.getGreen()); 
    }
  }
  return n;
}

function doCrop(){
  var cropWidth = startImage.getWidth();
  if (hideImage.getWidth() < cropWidth) {
	  cropWidth = hideImage.getWidth();
  }
  var cropHeight = startImage.getHeight();
  if (hideImage.getHeight() < cropHeight) {
	  cropHeight = hideImage.getHeight();
  }
  startImage = crop(startImage,cropWidth, cropHeight);
  hideImage = crop(hideImage,cropWidth, cropHeight);
}
