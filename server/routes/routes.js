module.exports = function (app) {
    var UserCtrl, CaseDesignCtrl, CommentCtrl, RatingCtrl;
    UserCtrl        = require('../app/controllers/users.js');
    CaseDesignCtrl  = require('../app/controllers/case_designs.js');
    RatingCtrl      = require('../app/controllers/ratings.js');
    CommentsCtrl    = require('../app/controllers/comments.js');
    OrderCtrl       = require('../app/controllers/orders.js');
    SessionsCtrl    = require('../app/controllers/sessions.js');

    // User
    //app.get('/users', UserCtrl.index);
    app.post('/users', UserCtrl.create);
    app.get('/user/:id', UserCtrl.show);
    app.put('/user/:id', UserCtrl.update);
    app.delete('/user/:id', UserCtrl.destroy);
    
    // Sessions
    app.post('/user/signin', SessionsCtrl.create);
    //app.post('/user/check', SessionsCtrl.check);
    //app.delete('/user/signout', SessionsCtrl.destroy);
    
    // CaseDesign
    app.get('/casedesigns', CaseDesignCtrl.index);    
    app.post('/casedesigns', CaseDesignCtrl.create);
    app.get('/casedesign/:id', CaseDesignCtrl.show);
    app.put('/casedesign/:id', CaseDesignCtrl.update);
    app.delete('/casedesign/:id', CaseDesignCtrl.destroy);

    // Comment
    app.get('/casedesigns/:id/comments', CommentsCtrl.index);
    app.post('/casedesigns/:id/comments', CommentsCtrl.create);
    //app.delete('/comment/:id', CommentsCtrl.destroy);

    // Rating
    app.get('/casedesigns/:id/ratings', RatingCtrl.index);
    app.post('/casedesigns/:id/ratings', RatingCtrl.create);
    //app.delete('/rating/:id', RatingCtrl.destroy);

    // Order
    app.get('/orders', OrderCtrl.index);
    app.post('/orders/new', OrderCtrl.create);
    app.get('/order/:id', OrderCtrl.show);
    app.put('/order/:id', OrderCtrl.update);
    app.delete('/order/:id', OrderCtrl.destroy);
}
