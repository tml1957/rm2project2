const helper = require('./helper.js');

//Handles sending the post request for the password change
const handleChange = (e) => {
    e.preventDefault();
    helper.hideError();

    //Takes values from the pass word change form
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    //Ensures user entered password and that passwords match
    if(!pass || !pass2) {
        helper.handleError('Bro enter a password!');
        return false;
    }
    if(!pass !== !pass2) {
        helper.handleError('Your new passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {pass, pass2, _csrf});

    return false;
}

//Returns the change password form
const ChangePassWindow = (props) => {
    return (
        <form id="changeForm"
            name="changeForm"
            onSubmit={handleChange}
            action="/change"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="Enter Password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="Retype Password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="signInSubmit" type="submit" value="Change Password!" />
        </form>
    );
};

//Initalizes the change password form for the handlebars page.
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<ChangePassWindow csrf={data.csrfToken} />,
    document.getElementById('content'));
};

window.onload = init;