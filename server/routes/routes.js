function authenticated(req, res, next) {
  return next();
  /*if (req.isAuthenticated()) {
      return next();
  }
  return res.send({
    "error": new Error("U moet zich eerst authenticeren voordat u deze actie mag uitvoeren"),
    "result": null
  });*/
}

module.exports = function (app) {
    var User, CaseDesign, Rating, Comment, Order, Session;
    User        = require('../app/controllers/users.js');
    CaseDesign  = require('../app/controllers/case_designs.js');
    Rating      = require('../app/controllers/ratings.js');
    Comment     = require('../app/controllers/comments.js');
    Order       = require('../app/controllers/orders.js');
    Session     = require('../app/controllers/sessions.js');

    // User
    app.post('/users', User.create);
    app.get('/user/:id', User.show);
    app.put('/user/:id', authenticated, User.update);
    app.delete('/user/:id', authenticated, User.destroy);
    
    // Sessions
    app.post('/user/signin', Session.create);
    app.delete('/user/signout', Session.destroy);
    
    // CaseDesign
    app.get('/casedesigns', CaseDesign.index);    
    app.get('/casedesign/:id', CaseDesign.show);
    app.post('/casedesigns', authenticated, CaseDesign.create);
    app.put('/casedesign/:id', authenticated, CaseDesign.update);
    app.delete('/casedesign/:id', authenticated, CaseDesign.destroy);

    // Comment
    app.get('/casedesign/:id/comments', Comment.index);
    app.post('/casedesign/:id/comments', authenticated, Comment.create);
    //app.delete('/comment/:id', Comment.destroy);

    // Rating
    app.get('/casedesign/:id/ratings', Rating.index);
    app.post('/casedesign/:id/ratings', authenticated, Rating.create);
    //app.delete('/rating/:id', Rating.destroy);

    // Order
    app.post('/orders', authenticated, Order.create);
    app.get('/order/:id', authenticated, Order.show);
    app.delete('/order/:id', authenticated, Order.destroy);
}
