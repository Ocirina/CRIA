module.exports = function (app) {
    /*
     var cars, reservations;
     cars = require('../app/controllers/cars.js');
     reservations = require('../app/controllers/reservations.js'),
     administrators = require('../app/controllers/administrators.js');
     */

    // User
    app.get('/user', user.index);
    app.get('/user/:id', user.show);
    app.post('/user/new', user.create);
    app.put('/user/:id', user.update);
    app.delete('/user/:id', user.destroy);

    // CaseDesign
    app.get('/casedesign', casedesign.index);
    app.get('/casedesign/:id', casedesign.show);
    app.post('/casedesign/new', casedesign.create);
    app.put('/casedesign/:id', casedesign.update);
    app.delete('/casedesign/:id', casedesign.destroy);

    // Rating
    app.get('/rating', rating.index);
    app.get('/rating/:id', rating.show);
    app.post('/rating/new', rating.create);
    app.put('/rating/:id', rating.update);
    app.delete('/rating/:id', rating.destroy);

    // Comment
    app.get('/comment', comment.index);
    app.get('/comment/:id', comment.show);
    app.post('/comment/new', comment.create);
    app.put('/comment/:id', comment.update);
    app.delete('/comment/:id', comment.destroy);

    // Order
    app.get('/order', order.index);
    app.get('/order/:id', order.show);
    app.post('/order/new', order.create);
    app.put('/order/:id', order.update);
    app.delete('/order/:id', order.destroy);
}
