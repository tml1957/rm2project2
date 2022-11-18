const helper = require('./helper.js');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    const color = e.target.querySelector('#domoColor').value;

    if (!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, _csrf, color}, loadDomosFromServer);

    return false;
};

const DomoForm = (props) => {



    return ( 
        <body>
            <canvas id="mainCanvas" width="700" height="500">
            Get a real browser!
            </canvas>
            
            <div id="controls">
                <label>Tool:
                    <select id="toolChooser">
                        <option value="toolPencil">Pencil</option>
                    </select>
                </label>
                
                <label>Line Width: 
                    <select id="lineWidthChooser">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" selected>3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </label>
                
                
                <span><input id="clearButton" type="button" value="Clear"/></span>
                <span><input id="exportButton" type="button" value="Export"/></span>
            </div>

        </body>
    );
};

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className='emptyDomo'>No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        let srcString;

        console.log(domo);

        if (domo.color === "green") {
            srcString = "/assets/img/greendomoface.jpg"
        } else if (domo.color === "pink") {
            srcString = "/assets/img/pinkdomoface.jpg"
        } else {
            srcString = "/assets/img/domoface.jpeg"
        }

        return (
            <div key={domo._id} className="domo">
                <img src={srcString} alt="domo face" className='domoFace' />
                <h3 className='domoName'>Name: {domo.name} </h3>
                <h3 className='domoAge'>Age: {domo.age} </h3>
            </div>
        );
    });

    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();

    console.log(data);

    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );

    canvasInit();

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();
};

// GLOBALS
var canvas,ctx,dragging=false,lineWidth,strokeStyle;
	
// CONSTANTS
var DEFAULT_LINE_WIDTH = 3;
var DEFAULT_STROKE_STYLE = "red";


// FUNCTIONS
function canvasInit(){
    // initialize some globals
    canvas = document.querySelector('#mainCanvas');
    ctx = canvas.getContext('2d');
lineWidth = DEFAULT_LINE_WIDTH;
strokeStyle = DEFAULT_STROKE_STYLE;

// set initial properties of the graphics context
ctx.lineWidth = lineWidth;
ctx.strokeStyle = strokeStyle;
ctx.lineCap = "round"; // "butt", "round", "square" (default "butt")
ctx.lineJoin = "round"; // "round", "bevel", "miter" (default “miter")

drawGrid(ctx,'lightgray', 10, 10);

canvas.onmousedown = doMousedown;
canvas.onmousemove = doMousemove;
canvas.onmouseup = doMouseup;
canvas.onmouseout = doMouseout;
    
document.querySelector('#lineWidthChooser').onchange = doLineWidthChange;

document.querySelector('#clearButton').onclick = doClear;
document.querySelector('#exportButton').onclick = doExport;
    
}

function doLineWidthChange(e){
    lineWidth = e.target.value;
}

// EVENT CALLBACK FUNCTIONS
function doMousedown(e){
    dragging = true;
    // get location of mouse in canvas coordinates
    var mouse = getMouse(e);
    // PENCIL TOOL
    ctx.beginPath();
    // move pen to x,y of mouse
    ctx.moveTo(mouse.x, mouse.y);
}

 function doMousemove(e) {
     // bail out if the mouse button is not down
    if(! dragging) return;
    // get location of mouse in canvas coordinates
    var mouse = getMouse(e);
    // PENCIL TOOL
    // set ctx.strokeStyle and ctx.lineWidth to correct global values
    ctx.strokeStyle = strokeStyle; ctx.lineWidth = lineWidth;
    // draw a line to x,y of mouse
    ctx.lineTo(mouse.x, mouse.y);
    // stroke the line
    ctx.stroke();

}

function doMouseup(e) {
    console.log(e.type);
    dragging = false;
}

// if the user drags out of the canvas
function doMouseout(e) {
    console.log(e.type);
    dragging = false;
}

function doClear(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawGrid(ctx,'lightgray', 10, 10);
}

function doExport(){
    // open a new window and load the image in it
    // http://www.w3schools.com/jsref/met_win_open.asp
    var data = canvas.toDataURL(); 
    var windowName = "canvasImage";
    var windowOptions = "left=0,top=0,width=" + canvas.width + ",height=" + canvas.height +",toolbar=0,resizable=0";
    var myWindow = window.open(data,windowName,windowOptions);
    myWindow.resizeTo(canvas.width,canvas.height); // needed so Chrome would display image
 }


// UTILITY FUNCTIONS
/*
These utility functions do not depend on any global variables being in existence, 
and produce no "side effects" such as changing ctx state variables.
They are "pure functions" - see: http://en.wikipedia.org/wiki/Pure_function
*/

// Function Name: getMouse()
// returns mouse position in local coordinate system of element
// Author: Tony Jefferson
// Last update: 3/1/2014
function getMouse(e){
    var mouse = {}
    mouse.x = e.pageX - e.target.offsetLeft;
    mouse.y = e.pageY - e.target.offsetTop;
    return mouse;
}

/*
Function Name: drawGrid()
Description: Fills the entire canvas with a grid
Last update: 9/1/2014
*/
function drawGrid(ctx, color, cellWidth, cellHeight){
    // save the current drawing state as it existed before this function was called
    ctx.save()
    
    // set some drawing state variables
    ctx.strokeStyle = color;
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 0.5;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // vertical lines all set!
    for (var x = cellWidth + 0.5; x < ctx.canvas.width; x += cellWidth) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.stroke();
    }
    
    for (var y = cellHeight + 0.5; y < ctx.canvas.height; y += cellHeight) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
    }
    
    
    // restore the drawing state
    ctx.restore();
}

window.onload = init;
