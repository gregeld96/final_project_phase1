const { ProductCompany, Company, Product } = require('../models');
const priceSeparator = require('../helpers/priceSeperator');

class Controller {
    static add(req, res){
        let allProduct = [];
        Product.findAll()
            .then(product => {
                allProduct = product;
                return Company.findByPk(req.params.id, { 
                    include: ProductCompany
                 })
            }).then(data => {
                //console.log(allCast);
                const errors = req.query.err || '';
                res.render('addProductCompany', { data, allProduct, priceSeparator, errors})
            }).catch(err => {
                res.send(err.message)
            })
    }

    static addPost(req, res) {
        let input = {
            productId: req.body.productId,
            companyId: req.params.id,
        }

        ProductCompany.create(input)
            .then(data => {
                res.redirect(`/productcompanies/${req.params.id}/add`)
            }).catch(err => {
                let errArr = [];
                if(err.name === "SequelizeValidationError") {
                    for(let i = 0; i < err.errors.length; i++) {
                        errArr.push(err.errors[i].message)
                    }
                }

                if(errArr.length > 0) {
                    res.redirect(`/productCompanies/${req.params.id}/add?err=${errArr}`)
                } else {
                    res.send(err.message)
                }
            })
    }

    static detail (req, res) {
        let allCompany = []

        Product.findAll()
            .then(movie => {
                allMovies = movie;
                return Cast.findByPk(req.params.id, { 
                    include: MovieCast
                })
            }).then(data => {
                res.render('movlist', { data, allMovies, ageCalculate })
            }).catch(err => {
                res.send(err.message)
            })
    }
}

module.exports = Controller;