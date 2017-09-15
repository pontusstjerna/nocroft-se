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
var balloons = [];
var rays = [];
var origin = {x: surface.getAttribute("width")/2, y: surface.getAttribute("height")/2};

addBalloon(100,50);
addRay(100,0);

div.onclick = (e) => {
   getMousePos(e);
}

function getMousePos(e){
    var x = e.x;
    var y = e.y;
    var svgW = surface.getAttribute("width");

    let rect = surface.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;

    addBalloon(x,y);
};

function addBalloon(x,y) {
    var newBalloon = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    let radius = Math.random()*35 + 10;
    let balloon = {
        x: x,
        y: y,
        radius: radius + 2,
        svg: newBalloon,
    }

    if(dist(origin, {x: x, y: y}) <= radius)
        return;

    for(i = 0; i < balloons.length; i++) {
        if(intersectBalloons(balloon, balloons[i]))
            return;
    }

    newBalloon.setAttribute("cx",x);
    newBalloon.setAttribute("cy",y);
    newBalloon.setAttribute("id", "balloon" + balloons.length);
    newBalloon.setAttribute("r", radius);
    newBalloon.style.stroke = "green";
    newBalloon.style.strokeWidth = 2;
    newBalloon.style.fill = "white";

    surface.appendChild(newBalloon);
    balloons.push(balloon);
}

function addRay(x,y) {
    var newRay = document.createElementNS("http://www.w3.org/2000/svg", 'line');

    newRay.setAttribute("x1", origin.x);
    newRay.setAttribute("y1", origin.y);
    newRay.setAttribute("x2", x);
    newRay.setAttribute("y2", y);
    newRay.style.stroke = "red";
    newRay.style.strokeWidth = 2;

    surface.appendChild(newRay);
    rays.push({x: x, y: y});
}

function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

function intersect(r, c) {
    return dist(r, {x: c.x, y: c.y} < c.radius);
}

function intersectBalloons(b1, b2) {
    return dist({x: b1.x, y: b1.y}, {x: b2.x, y: b2.y}) < b1.radius + b2.radius;
}