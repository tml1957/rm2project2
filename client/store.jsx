const helper = require('./helper.js');

const handleBorder = (e) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, {_csrf}, changeBorderStatus);

    return false;
};

const handleColor = (e) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, {_csrf}, changeColorStatus);

    return false;
};

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

const changeBorderStatus = () => {
    document.querySelector('#borderPurchaseForm').innerHTML = 'PURCHASED!';
};

const changeColorStatus = () => {
    document.querySelector('#colorPurchaseForm').innerHTML = 'PURCHASED!';
};

let showBorderForm = true;
let showColorForm = true;

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