// Include dependencies
var mongoose = require('mongoose');
var Rating = mongoose.model('Rating');


/**
 * Type: POST
 * Route: /casedesign/:id/ratings
 */
exports.create = function (req, res) {
  var rating = new Rating({
    amount: req.body.rating,
    caseDesign: req.params.id,
    user: req.body.user
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
  
  Rating
    .find({caseDesign: req.params.id}, {}, {})
    .exec(function (err, ratings) {
      return res.send({
        "error": err,
        "result": calculateAverage(ratings)
      });
    });
  
  /**
   * Calculates the average rating of the product. The algorithm is the default
   * for calculation averages. The sum of all the ratings divided by the amout of
   * ratings.
   * @param {Array} ratings An array with ratings.
   */
  function calculateAverage(ratings) {
    var sum = 0, count = 0, index;
    for (index in ratings) {
      sum += +ratings[index].amount;
      count += 1
    }
    return Math.round(sum / count);
  }
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
