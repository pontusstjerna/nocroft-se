const input = {
    'up': false,
    'down': false,
    'left': false,
    'right': false
};

$('#btnForward').bind('touchstart mousedown', function() {
    $('#btnForward').addClass('active');
    forward();
});

$('#btnBackward').bind('touchstart mousedown', function() {
    $('#btnBackward').addClass('active');
    reverse();
    forward();
});

$('#btnLeft').bind('touchstart mousedown', function() {
    $('#btnLeft').addClass('active');
    left();
});

$('#btnRight').bind('touchstart mousedown', function() {
    $('#btnRight').addClass('active');
    right();
});

$('#btnRotLeft').bind('touchstart mousedown', function() {
    $('#btnRotLeft').addClass('active');
    rotLeft();
});

$('#btnRotRight').bind('touchstart mousedown', function() {
    $('#btnRotRight').addClass('active');
    rotRight();
});

$('#btnBackward').bind('touchend mouseup', function() {
    $('#btnBackward').removeClass('active');
    stop();
    reverse();
});

$('#btnForward, #btnLeft, #btnRight, #btnRotLeft, #btnRotRight').bind('touchend mouseup', function() {
    stop();
    $('#btnForward, #btnLeft, #btnRight, #btnRotLeft, #btnRotRight').removeClass('active');
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            if (!input['left']) {
                input['left'] = true;
                $('#btnRotLeft').addClass('active');
                
                if (input['up']) {
                    left();
                } else if (input['down']) {
                    right();
                } else {
                    rotLeft();
                }
            }
        break;

        case 38: // up
            if (!input['up']) {
                input['up'] = true;
                $('#btnForward').addClass('active');

                if (input['left']) {
                    left();
                } else if (input['right']) {
                    right();
                } else {
                    forward();
                }
            }
        break;

        case 39: // right
        if (!input['right']) {
            input['right'] = true;
            $('#btnRotRight').addClass('active');
            
            if (input['up']) {
                right();
            } else if (input['down']) {
                left();
            } else {
                rotRight();
            }
        }
        break;

        case 40: // down
        if (!input['down']) {
            input['down'] = true;

            reverse();
            $('#btnBackward').addClass('active');

            if (input['left']) {
                right();
            } else if (input['right']) {
                left();
            } else {
                forward();
            }
        }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).keyup(function(e) {
    switch(e.which) {
        case 37: // left
            input['left'] = false;
            $('#btnRotLeft').removeClass('active');
            
            if (input['up'] || input['down']) {
                forward();
            } else {
                stop();
            }
        break;

        case 38: // up
            input['up'] = false;
            $('#btnForward').removeClass('active');

            if (input['left']) {
                rotLeft();
            } else if (input['right']) {
                rotRight();
            } else {
                stop();
            }

        break;

        case 39: // right
            input['right'] = false;
            $('#btnRotRight').removeClass('active');
            
            if (input['up'] || input['down']) {
                forward();
            } else {
                stop();
            }
        break;

        case 40: // down
        input['down'] = false;
        $('#btnBackward').removeClass('active');
        reverse();

        if (input['left']) {
            rotRight();
        } else if (input['right']) {
            rotLeft();
        } else {
            stop();
        }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

function forward() {
    socket.emit('forward');
}

function reverse() {
    socket.emit('reverse');
}

function left() {
    socket.emit('left');
}

function right() {
    socket.emit('right');
}

function rotLeft() {
    socket.emit('rotLeft');
}

function rotRight() {
    socket.emit('rotRight');
}

function stop() {
    socket.emit('stop');
}