const Hotpot = require('../models/Hotpot');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Topping = require('../models/Topping');
class warehouseController {
    //[GET] /warehouse/stored/hotpots
    storedHotpots(req, res, next) {
        Promise.all([
            Hotpot.find({}),
            Topping.find({}),
            Hotpot.countDocumentsDeleted(),
            Topping.countDocumentsDeleted()
        ])
            .then(([hotpot, topping, deleteCount, deleteToppingCount]) => {
                res.render('warehouse/stored-hotpots', {
                    // deleteCount,
                    // deleteToppingCount,
                    hotpot: mutipleMongooseToObject(hotpot),
                    topping: mutipleMongooseToObject(topping),
                    deleteHp: deleteCount + deleteToppingCount
                });
            })
            .catch(next);
    }

    //[GET] /warehouse/trash/hotpots
    trashHotpots(req, res, next) {
        Promise.all([Hotpot.findDeleted({}), Topping.findDeleted({})])
            .then(([hotpot, topping]) =>
                res.render('warehouse/trash-hotpots', {
                    hotpot: mutipleMongooseToObject(hotpot),
                    topping: mutipleMongooseToObject(topping)
                })
            )
            .catch(next);
    }
}

module.exports = new warehouseController();
