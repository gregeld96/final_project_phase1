const route = require('express').Router();
const controller = require('../controllers/productcompany');

route.get('/:id/add', controller.add);
route.get('/:id/detail', controller.detail);
route.post('/:id/add', controller.addPost);

module.exports = route;