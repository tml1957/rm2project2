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

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();
};

window.onload = init;
