const numSquares = 16;
let backgroundColor = 'white';


function main() {
    // set up grid
    
    createGrid();
    const cells = document.querySelectorAll('.cell');

    // alert("about to do event listener part");
    // alert(cells);
    // console.log(cells);
    cells.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            div.style.backgroundColor = 'red';
        });
        div.addEventListener('mouseleave', (e) => {
            div.style.backgroundColor = 'pink';
        });
        // div.addEventListener('click', (e) => {
        //     console.log(e);
        //     alert("click on cell ");
        // });
    });




}

function toggleBgColor(curColor) {
    // mainly for testing creation of grid
    return (curColor === 'white'?'rgb(243, 243, 243)':'white');
}

function createGrid() {
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