var c = document.getElementById("arkanoidCanva");
var ctx = c.getContext("2d");

var radius = 10;
var x = c.width / 2;
var y = c.height - radius;
var dx = 2;
var dy = -2;

var paddlex = c.width / 2;
var paddley = c.height - 10;
var paddleW = 60;
var paddleH = 12;

var rightMove = false;
var leftMove = false;

var brickRows = 3;
var brickColums = 5;
var brickWidth = 60;
var brickHeigth = 20;
var brickPadding = 12;
var brickOfSetTop = 30;
var brickOfSetLeft = 100;

var bricks = [];
for (let i = 0; i < brickColums; i++){
    bricks[i] = [];
    for (let j = 0; j < brickRows; j++){
        bricks[i][j] = {x: 0,y: 0,drawBrik: false}
    }
}


    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler (e){
        if(e.keyCode == 37){
            leftMove = true;
        }else{
            if (e.keyCode == 39){
                rightMove = true;
            }
        }
    }

    function keyUpHandler (e){
        if(e.keyCode == 37){
            leftMove = false;
        }else{
            if (e.keyCode == 39){
                rightMove = false;
            }
        }
    }


    function drawBall (){
        ctx.beginPath();
        ctx.arc(x, y , radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle (){
        ctx.beginPath();
        ctx.rect(paddlex, paddley, paddleW, paddleH);
        ctx.fillStyle = "#00cc00";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks(){
        for (let i = 0; i < brickColums; i++){
            for (let j = 0; j < brickRows; j++){
                var bx = i * (brickWidth + brickPadding)+brickOfSetLeft;
                var by = j * (brickHeigth + brickPadding)+brickOfSetTop;
                ctx.rect(bx, by, brickWidth, brickHeigth);
                ctx.fillStyle = "#9900ff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    function draw (){
        ctx.clearRect(0,0,c.width,c.height);
        drawPaddle();
        drawBall();
        drawBricks();
        if (x + dx > c.width - radius || x + dx < radius){
            dx = -dx;
        }
        if (y + dy < radius){
            dy = -dy;
        }else{
            if (y + dy > c.height - radius){
                if (x > paddlex && x < paddlex + paddleW){
                    dy = -dy;
                }else{
                    alert("GAME OVER");
                }
            }
        }
        if (leftMove && paddlex > 0){
            paddlex += -8;

        }
        if (rightMove && paddlex < c.width - paddleW){
            paddlex += 8;

        }
        x += dx;
        y += dy;
    }

setInterval(draw,10);

