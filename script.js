let numSquaresPerSide = 16; /* starting value */
let backgroundColor = 'white';
let penColor = "rgba(0,0,0,1)"; /* start with black */
const gridSize = 800; /* if change gridSize, make sure to change width and height in script.js as well */ 
const grid = document.querySelector(".cells");
let showGridLines = true;
const curPenLoc = document.querySelector(".curPen");
const curNumSidesLoc = document.querySelector(".curSquareNum");

let mouseDownInGrid = false;

const resetButton = document.querySelector('.resetButton');
const blackButton = document.querySelector('.colorBlack');
const randomButton = document.querySelector('.colorRandom');
const greyButton = document.querySelector('.colorGrey');
const rainbowButton = document.querySelector('.colorRainbow');
const blankGridButton = document.querySelector('.blankGridButton');
const toggleGridButton = document.querySelector('.toggleGridLines');

let hue=0;

resetButton.addEventListener('click', resetGrid, false);
blackButton.addEventListener('click', penBlack, false);
randomButton.addEventListener('click', penRandom, false);
greyButton.addEventListener('click', gradual, false);
rainbowButton.addEventListener('click', rainbow, false);
blankGridButton.addEventListener('click', blankGrid, false);
toggleGridButton.addEventListener('click', toggleGrid,false);

// document.addEventListener('mousedown', makeMouseDownTrue, false);
// document.addEventListener('mouseup', makeMouseDownFalse, false);

// function makeMouseDownTrue(e) {
//     mouseDownInGrid = true;
// }
// function makeMouseDownFalse(e) {
//     mouseDownInGrid = false;
// }
document.addEventListener('mousedown', () => mouseDownInGrid = true);
document.addEventListener('mouseup', () => mouseDownInGrid = false);

function penBlack(e) {
    penColor = 'black';
    curPenLoc.textContent = "Black";
}

function penRandom(e) {
    penColor = 'random';
    curPenLoc.textContent = "Random";
}

function gradual(e) {
    penColor = "rgba(0,0,0,.1)";
    curPenLoc.textContent = "Gradually darkening grey";
}

function rainbow(e) {
    penColor = 'rainbow';
    curPenLoc.textContent = "Rainbow";
}

function blankGrid(e) {
    let mycells = document.querySelectorAll(".cell");
    mycells.forEach((div) => {
        div.style.backgroundColor = backgroundColor;
    });    
}

function toggleGrid(e) {
    /* Show either gridlines and border in same light grey color OR show no gridlines and darker border */
    /* toggle back and forth between these states */
    let mycells = document.querySelectorAll(".cell");
    if (showGridLines) {
        /* turn off gridlines for each cell and turn on outer border */
        grid.style.border = "2px solid #676565"; /* a very dark grey*/
        mycells.forEach((div) => {
            div.style.border = "none";
        });  
        toggleGridButton.textContent = "Show grid lines";  
    } else {
        /* turn on gridlines for each cell and turn off outer border */
        grid.style.border = "none";
        mycells.forEach((div) => {
            div.style.border = "solid rgb(245, 245, 245) 1px";
        });
        toggleGridButton.textContent = "Show outer border";
    }
    showGridLines = (showGridLines?false:true);
}

function resetGrid(e) {
    removeGrid();
    let newnumsquares = Number(prompt("How many squares per side? (1-100)",numSquaresPerSide));
    if (isNaN(newnumsquares) || newnumsquares>100 || newnumsquares<1) {
        alert("need a number between 1 and 100; using previous value "+numSquaresPerSide);
        // numSquaresPerSide = 16;
    } else { 
        numSquaresPerSide = newnumsquares; 
        curNumSidesLoc.textContent = numSquaresPerSide;
    }
    createGrid(numSquaresPerSide);
    setPenColor();
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

function setPenColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            // console.log("current mouse down status is "+ mouseDownInGrid);
            if (mouseDownInGrid) {
                if (penColor === 'black') {
                    pen = 'black';
                }
                else if (penColor === 'random') {
                    pen = genRandomColor();
                }
                else if (penColor === 'rainbow') {
                    pen = `hsl(${hue},100%,50%)`;
                    hue++;
                    if (hue >= 360) hue = 0;
                }
                else {
                    /* gradual change from light grey to black */
                    /* check current color of div, and darken by 10% in the alpha arg */
                    /* sometimes colors that are originally 'black' get changed to 'rgb(0,0,0)'
                    need to differentiate between squares that have reached black and not change 
                    them back to light gray, and black that was placed there by drawing in black. 
                    Do that by making full black arrived at by this method to be gb(0,0,0,.99)*/
                    let curColor = div.style.backgroundColor;
                    // console.log("current color: "+curColor);
                    if (curColor === "white") {
                        // original color; make it the first pencolor
                        pen = penColor;
                    } else {
                        curColor = curColor.replace(/[^\d,.]/g, '').split(',');
                        // console.log(curColor);
                        if (curColor.length === 4) {
                            alpha = Number(curColor[3]);
                            if (alpha < .9) {
                                // haven't reached full black yet
                                newAlpha = Number(curColor[3]) +.1;
                            } else {
                                newAlpha = .99;
                            }
                            pen = "rgb(0,0,0,"+newAlpha+")";

                        } else { 
                            /* current color has an rgb with 3 values */
                            /* want to reset this to the grey! */
                            pen = penColor; /* this is the original grey, i.e. black with alpha=.1*/
                        }
                    }
                }
                div.style.backgroundColor = pen;
            }
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
    setPenColor();
}

main();