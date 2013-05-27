var mongoose, Rating;

/* Include dependencies */
mongoose = require('mongoose');
Rating = mongoose.model('Rating');


/**
 * Type: POST
 * Route: /casedesign/:id/ratings
 */
exports.create = function (req, res) {
  var rating = new Rating({
    amount: req.body.rating,
    caseDesign: req.params.id
  });
    
  rating.save(function (err) {
    return res.send({
      "error":  err,
      "result": rating
    });
  });
}

/**
 * Type: GET
 * Route: /casedesign/:id/ratings
 */
exports.index = function (req, res) {
  var conditions, fields, options;

  conditions = {};
  fields = {};
  options = {'amount': -1};
  // TODO: filter on casedesign
  Rating.find(conditions, fields, options)
    .exec(function (err, ratings) {
      // TODO: calculate average rating for design
      return res.send({
        "error": err,
        "result": ratings
      });
    });
}

/**
 * Type: DELETE
 * Route: /rating/:id
 */
exports.destroy = function (req, res) {
  Rating.findByIdAndRemove(req.params.id, function (err, doc) {
    return res.send({
      "error": err,
      "result": (err ? false : true)
    });
  });
}