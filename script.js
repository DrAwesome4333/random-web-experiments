//@ts-check
const CANVAS = document.createElement("canvas");
var CT = CANVAS.getContext("2d");
/** @type {CanvasRenderingContext2D} */
var ctx;
if(!CT){
    throw "Error";
}else{
    ctx = CT;
}
const SEG = 100;
const BUF = 50;
const WIDTH = (5 + 1) * SEG + 2 * BUF;
const HEIGHT = (4 + 1) * SEG + 2 * BUF;

CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;
CANVAS.style.width = `${WIDTH}px`;
CANVAS.style.height = `${HEIGHT}px`;
CANVAS.style.position = 'absolute';
CANVAS.style.top = '0px';
CANVAS.style.left = '0px';

let mx = 0;
let my = 0;
let clicked = false;

/**
 * 
 * @param {MouseEvent} e 
 */
function mouseMove(e){
    mx = e.clientX;
    my = e.clientY;
}

/**
 * 
 * @param {MouseEvent} e 
 */
 function mouseClick(e){
    mx = e.clientX;
    my = e.clientY;
    clicked = true;
}


CANVAS.onmousemove = mouseMove;
CANVAS.onclick = mouseClick;

document.body.appendChild(CANVAS);

const COLORS = [
    "grey",
    "blue",
    "red"
];

function Game(){
    this.hlines = [];
    this.vlines = [];

    for(let i = 0; i < 25; i++){
        this.hlines.push(0);
    }
    for(let i = 0; i < 24; i++){
        this.vlines.push(0);
    }
}

function render(){
    let compResponse = false;
    let lastMove = {t:0, r:0, c:0};
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.lineWidth = 5;

    // render horizontal lines
    for(let i = 0; i < 25; i++){
        let row = Math.floor(i/5);
        let col = i % 5;
        ctx.strokeStyle = COLORS[game.hlines[i]];
        ctx.lineWidth = game.hlines[i] === 0 ? 5 : 10;

        ctx.beginPath();

        ctx.moveTo(BUF + col * SEG, BUF + row * SEG);
        ctx.lineTo(BUF + (col + 1) * SEG, BUF + row  * SEG);

        ctx.stroke();
        
        ctx.lineWidth = 25;
        if(ctx.isPointInStroke(mx, my)){
            ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
            ctx.stroke();
            if(clicked){
                clicked = false;
                if(game.hlines[i] === 0){
                    game.hlines[i] = 2;
                    compResponse = true;
                    lastMove = {t:0, r:row, c:col};
                }
            }
        }
        ctx.lineWidth = 5;
    }

    // render vertical lines
    for(let i = 0; i < 24; i++){
        let row = Math.floor(i/6);
        let col = i % 6;
        ctx.strokeStyle = COLORS[game.vlines[i]];
        
        ctx.lineWidth = game.vlines[i] === 0 ? 5 : 10;
        ctx.beginPath();

        ctx.moveTo(BUF + col * SEG, BUF + row * SEG);
        ctx.lineTo(BUF + col * SEG, BUF + (row + 1)  * SEG);

        ctx.stroke();

        ctx.lineWidth = 25;
        if(ctx.isPointInStroke(mx, my)){
            ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
            ctx.stroke();
            if(clicked){
                clicked = false;
                if(game.vlines[i] === 0){
                    game.vlines[i] = 2;
                    compResponse = true;
                    lastMove = {t:1, r:row, c:col};
                }
            }
        }
        ctx.lineWidth = 5;
    }

    ctx.fillStyle = "green";
    ctx.fillRect(mx, my, 5, 5);
    
    if(compResponse){
        compResponse = false;
        if(lastMove.t == 1){
            let row = 3 - lastMove.r;
            let col = 5 - lastMove.c;
            
            let i = row * 6 + col;
            if(game.vlines[i] != 0){
                console.log('error ' + i);
            }else{
                game.vlines[i] = 1;
            }
        }else{
            let row = 4 - lastMove.r;
            let col = 4 - lastMove.c;
            let i = row * 5 + col;
            if(game.hlines[i] != 0){
                console.log('error ' + i);
            }else{
                game.hlines[i] = 1;
            }
        }
    }

    requestAnimationFrame(render);
}

let game = new Game();
game.hlines[12] = 1;
render();
