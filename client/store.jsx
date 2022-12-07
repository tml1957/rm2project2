const helper = require('./helper.js');

//Handles border puschase form post requests
const handleBorder = (e) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, {_csrf}, changeBorderStatus);

    return false;
};

//Handles color purchase form post requests
const handleColor = (e) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, {_csrf}, changeColorStatus);

    return false;
};

//Returns the border purchase form
const BorderForm = (props) => {
    return ( 
        <div id='borderPurchaseForm'>
            <p>Gain access to new borders for your pictos!
            <br></br><br></br>
            Included in this package:<br></br>
            - Gold <br></br>
            - Purple <br></br>
            </p>
            
            <form id="borderForm"
                onSubmit={handleBorder}
                name="borderForm"
                action="/setBorder"
                method="POST"
                className="borderForm"
            >
                <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                <input className="makeBorderSubmit" type="submit" value="Purchase Border Pack" />
            </form>
        </div>
    );
};

//Returns the color purchase form
const ColorForm = (props) => {
    return ( 
        <div id='colorPurchaseForm'>
            <p>Gain access to new colors to use in your pictos!
            <br></br><br></br>
            Included in this package:<br></br>
            - Black <br></br>
            - Orange <br></br>
            - Blue <br></br>
            </p>
            <form id="colorForm"
                onSubmit={handleColor}
                name="colorForm"
                action="/setColor"
                method="POST"
                className="colorForm"
            >
                <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                <input className="makeColorSubmit" type="submit" value="Purchase Color Pack" />
            </form>
        </div>
    );
};

//Once borders have been purchased, replace the form with "PURCHASED"
const changeBorderStatus = () => {
    document.querySelector('#borderPurchaseForm').innerHTML = 'PURCHASED!';
};

//Once colors have been purchased, replace the form with "PURCHASED"
const changeColorStatus = () => {
    document.querySelector('#colorPurchaseForm').innerHTML = 'PURCHASED!';
};

//Variables to determine whether or not to show the forms
let showBorderForm = true;
let showColorForm = true;

//Makes get request to see if borders have been purchased
//If they have, call the change status method
const checkBorderStatus = async () => {
    const response = await fetch('/getBorder');
    const data = await response.json();

    console.log(data);

    if (data.border.boughtBorderPack)
    {
        changeBorderStatus();
        showBorderForm = false;
    }
};

//Makes get request to see if colors have been purchased
//If they have, call the change status method
const checkColorStatus = async () => {
    const response = await fetch('/getColor');
    const data = await response.json();

    console.log(data);

    if (data.color.boughtColorPack)
    {
        changeColorStatus();
        showColorForm = false;
    }
};

//Initalizes border and color forms
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    checkBorderStatus();

    if (showBorderForm) {
        ReactDOM.render(
            <BorderForm csrf={data.csrfToken} />,
            document.getElementById('borderForm')
        );
    }

    checkColorStatus();

    if (showColorForm) {
        ReactDOM.render(
            <ColorForm csrf={data.csrfToken} />,
            document.getElementById('colorForm')
        );
    }
};

window.onload = init;