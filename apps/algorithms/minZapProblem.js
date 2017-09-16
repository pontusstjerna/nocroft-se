var surface = document.getElementById("balloonSurface");
var div = document.getElementById("balloonDiv");
var balloons = [];
var rays = [];
var origin = {x: surface.getAttribute("width")/2, y: surface.getAttribute("height")/2};

addBalloon(100,50);

div.onclick = (e) => {
   getMousePos(e);
   try1();
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

    for(var i = 0; i < balloons.length; i++) {
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
    x = (x - origin.x) * 100 + origin.x;
    y = (y - origin.y) * 100 + origin.y;
    var newRay = document.createElementNS("http://www.w3.org/2000/svg", 'line');

    newRay.setAttribute("x1", origin.x);
    newRay.setAttribute("y1", origin.y);
    newRay.setAttribute("x2", x);
    newRay.setAttribute("y2", y);
    newRay.style.stroke = "red";
    newRay.style.strokeWidth = 2;

    surface.appendChild(newRay);
    rays.push({x: x, y: y, svg: newRay});
}

function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

function intersect(r, c) {
    for(var i = 0; i < 1; i += 0.001) {
        if(dist({x: ((r.x - origin.x) * i) + origin.x, y: ((r.y - origin.y) * i) + origin.y}, c) < c.radius) {
            return true;
        }
    }

    return false;
}

function intersectBalloons(b1, b2) {
    return dist(b1, b2) < b1.radius + b2.radius;
}

function clearRays() {
    for(var i = 0; i < rays.length; i++) {
        surface.removeChild(rays[i].svg);
    }
    rays = [];
}

/*****************THE ALGORITHM******************/
/*
Pseudocode by Pontus

C = set of circles sorted by longest distance to origin
let H = boolean array of same length as C, set all false
let S = {}

for i = 0 to sizeof(C) - 1 loop
    if not H[i] then
        let r = ray from origin to origin of C[i]
        add r to S
        for j = i to sizeof(C) - 1 loop
            if intersect(r, C[j]) then
                H[j] = true
            end if
        end loop
    end if
end loop
*/

function try1() {
    clearRays();
    let C = sortBalloons();
    let H = createArrayWithValue(C.length, false);

    for(var i = 0; i < C.length; i++) {
        if(!H[i]) {
            let r = {x: C[i].x, y: C[i].y};
            addRay(r.x, r.y);
            for(var j = i; j < C.length; j++) {
                if(intersect(r, C[j])) {
                    H[j] = true;
                }
            }
        }
    }
    
}

function sortBalloons() {
    let sorted = [];
    let copy = balloons.slice();
    for(var j = 0; j < balloons.length; j++) {
        let current = copy[0];
        for(var i = 0; i < copy.length; i++) {
            if(dist(current, origin) < dist(copy[i], origin)) {
                current = copy[i];
            } 
        }
        sorted.push(current);
        let index = copy.indexOf(current);
        copy.splice(index ,1);
    }

    return sorted;
}

function createArrayWithValue(length, value) {
    let arr = [];
    for(var i = 0; i < length; i++) {
        arr[i] = value;
    }

    return arr;
}