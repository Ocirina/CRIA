module.exports = function (app) {
    var UserCtrl;
    UserCtrl = require('../app/controllers/users.js');

    // User
    app.get('/users', UserCtrl.index);
    app.post('/users', UserCtrl.create);
    app.get('/user/:id', UserCtrl.show);
    app.put('/user/:id', UserCtrl.update);
    app.delete('/user/:id', UserCtrl.destroy);
    
    // CaseDesign
    app.get('/casedesigns', casedesign.index);    
    app.post('/casedesigns/new', casedesign.create);
    app.get('/casedesign/:id', casedesign.show);
    app.put('/casedesign/:id', casedesign.update);
    app.delete('/casedesign/:id', casedesign.destroy);

    // Comment
    app.get('/casedesigns/:id/comments', comment.index);
    app.post('/casedesigns/:id/comments', comment.create);
    app.delete('/comment/:id', comment.destroy);
    
    /*
    // Order
    app.get('/orders', order.index);
    app.post('/orders/new', order.create);
    app.get('/order/:id', order.show);
    app.put('/order/:id', order.update);
    app.delete('/order/:id', order.destroy);
    
    // Rating
    app.get('/ratings', rating.index);
    app.post('/ratings/new', rating.create);
    app.get('/rating/:id', rating.show);
    app.put('/rating/:id', rating.update);
    app.delete('/rating/:id', rating.destroy);
    */
}
