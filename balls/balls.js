window.onload = function(){

    var world = document.getElementById("worldDiv");
    var worldWidth = world.getAttribute("width");
    var worldHeight = world.getAttribute("height");

    world.addEventListener("click", getMousePos, false);
    var animationStarted = false;
    var out = document.getElementById("info");
    var svgSurface = document.getElementById("svgWorld");
    document.getElementById("btnStop").onclick = stopAnimation;
    document.getElementById("btnStart").onclick = startAnimation;

    var balls = [];
    balls[0] = new ball(document.getElementById("ball"), Math.floor(Math.random()*6-3),Math.floor(Math.random()*6-3));

    var timer; 
    function startAnimation(){
        if(!animationStarted){
            animationStarted = true;
            timer = setInterval(moveBall, 10);
        }
    };

    function moveBall(){
        for(i = 0; i < balls.length; i++){
            collideBall(i);
            balls[i].move();
        }
    };

    function stopAnimation(){  
        animationStarted = false;
        clearInterval(timer);
    };

    function getMousePos(e){
        var x = e.pageX;
        var y = e.pageY;
        var svgW = svgSurface.getAttribute("width");

        if(document.body.clientWidth > svgW){
            x -= (document.body.clientWidth - svgW)/2;
        }

        createNewBall(x,y);
    };

    function createNewBall(x, y){
        //out.innerHTML = "I wanna create a new ball at (" + x + "," + y + ").";

        var newBall = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        newBall.setAttribute("cx",x);
        newBall.setAttribute("cy",y);
        newBall.setAttribute("id", "ball" + balls.length);
        newBall.setAttribute("r", 20);
        newBall.style.stroke = "blue";
        newBall.style.strokeWidth = 4;
        newBall.style.fill = "white";

        svgSurface.appendChild(newBall);

        balls.push(new ball(newBall, Math.floor(Math.random()*6-3),Math.floor(Math.random()*6-3)));
    };


    startAnimation();



    //BALLS

    function ball(svgCircle, vx, vy){
        this.x = parseFloat(svgCircle.getAttribute("cx"));
        this.y = parseFloat(svgCircle.getAttribute("cy"));
        this.vx = vx;
        this.vy = vy;
        this.radius = parseFloat(svgCircle.getAttribute("r"));

        this.move = function(){
            if(this.x + this.radius + this.vx > worldWidth || 
                this.x - this.radius + this.vx < 0) 
                this.vx *= -1;
            
            if(this.y + this.radius + this.vy > worldHeight || 
                this.y - this.radius + this.vy < 0) 
                this.vy *= -1;

            this.x += this.vx;
            this.y += this.vy;

            svgCircle.setAttribute("cx", this.x);
            svgCircle.setAttribute("cy", this.y);

            //document.getElementById("info").innerHTML = "vy: " + vy;
        }
    };


    function collideBall(index){
        for(j = 0; j < balls.length; j++){
            if(j != index){
                var minRange = 20 + 4 + 20 + 4; //todo
                if(getDistance(balls[j].x, balls[j].y, balls[index].x, balls[index].y) < minRange){ //TODO: Add vx and yx
                    balls[index].vx *= -1;
                    balls[index].vy *= -1;
                }
            }
        }
    };

    function getDistance(x1,y1,x2,y2){
        var a = x1 - x2;
        var b = y1 - y2;

        return Math.sqrt(a*a + b*b);
    }

};