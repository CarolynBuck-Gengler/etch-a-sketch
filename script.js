const numSquares = 16;
let backgroundColor = 'lightpink';



function main() {

    const gridloc = document.querySelector(".etch-a-sketch-grid");

    for (i=0;i<numSquares;i++) {
        const rowdiv=document.createElement('div');
        
        rowdiv.setAttribute('class','row')

        for (j=0;j<numSquares;j++) {
            // alert("i: "+i+" j: "+j+"bgcolor: "+backgroundColor);
            const coldiv=document.createElement('div');
            coldiv.setAttribute('class','column');
            coldiv.style.background = backgroundColor;
            backgroundColor = toggleBgColor(backgroundColor);
            rowdiv.appendChild(coldiv);
        }

        gridloc.appendChild(rowdiv);
        backgroundColor = toggleBgColor(backgroundColor);


    }



}

function toggleBgColor(curColor) {
    // mainly for testing creation of grid
    return (curColor === 'lightpink'?'orchid':'lightpink');
}




main();