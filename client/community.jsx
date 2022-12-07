const helper = require('./helper.js');

//Returns all pictos as div elements using retrieved info from mongo
const PictoList = (props) => {

    //If there are no pictos in the server return a message
    if (props.pictos.length === 0) {
        return (
            <div className="pictoList centerAlign">
                <h3 className='emptyPicto'>No Pictos Yet!</h3>
            </div>
        );
    }

    //Map all retrieved pictos to div elements in a reverse order
    const pictoNodes = props.pictos.slice(0).reverse().map(picto => {
        console.log(picto);

        return (
            <div key={picto._id} className="picto">
                <img src={picto.pictoURL} alt="picto post" className={`pictoPost${picto.borderColor}`} />
            </div>
        );
    });

    //Return pictos
    return (
        <div className='pictoList'>
            {pictoNodes}
        </div>
    );
};

//Retrieves all pictos from the server
const loadPictosFromServer = async () => {
    const response = await fetch('/getAll');
    const data = await response.json();

    console.log(data);

    ReactDOM.render(
        <PictoList pictos={data.pictos} />,
        document.getElementById('pictos')
    );
};

//Initalizes the PictoList element and calls the function to load in pictos from the server
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <PictoList pictos={[]} />,
        document.getElementById('pictos')
    );

    loadPictosFromServer();
};

window.onload = init;
