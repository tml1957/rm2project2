const helper = require('./helper.js');

const handleBorder = (e) => {
    e.preventDefault();
    helper.hideError();

    helper.sendPost(e.target.action, {}, changeBorderStatus);

    return false;
};

const handleColor = (e) => {
    e.preventDefault();
    helper.hideError();

    helper.sendPost(e.target.action, {}, changeColorStatus);

    return false;
};

const BorderForm = (props) => {
    return ( 
        <div id='borderPurchaseForm'>
            <p>Gain access to new borders for your pictos!
            <br></br><br></br>
            Included in this package:<br></br>
            <ul>
                <li>
                    Gold
                </li>
                <li>
                    Purple
                </li>
                <li>
                    Platinum
                </li>
            </ul>
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
            <ul>
                <li>
                    Black
                </li>
                <li>
                    Orange
                </li>
                <li>
                    Blue
                </li>
            </ul>
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

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <BorderForm csrf={data.csrfToken} />,
        document.getElementById('borderForm')
    );

    ReactDOM.render(
        <ColorForm csrf={data.csrfToken} />,
        document.getElementById('colorForm')
    );
};

window.onload = init;