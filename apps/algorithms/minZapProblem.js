/*
Pseudocode by Pontus

C = set of circles sorted by longest distance to origin
let H = boolean array of same length as C, set all false
let S = {}

for i = 0 to sizeof(C) - 1 loop
    if not H[i] then
        H[i] = true
        let r = ray from origin to origin of C[i]
        for j = i to sizeof(C) - 1
            if intersect(r, C[j]) then
                H[j] = true
                add r to S
            end if
        end loop
    end if
end loop
*/

var surface = document.getElementById("balloonSurface");
var div = document.getElementById("balloonDiv");
var numBalloons = 1;

div.onclick = (e) => {
   getMousePos(e);
}

function getMousePos(e){
    var x = e.pageX;
    var y = e.pageY;
    var svgW = surface.getAttribute("width");

    if(document.body.clientWidth > svgW){
        x -= (document.body.clientWidth - svgW)/2;
    }

    addBalloon(x,y);
};

function addBalloon(x,y) {
    var newBalloon = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

    newBalloon.setAttribute("cx",x);
    newBalloon.setAttribute("cy",y);
    newBalloon.setAttribute("id", "balloon" + numBalloons);
    newBalloon.setAttribute("r", Math.random()*25 + 5);
    newBalloon.style.stroke = "green";
    newBalloon.style.strokeWidth = 2;
    newBalloon.style.fill = "white";

    surface.appendChild(newBalloon);
    numBalloons++;
}
