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
    document.getElementById("btnReset").onclick = resetAnimation;
    document.getElementById("chkGravity").onclick = function(){gravity = !gravity;};
    document.getElementById("rangeFriction").oninput = function(){friction = document.getElementById("rangeFriction").value;};

    var balls = [];
    balls[0] = new ball(document.getElementById("ball"), Math.floor(Math.random()*6-3),Math.floor(Math.random()*6-3));

    var timer; 
    function startAnimation(){
        if(!animationStarted){
            animationStarted = true;
            timer = setInterval(moveBall, 10);
        }
    };

    function stopAnimation(){  
        animationStarted = false;
        clearInterval(timer);
    };

    function resetAnimation(){
        for(i = 1; i < balls.length; i++){
            svgSurface.removeChild(svgSurface.lastChild);
        }
        balls.splice(1,balls.length - 1);
        out.innerHTML = "Resetting...";
    }

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

        var otherX = x;
        var otherY = y;
        var minRange = 20 + 4 + 20 + 4;
        var collision = false;

        do{
            collision = false;
            for(i = 0; i < balls.length - 1; i++){
                if(getDistance(x,y,otherX, otherY) < minRange){
                    x += 24;
                    y += 24;

                    collision = true;
                }
            }
        } while(collision);

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

    var friction = document.getElementById("rangeFriction").value;
    var gravity = true;

    function moveBall(){
        for(i = 0; i < balls.length; i++){
            if(gravity){
                applyGravity(balls[i]);
            }
            collideBall(i);
            balls[i].move();
        }

        out.innerHTML = friction;
    };

    function ball(svgCircle, vx, vy){
        this.x = parseFloat(svgCircle.getAttribute("cx"));
        this.y = parseFloat(svgCircle.getAttribute("cy"));
        this.vx = vx;
        this.vy = vy;
        this.radius = parseFloat(svgCircle.getAttribute("r"));
        this.svgCircle = svgCircle;

        this.move = function(){
            if(this.x + this.radius + this.vx > worldWidth || 
                this.x - this.radius + this.vx < 0) 
                this.vx *= (-1)*(1 - friction);
            
            if(this.y + this.radius + this.vy > worldHeight || 
                this.y - this.radius + this.vy < 0) 
                this.vy *= (-1)*(1 - friction);

            this.x += this.vx;
            this.y += this.vy;

            svgCircle.setAttribute("cx", this.x);
            svgCircle.setAttribute("cy", this.y);

            //document.getElementById("info").innerHTML = "vy: " + vy;
        }
    };


    function collideBall(ball1){
        for(ball2 = 0; ball2 < balls.length; ball2++){
            if(ball2 != ball1){
                var minRange = 20 + 4 + 20 + 4; //todo
                if(getDistance(balls[ball2].x, balls[ball2].y, balls[ball1].x, balls[ball1].y) < minRange){


                    var collisionVector = [
                        balls[ball2].x - balls[ball1].x,
                        balls[ball2].y - balls[ball1].y];                

                    var colVectorHeading = Math.atan2(collisionVector[0], collisionVector[1]);

                    var ball1Vel = Math.sqrt(ball1.vx*ball1.vx + ball1.vy*ball1.vy);

                    out.innerHTML = colVectorHeading*(180/Math.PI); 

                    balls[ball1].vx *= -1*(1 - friction);
                    balls[ball1].vy *= -1*(1 - friction);
                    
                }
            }
        }
    };

    function applyGravity(ball){
        ball.vy += 0.1;
    }

    function getDistance(x1,y1,x2,y2){
        var a = x1 - x2;
        var b = y1 - y2;

        return Math.sqrt(a*a + b*b);
    }

};