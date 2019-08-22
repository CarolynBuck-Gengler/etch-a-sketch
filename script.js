let numSquaresPerSide = 16; /* starting value */
let backgroundColor = 'white';
let penColor = "rgba(0,0,0,1)"; /* start with black */
const gridSize = 1000;
const grid = document.querySelector(".cells");

const resetButton = document.querySelector('.resetButton');
const blackButton = document.querySelector('.colorBlack');
const randomButton = document.querySelector('.colorRandom');
const greyButton = document.querySelector('.colorGrey');

resetButton.addEventListener('click', resetGrid, false);
blackButton.addEventListener('click', penBlack, false);
randomButton.addEventListener('click', penRandom, false);
greyButton.addEventListener('click', darken, false);

function penBlack(e) {
    penColor = 'black';
}

function penRandom(e) {
    penColor = 'random';
}

function darken(e) {
    penColor = "rgba(0,0,0,.1)";
}

function resetGrid(e) {
    removeGrid();
    numSquaresPerSide = Number(prompt("How many squares per side? (1-200)",16));
    if (isNaN(numSquaresPerSide) || numSquaresPerSide>200 || numSquaresPerSide<1) {
        alert("need a number between 1 and 200; using default of 16");
        numSquaresPerSide = 16;
    }
    createGrid(numSquaresPerSide);
    turnOnDrawing();
} 

function createGrid(numSquares) {
    const sideVal = Math.floor(gridSize/numSquares*100)/100; /* keep only 2 decimal places, hope the grid looks better for vals that don't divide into 1000 evenly */

    grid.style["grid-template-columns"] = "repeat("+numSquares+",1fr)";
    grid.style["grid-auto-rows"] = gridSize/numSquares+"px";
    for (i=0;i<numSquares;i++) {
        const rowdiv=document.createElement('div');        
        rowdiv.setAttribute('class','row')

        for (j=0;j<numSquares;j++) {
            const coldiv=document.createElement('div');
            coldiv.setAttribute('class','cell');
            coldiv.style["width"] = sideVal+"px";
            coldiv.style["height"] = sideVal+"px";
            coldiv.style.backgroundColor = backgroundColor;
            grid.appendChild(coldiv);
        }
    }
}

function genRandomColor() {
    let r=Math.random()*256;
    let g=Math.random()*256;
    let b=Math.random()*256;
    return "rgb("+r+","+g+","+b+")";
}

function turnOnDrawing() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            if (penColor === 'black') {
                pen = 'black';
            }
            else if (penColor === 'random') {
                pen = genRandomColor();
            }
            else {
                /* check current color of div, and darken by 10% in the alpha arg */
                let curColor = div.style.backgroundColor;
                console.log("current color is "+curColor);
                if (curColor === "white") {
                    // original color; make it the first pencolor
                    pen = penColor;
                } else {
                    curColor = curColor.replace(/[^\d,.]/g, '').split(',');
                    if (curColor.length === 4) {
                        // haven't reached full black yet
                        newAlpha = Number(curColor[3]) +.1;
                    } else { newAlpha = 1;}
                    pen = "rgb(0,0,0,"+newAlpha+")";
                }
            }
            div.style.backgroundColor = pen;
        });
    });
}
function removeGrid() {
    let mycells = document.querySelectorAll(".cell");
    mycells.forEach((div) => {
        grid.removeChild(div);
    });
}

function main() {
    // set up grid
    createGrid(numSquaresPerSide);
    turnOnDrawing();
}

main();