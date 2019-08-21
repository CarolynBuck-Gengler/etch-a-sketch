let numSquaresPerSide = 16;
let backgroundColor = 'white';
const gridSize = 1000;



function main() {
    // set up grid
    
    createGrid(numSquaresPerSide);
    const cells = document.querySelectorAll('.cell');

    cells.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            div.style.backgroundColor = 'red';
        });
        div.addEventListener('mouseleave', (e) => {
            div.style.backgroundColor = 'pink';
        });
    });

    const resetButton = document.querySelector('.resetButton');
    resetButton.addEventListener('click', (e) => {
        cells.forEach((div) => {
            div.style.backgroundColor = backgroundColor;
        });
    });

}

function toggleBgColor(curColor) {
    // mainly for testing creation of grid
    return (curColor === 'white'?'rgb(243, 243, 243)':'white');
}

function createGrid(numSquares) {
    const gridloc = document.querySelector(".etch-a-sketch-grid");

    for (i=0;i<numSquares;i++) {
        const rowdiv=document.createElement('div');
        
        rowdiv.setAttribute('class','row')

        for (j=0;j<numSquares;j++) {
            const coldiv=document.createElement('div');
            coldiv.setAttribute('class','cell');
            // coldiv.style.background = backgroundColor;
            // backgroundColor = toggleBgColor(backgroundColor);
            // rowdiv.appendChild(coldiv);
            gridloc.appendChild(coldiv);
        }

    }
}




main();