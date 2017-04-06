var world = document.getElementById("worldDiv");
world.onclick = startAnimation;
var animationStarted = false;

var ball = new ball(document.getElementById("ball"), 1,2);

function ball(svgCircle, vx, vy){
    this.x = parseFloat(svgCircle.getAttribute("cx"));
    this.y = parseFloat(svgCircle.getAttribute("cy"));
    this.vx = vx;
    this.vy = vy;
    this.radius = parseFloat(svgCircle.getAttribute("r"));

    this.worldWidth = world.getAttribute("width");
    this.worldHeight = world.getAttribute("height");

    this.move = function(){
        if(this.x + this.radius + this.vx > this.worldWidth || 
            this.x - this.radius + this.vx < 0) 
            this.vx *= -1;
        
        if(this.y + this.radius + this.vy > this.worldHeight || 
            this.y - this.radius + this.vy < 0) 
            this.vy *= -1;

        this.x += this.vx;
        this.y += this.vy;

        svgCircle.setAttribute("cx", this.x);
        svgCircle.setAttribute("cy", this.y);
    }
};

var timer; 
function startAnimation(){
    if(!animationStarted){
        animationStarted = true;
        timer = setInterval(moveBall, 10);
    }else{
        animationStarted = false;
        clearInterval(timer);
    }
};

function moveBall(){
    ball.move();
};