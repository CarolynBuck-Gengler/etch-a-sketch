let numSquaresPerSide = 16; /* starting value */
let backgroundColor = 'white';
const gridSize = 1000;
const grid = document.querySelector(".cells");

const resetButton = document.querySelector('.resetButton');
const blackButton = document.querySelector('.colorBlack');
const randomButton = document.querySelector('.colorRandom');
const greyButton = document.querySelector('.colorGrey');

resetButton.addEventListener('click', resetGrid, false);
blackButton.addEventListener('click', notworking, false);
randomButton.addEventListener('click', notworking, false);
greyButton.addEventListener('click', notworking, false);

function notworking(e) {
    alert("functionality not yet working");
}
function resetGrid(e) {
    //const cells = document.querySelectorAll('.cell');
    //cells.forEach((div) => {
        removeGrid();
        //resetButton.removeEventListener('click',resetGrid,false); /*doesn't seem to be helping*/ 
        // div.style.backgroundColor = backgroundColor;
        numSquaresPerSide = Number(prompt("How many squares per side? (1-200)",16));
        console.log("just got new numsides per square = ",numSquaresPerSide);
        console.log(typeof(numSquaresPerSide));
        if (isNaN(numSquaresPerSide) || numSquaresPerSide>200 || numSquaresPerSide<1) {
            alert("need a number between 1 and 200; using default of 16");
            numSquaresPerSide = 16;
        }
        createGrid(numSquaresPerSide);
        turnOnDrawing();
    //});
} 

function toggleBgColor(curColor) {
    // mainly for testing creation of grid
    return (curColor === 'white'?'lightgrey':'white');
}

function createGrid(numSquares) {
    const sideVal = Math.floor(gridSize/numSquares*100)/100; /* keep only 2 decimal places, hope the grid looks better for vals that don't divide into 1000 evenly */
    console.log("start createGrid with numsides = "+numSquares+" and sideVal = "+sideVal);

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
            // coldiv.style.background = backgroundColor;
            // backgroundColor = toggleBgColor(backgroundColor);
            // rowdiv.appendChild(coldiv);
            grid.appendChild(coldiv);
        }
    }
}
function turnOnDrawing() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            div.style.backgroundColor = 'red';
        });
        div.addEventListener('mouseleave', (e) => {
            div.style.backgroundColor = 'pink';
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