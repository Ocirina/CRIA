module.exports = function (app) {
    /*
     var cars, reservations;
     cars = require('../app/controllers/cars.js');
     reservations = require('../app/controllers/reservations.js'),
     administrators = require('../app/controllers/administrators.js');
     */

    // User
    app.get('/users', user.index);
    app.post('/users', user.create);
    app.get('/user/:id', user.show);
    app.put('/user/:id', user.update);
    app.delete('/user/:id', user.destroy);

    // CaseDesign
    app.get('/casedesigns', casedesign.index);    
    app.post('/casedesigns/new', casedesign.create);
    app.get('/casedesign/:id', casedesign.show);
    app.put('/casedesign/:id', casedesign.update);
    app.delete('/casedesign/:id', casedesign.destroy);

    // Rating
    app.get('/ratings', rating.index);
    app.post('/ratings/new', rating.create);
    app.get('/rating/:id', rating.show);
    app.put('/rating/:id', rating.update);
    app.delete('/rating/:id', rating.destroy);

    // Comment
    app.get('/comments', comment.index);
    app.post('/comments/new', comment.create);
    app.get('/comment/:id', comment.show);
    app.put('/comment/:id', comment.update);
    app.delete('/comment/:id', comment.destroy);

    // Order
    app.get('/orders', order.index);
    app.post('/orders/new', order.create);
    app.get('/order/:id', order.show);
    app.put('/order/:id', order.update);
    app.delete('/order/:id', order.destroy);
}
