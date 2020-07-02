const { Company } = require('../models');

class Controller {
    static read(req, res){
        Company.findAll()
            .then(data => {
                const error = req.query.err;
                delete req.query.err;
                res.render('company', {data, error});
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static add(req, res){
        const error = req.query.err;
        delete req.query.err;
        res.render('addCompany', {error});
    }

    static addPost(req, res){
        const newCompany = {
            name: req.body.name,
            store: req.body.store
        }

        Company.create(newCompany)
            .then(data => {
                res.redirect('/companies');
            })
            .catch(err => {
                let errArr = [];
                if(err.name === "SequelizeValidationError") {
                    for(let i = 0; i < err.errors.length; i++){
                        errArr.push(err.errors[i].message);
                    }
                }

                if(errArr.length > 0){
                    res.redirect(`/companiess/add?err=${errArr}`);
                } else {
                    res.send(err.message);
                }
            })
    }

    static edit(req, res){
        Company.findByPk(req.params.id)
            .then(data => {
                const error = req.query.err;
                delete req.query.err;
                res.render('editCompany', {data, error});
            })
            .catch(err => {
                res.send(err.message);
            })
        
    }

    static editPost(req, res){
        const editCompany = {
            name: req.body.name,
            store: req.body.store
        }

        Company.update(editCompany, {where: {id: req.params.id}})
            .then(data => {
                res.redirect('/companies');
            })
            .catch(err => {
                let errArr = [];
                if(err.name === "SequelizeValidationError") {
                    for(let i = 0; i < err.errors.length; i++){
                        errArr.push(err.errors[i].message);
                    }
                }

                if(errArr.length > 0){
                    res.redirect(`/companies/${req.params.id}/edit?err=${errArr}`);
                } else {
                    res.send(err.message);
                }
            })
    }

    static delete(req, res){
        Company.destroy({where: {id: req.params.id}})
            .then(data => {
                res.redirect('/companies')
            })
            .catch(err => {
                res.send(err.message);
            })
    }
}

module.exports = Controller;