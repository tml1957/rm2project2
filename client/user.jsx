const helper = require('./helper.js');

//Returns all of the users pictos as div elements using retrieved info from mongo
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
            <div key={picto._id} className="userPicto">
                <img src={picto.pictoURL} alt="picto post" className={`pictoPost${picto.borderColor}`} />
            </div>
        );
    });

    //Return pictos
    return (
        <div className='userPictoList'>
            {pictoNodes}
        </div>
    );
};

//Retrieves only user pictos from the server
const loadPictosFromServer = async () => {
    const response = await fetch('/getPictos');
    const data = await response.json();

    console.log(data);

    ReactDOM.render(
        <PictoList pictos={data.pictos} />,
        document.getElementById('pictos')
    );
};

//Sends get request to retrieve username
const loadUsername = async () => {
    const response = await fetch('/getUsername');
    const data = await response.json();

    console.log(data);

    //Will display username at the top of the page
    ReactDOM.render(
        <h1 className="centerAlign">{data.username.username}'s Page</h1>,
        document.getElementById('username')
    );
};

//Initializes pictolist and loads in data and username
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <PictoList pictos={[]} />,
        document.getElementById('pictos')
    );

    loadUsername();
    loadPictosFromServer();
};

window.onload = init;
