const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getUsername', mid.requiresLogin, controllers.Account.getUsername);
  app.get('/getPictos', mid.requiresLogin, controllers.Picto.getPictos);
  app.get('/getAll', mid.requiresLogin, controllers.Picto.getAll);
  app.get('/getBorder', mid.requiresLogin, controllers.Store.getBorder);
  app.get('/getColor', mid.requiresLogin, controllers.Store.getColor);

  app.post('/setBorder', mid.requiresLogin, controllers.Store.setBorder);
  app.post('/setColor', mid.requiresLogin, controllers.Store.setColor);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/change', mid.requiresLogin, controllers.Account.changePage);
  app.post('/change', mid.requiresLogin, controllers.Account.changePassword);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Picto.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Picto.makePicto);

  app.get('/community', mid.requiresLogin, controllers.Picto.communityPage);
  app.get('/user', mid.requiresLogin, controllers.Picto.userPage);
  app.get('/store', mid.requiresLogin, controllers.Store.storePage);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.get('/*', controllers.Account.notFoundPage);
};

module.exports = router;
