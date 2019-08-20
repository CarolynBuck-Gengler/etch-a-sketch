const numSquares = 16;
let backgroundColor = 'white';



function main() {

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

        // gridloc.appendChild(rowdiv);
        // backgroundColor = toggleBgColor(backgroundColor);


    }



}

function toggleBgColor(curColor) {
    // mainly for testing creation of grid
    return (curColor === 'white'?'rgb(243, 243, 243)':'white');
}




main();