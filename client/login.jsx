const helper = require('./helper.js');

//Handles the login post request using the helper sendPost function
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    //Retrieves data from login form
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    //Check to see if both username and password have been entered
    if(!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, _csrf});

    return false;
}

//Handles the signup post request using the helper sendPost function
const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    //Retrieves data from signup form
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    //Check to see if both username and passwords have been entered as well as if passwords match
    if(!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if(!pass !== !pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2, _csrf});

    return false;
}

//Returns Login Form
const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id='user' type="text" name="username" placeholder="Enter Username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="Enter Password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="signInSubmit" type="submit" value="Log In!" />
        </form>
    );
};

//Returns Signup Form
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id='user' type="text" name="username" placeholder="Enter Username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="Enter Password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="Retype Password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="signInSubmit" type="submit" value="Signup!" />
        </form>
    );
};

//Intializes login and signup forms
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken} />,
            document.getElementById('content'));
            return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf={data.csrfToken} />,
            document.getElementById('content'));
            return false;
    });

    ReactDOM.render(<LoginWindow csrf={data.csrfToken} />,
        document.getElementById('content'));
};

window.onload = init;