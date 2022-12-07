const models = require('../models');

const { Account } = models;

// Render login page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

// Render signup page
const signupPage = (req, res) => {
  res.render('signup', { csrfToken: req.csrfToken() });
};

// Render not found page
const notFoundPage = (req, res) => res.render('notFound');

// Render change password page
const changePage = (req, res) => res.render('change');

// Log user out
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// Handles login post requests to the server
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

// Handles signup post requests to the server
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

// Handles get requests for the current username
const getUsername = (req, res) => {
  Account.findUsername(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Cant find Username' });
    }

    return res.json({ username: doc });
  });
};

// Handles password changes
const changePassword = async (req, res) => {
  // Takes both passwords from the requers submissione
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // Double checks to see that both passwords match and are valid
  if (!pass || !pass2) {
    return res.status(400).json({ error: 'Bro enter a password!' });
  }
  if (pass !== pass2) {
    return res.status(400).json({ error: 'Your new passwords do not match!' });
  }

  // Generates a hash from the new password
  const hash = await Account.generateHash(pass);

  // Update the user's password with the new hashed password
  await Account.changePassword(req.session.account._id, hash);

  return res.status(200).json({ error: 'Password updated' });
};

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

module.exports = {
  loginPage,
  signupPage,
  notFoundPage,
  changePage,
  changePassword,
  login,
  logout,
  signup,
  getUsername,
  getToken,
};
