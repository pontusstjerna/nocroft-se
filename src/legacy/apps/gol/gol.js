const div = document.getElementById('golDiv');
const surface = document.getElementById('golSurface');
const surfaceWidth = surface.getAttribute('width');
const surfaceHeight = surface.getAttribute('height');
const width = 50;
const height = 50;
var matrix = [];

for(var i = 0; i < width; i++ ) {
    matrix[i] = [];
    for(var j = 0; j < height; j++ ) {
        matrix[i][j] = false;
    }
}

surface.onclick = (e) => {
    var x = e.x;
    var y = e.y;

    let rect = surface.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;

    addCell(x,y);
}

function addCell(x,y) {
    let cell = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    cell.setAttribute('cx', x * (surfaceWidth / width));
    cell.setAttribute('cy', y * (surfaceHeight / height));
    cell.setAttribute('r', (surfaceWidth / width));
    cell.style.fill = 'rgb(130, 160, 200)';

    surface.appendChild(cell);

    matrix[Math.floor(x / width)][Math.floor(y / height)] = true;
}