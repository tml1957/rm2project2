const helper = require('./helper.js');

const handlePicto = (e) => {
    e.preventDefault();
    helper.hideError();

    const pictoURL = canvasURLData.toDataURL();
    const _csrf = e.target.querySelector('#_csrf').value;

    let borderColor;
    if (allowBorder)
        borderColor = e.target.querySelector('#borderChooser').value;
    else
        borderColor = 'Black';
    
    helper.sendPost(e.target.action, {pictoURL, borderColor, _csrf}, Success);

    return false;
};

const Success = () => {
    console.log("successful post!");
};

const PictoForm = (props) => {
    return ( 
        <div>
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
                    <select id="lineWidthChooser" defaultValue={"3"}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </label>
                
                <div id="colorSelector">
                    <label>Color: 
                        <select id="colorChooser" defaultValue={"Red"}>
                            <option value="red">Red</option>
                            <option value="black">Black</option>
                            <option value="orange">Orange</option>
                            <option value="blue">Blue</option>
                        </select>
                    </label>
                </div>
                
                <span><input id="clearButton" type="button" value="Clear"/></span>
                <span>
                    <form id="pictoForm"
                        onSubmit={handlePicto}
                        name="pictoForm"
                        action="/maker"
                        method="POST"
                        className="pictoForm"
                    >
                        <div id="borderSelector">
                            <label>Border: 
                                <select id="borderChooser" defaultValue={"Black"}>
                                    <option value="Black">Black</option>
                                    <option value="Purple">Purple</option>
                                    <option value="Gold">Gold</option>
                                </select>
                            </label>
                        </div>
                        <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                        <input className="makePictoSubmit" type="submit" value="Post" />
                    </form>
                </span>
            </div>

        </div>
    );
};

let allowBorder = true;
let allowColor = true;

const checkBorderStatus = async () => {
    const response = await fetch('/getBorder');
    const data = await response.json();

    if (!data.border.boughtBorderPack)
    {
        allowBorder = false;
        document.querySelector('#borderSelector').innerHTML = '';
    }
};

const checkColorStatus = async () => {
    const response = await fetch('/getColor');
    const data = await response.json();

    if (!data.color.boughtColorPack)
    {
        allowColor = false;
        document.querySelector('#colorSelector').innerHTML = '';
    }
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    checkBorderStatus();

    ReactDOM.render(
        <PictoForm csrf={data.csrfToken} />,
        document.getElementById('makePicto')
    );
    
    checkColorStatus();
    canvasInit();
};

// GLOBALS
let canvas,ctx,dragging=false,lineWidth,strokeStyle;
	
// CONSTANTS
let DEFAULT_LINE_WIDTH = 3;
let DEFAULT_STROKE_STYLE = "red";

let canvasURLData;


// FUNCTIONS
function canvasInit(){
    // initialize some globals
    canvas = document.querySelector('#mainCanvas');
    canvasURLData = canvas;
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

    if (allowColor)
        document.querySelector('#colorChooser').onchange = doColorChange;

    document.querySelector('#clearButton').onclick = doClear;
}

function doLineWidthChange(e){
    lineWidth = e.target.value;
}

function doColorChange(e){
    strokeStyle = e.target.value;
}

// EVENT CALLBACK FUNCTIONS
function doMousedown(e){
    dragging = true;
    // get location of mouse in canvas coordinates
    let mouse = getMouse(e);
    // PENCIL TOOL
    ctx.beginPath();
    // move pen to x,y of mouse
    ctx.moveTo(mouse.x, mouse.y);
}

 function doMousemove(e) {
     // bail out if the mouse button is not down
    if(! dragging) return;
    // get location of mouse in canvas coordinates
    let mouse = getMouse(e);
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
    let mouse = {}
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
    for (let x = cellWidth + 0.5; x < ctx.canvas.width; x += cellWidth) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.stroke();
    }
    
    for (let y = cellHeight + 0.5; y < ctx.canvas.height; y += cellHeight) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
    }
    
    
    // restore the drawing state
    ctx.restore();
}

window.onload = init;
