const { Product, Admin } = require('../models');
const priceSeparator = require('../helpers/priceSeperator');
const { compare } = require('../helpers/encrypt');

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

    static register (req, res){
        const error = req.query.err || '';
        res.render('register', {error});
    }

    static registerPost (req, res) {
        const newAdmin = {
            username: req.body.username,
            password: req.body.password
        }

        if(req.body.password === req.body.confirmation_password){
            Admin.create(newAdmin)
                .then(data => {
                    res.redirect('/login')
                })
                .catch(err => {
                    let error = Admin.error(err);

                    if(error.length > 0) {
                        res.redirect(`/register?err=${error}`)
                    } else {
                        res.send(err.message)
                    }
                })
        } else {
            const error = `Password and Confirm Password not same`
            res.redirect(`/register?err=${error}`)
        }
    }

    static login (req, res) {
        const error = req.query.err || '';
        res.render('login', {error});
    }

    static loginPost (req, res){
        Admin.findOne({where: {username: req.body.username}})
            .then(data => {
                if(data){
                    if(compare(req.body.password, data.password)){
                        req.session.isLogin = true;
                        res.redirect('/products');
                    } else {
                        const error = `Password wrong`
                        res.redirect(`/login?err=${error}`)
                    }
                } else {
                    req.session.isLogin = false;
                    const error = `Username or Password not the same`
                    res.redirect(`/login?err=${error}`)
                }
            })
            .catch(err => {
                console.log(`SALAH DI LOGIN BRo`);
            })
    }

    static logout(req, res){
        req.session.isLogin = false;
        res.redirect(`/`)
    }
}

module.exports = Controller;