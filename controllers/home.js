const { Product, Admin } = require('../models');
const priceSeparator = require('../helpers/priceSeperator');

class Controller {
    static read(req, res){
        Product.findAll({order: [["price", "DESC"]]})
            .then(data => {
                res.render('homepage', {data, priceSeparator});
            })
            .catch(err => {
                res.send(err.message);
            })
    }
}

module.exports = Controller;