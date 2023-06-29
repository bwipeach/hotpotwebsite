const Cart = require('../models/Cart');
const {
    mongooseToObject,
    mutipleMongooseToObject
} = require('../../util/mongoose');
const Topping = require('../models/Topping');
const Hotpot = require('../models/Hotpot');

class cartController {
    //[GET] cart/booking
    booking(req, res, next) {
        res.render('cart/booking');
    }
    //[GET] cart/product
    product(req, res, next) {
        res.render('cart/product');
    }
    //[GET] /cart/show
    show(req, res, next) {
        Cart.find({})
            .then((cart) => {
                res.render('cart/show', {
                    cart: mutipleMongooseToObject(cart)
                });
            })
            .catch(next);
    }
    //[POST] /cart/hotpot/:id
    async addCartHotpot(req, res, next) {
        let total = 0;
        await Promise.all([
            Cart.findOne({ _id: req.user._id }),
            Hotpot.findOne({ slug: req.params.slug })
        ])
            .then(([cart, hotpot]) => {
                const newItem = {
                    id: hotpot._id,
                    name: hotpot.name,
                    price: hotpot.price,
                    quantity: req.body.quantity
                };
                if (cart) {
                    cart.items.push(newItem);
                    cart.total += newItem.price * newItem.quantity;
                    cart.save().then(() => {
                        res.send('thành công');
                    });
                } else {
                    const newCart = new Cart({
                        _id: req.user._id,
                        items: new Array(),
                        total: newItem.price * newItem.quantity
                    });
                    newCart.items.push(newItem);
                    newCart.save().then(() => {
                        res.send('thành công');
                    });
                }
            })
            .catch(next);
    }

    addCartTopping(req, res, next) {
        Promise.all([
            Cart.findOne({ _id: req.users.id }),
            Topping.findOne({ _id: req.param.id })
        ])
            .then(([cart, topping]) => {
                const newItem = {
                    id: topping._id,
                    name: topping.name,
                    price: topping.price,
                    quantity: req.body.quantity
                };
                if (cart) {
                    cart.items.push(newItem);
                    total += newItem.price * newItem.quantity;
                } else {
                    const newCart = {
                        _id: req.users.id,
                        items: new Array(),
                        total: newItem.price * newItem.quantity
                    };
                    newCart.items.push(newItem);
                    cart = newCart;
                }
                cart.save();
                res.send('thành công');
            })
            .catch(next);
    }
}
module.exports = new cartController();
