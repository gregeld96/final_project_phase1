const controller = require('../controllers/home');
const route = require('express').Router();

route.get('', controller.read);

module.exports = route;