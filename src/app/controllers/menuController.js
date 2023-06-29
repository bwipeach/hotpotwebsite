const Hotpot = require('../models/Hotpot');
const Topping = require('../models/Topping');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class menuController {
    //[GET] /menu/hotpots
    hotpot(req, res, next) {
        Hotpot.find({})
            .then((hotpot) => {
                res.render('menu/hotpot', {
                    hotpot: mutipleMongooseToObject(hotpot)
                });
            })
            .catch(next);
    }
    //[GET] /menu/toppings
    topping(req, res, next) {
        Topping.find({})
            .then((topping) => {
                res.render('menu/topping', {
                    topping: mutipleMongooseToObject(topping)
                });
            })
            .catch(next);
    }

    //[GET] /search
    // search(req, res){
    //     console.log(req.query.q)
    //     res.render('search')
    // }
}

module.exports = new menuController();
