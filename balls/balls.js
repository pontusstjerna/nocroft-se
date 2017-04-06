var world = document.getElementById("worldDiv");
world.onclick = testFun;

var ball = document.getElementById("ball");

function testFun(){
   setInterval(moveBall, 10);
};

function moveBall(){
    ball.setAttribute("cx", parseFloat(ball.getAttribute("cx")) + 1);
};