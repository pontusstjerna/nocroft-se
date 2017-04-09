window.onload = function(){

    var world = document.getElementById("worldDiv");
    world.addEventListener("click", getMousePos, false);
    var animationStarted = false;
    var out = document.getElementById("info");
    var svgSurface = document.getElementById("svgWorld");
    document.getElementById("btnStop").onclick = stopAnimation;
    document.getElementById("btnStart").onclick = startAnimation;

    var ball = new ball(document.getElementById("ball"), Math.floor(Math.random()*6-3),Math.floor(Math.random()*6-3));

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

            //document.getElementById("info").innerHTML = "vy: " + vy;
        }
    };

    var timer; 
    function startAnimation(){
        if(!animationStarted){
            animationStarted = true;
            timer = setInterval(moveBall, 10);
        }
    };

    function moveBall(){
        ball.move();
    };

    function stopAnimation(){  
        out.innerHTML = "pdkawwww";
        animationStarted = false;
        clearInterval(timer);
    };

    function getMousePos(e){
        out.innerHTML = "Karin";
        var x = e.layerX;
        var y = e.layerY;

        out.innerHTML = e.layerX;
    };

    function createNewBall(x, y){
        //newBall = new SVGCircleElement();
        
        var newBall = svgSurface.createElement("circle");
    };


    startAnimation();
};