const homeRouter = require('./home');
const hotpotRouter = require('./hotpots');
const warehouseRouter = require('./warehouse');
const toppingRouter = require('./toppings');
const cartRouter = require('./cart');
const menuRouter = require('./menu');
const userRouter = require('./user');
route = (app) => {
    app.use('/hotpots', hotpotRouter);
    app.use('/warehouse', warehouseRouter);
    app.use('/toppings', toppingRouter);
    app.use('/menu', menuRouter);
    app.use('/cart', cartRouter);
    app.use('/', homeRouter);
    app.use('/user', userRouter);
};
module.exports = route;
