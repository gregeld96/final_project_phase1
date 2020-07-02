const controller = require('../controllers/home');
const route = require('express').Router();

route.get('', controller.read);
route.get('/register', controller.register)
route.get('/login', controller.login)
route.get('/logout', controller.logout)
route.post('/register', controller.registerPost)
route.post('/login', controller.loginPost)

module.exports = route;