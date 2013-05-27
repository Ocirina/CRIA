module.exports = function (app) {
    var UserCtrl, CaseDesign, Comment, Rating, Comments;
    UserCtrl    = require('../app/controllers/users.js');
    CaseDesign  = require('../app/controllers/case_designs.js');
    Rating      = require('../app/controllers/ratings.js');
    Comments    = require('../app/controllers/comments.js');
    Order       = require('../app/controllers/orders.js');

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

    // Rating
    app.get('/casedesigns/:id/ratings', rating.index);
    app.post('/casedesigns/:id/ratings', rating.create);
    app.delete('/rating/:id', rating.destroy);

    // Order
    app.get('/orders', order.index);
    app.post('/orders/new', order.create);
    app.get('/order/:id', order.show);
    app.put('/order/:id', order.update);
    app.delete('/order/:id', order.destroy);
}
