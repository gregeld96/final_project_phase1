const { Product } = require('../models');

class Controller {
    static read(req, res){
        Product.findAll({order: [["price", "DESC"]]})
            .then(data => {
                res.render('homepage', {data});
            })
            .catch(err => {
                res.send(err.message);
            })
    }
}

module.exports = Controller;