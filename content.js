/***
  * @author Abhay Sardhara
  * @email <abhaysardhara7675@gmail.com>
***/

var start = false;
var stroke_weight = 2;
var coloring = 'black';
var paths = [];
var currentPath = [];
var stack = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.msg == 'start_draw') {
        document.body.style['userSelect'] = 'none';
        start = true;
    }
    else if(message.msg == 'stop_draw'){
        document.body.style['userSelect'] = 'auto';
        start = false;
    }
    else if(message.msg == 'undo') {
        noLoop();
        clear();
        if(paths.length>0) {
            var len = paths.length;
            stack.unshift(paths[len - 1]);
            paths.pop();
        }
        loop();
    }
    else if(message.msg == 'redo') {
        noLoop();
        clear();
        if(stack.length>0) {
            paths.push(stack[0]);
            stack.shift();
        }
        loop();
    }
    else if(message.msg == 'clear') {
        noLoop();
        clear();
        paths.length = 0;
        stack.length = 0;
        loop();
    }
    else if(message.msg == 'setWidth') {
        stroke_weight = message.width;
    }
    else if(message.msg == 'color_change') {
        if(message.color == 'orange') {
            coloring = 'orange';
        }
        else if(message.color == 'yellow') {
            coloring = 'yellow';
        }
        else if(message.color == 'black') {
            coloring = 'black';
        }
        else if(message.color == 'white') {
            coloring = 'white';
        }
        else if(message.color == 'lime') {
            coloring = 'lime';
        }
        else if(message.color == 'teal') {
            coloring = 'teal';
        }
        else if(message.color == 'blue') {
            coloring = 'blue';
        }
        else if(message.color == 'indigo') {
            coloring = 'indigo';
        }
    }
    
});
function setup() {
    document.body.style['userSelect'] = 'none';
    let tmp = document.body.clientHeight;
    let x = createCanvas(windowWidth, tmp);
    x.position(0, 0);
    x.style('pointer-events', 'none');
    clear();
}

function draw() {
    noFill();
    if(start) {
        if (mouseIsPressed) {
            const point = {
                x: mouseX,
                y: mouseY,
                color: coloring,
                weight: stroke_weight
            };
            currentPath.push(point);
        }
        paths.forEach(path => {
            beginShape();
            path.forEach(point => {
                stroke(point.color);
                strokeWeight(point.weight);
                vertex(point.x, point.y);
            });
            endShape();
        });
    }
}

function mousePressed() {
    currentPath = [];
    paths.push(currentPath);
}