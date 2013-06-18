/**
 * Ensure that the route is only called when authenticated.
 * If it's not the case it will return a response for authentication.
 * @param {Object} req The request made.
 * @param {Object} res The response object.
 * @param {Function} next The next function (The destination controller action).
 */
function authenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  return res.send({
    "error": "U moet zich eerst authenticeren voordat u deze actie mag uitvoeren",
    "result": null
  });
}

module.exports = function (app) {
    var User, CaseDesign, Rating, Comment, Order;
    User        = require('../app/controllers/users.js');
    CaseDesign  = require('../app/controllers/case_designs.js');
    Rating      = require('../app/controllers/ratings.js');
    Comment     = require('../app/controllers/comments.js');
    Order       = require('../app/controllers/orders.js');

    // User
    app.get('/user/:id', User.show);
    app.get('/gallery/:id', User.gallery);
    app.post('/users', User.create);
    app.put('/user/:id', authenticated, User.update);
    app.delete('/user/:id', authenticated, User.destroy);
    
    // CaseDesign
    app.get('/casedesigns', CaseDesign.index);
    app.get('/casedesign/:id', CaseDesign.show);
    app.get('/canvas/:id', authenticated, CaseDesign.canvas);
    app.post('/casedesigns', authenticated, CaseDesign.create);
    app.put('/casedesign/:id', authenticated, CaseDesign.update);
    app.delete('/casedesign/:id', authenticated, CaseDesign.destroy);

    // Comment
    app.get('/casedesign/:id/comments', Comment.index);
    app.post('/casedesign/:id/comments', authenticated, Comment.create);
    app.delete('/comment/:id', Comment.destroy);

    // Rating
    app.get('/casedesign/:id/ratings', Rating.index);
    app.post('/casedesign/:id/ratings', authenticated, Rating.create);
    //app.delete('/rating/:id', Rating.destroy);

    // Order
    app.post('/orders', Order.create);
    app.get('/order/:id', authenticated, Order.show);
    app.delete('/order/:id', authenticated, Order.destroy);
}
