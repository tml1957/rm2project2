const helper = require('./helper.js');

const PictoList = (props) => {
    if (props.pictos.length === 0) {
        return (
            <div className="pictoList">
                <h3 className='emptyPicto'>No Pictos Yet!</h3>
            </div>
        );
    }

    const pictoNodes = props.pictos.map(picto => {
        console.log(picto);

        return (
            <div key={picto._id} className="picto">
                <img src={picto.pictoURL} alt="picto post" className='pictoPost' />
            </div>
        );
    });

    return (
        <div className='pictoList'>
            {pictoNodes}
        </div>
    );
};

const loadPictosFromServer = async () => {
    const response = await fetch('/getAll');
    const data = await response.json();

    console.log(data);

    ReactDOM.render(
        <PictoList pictos={data.pictos} />,
        document.getElementById('pictos')
    );
};

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
