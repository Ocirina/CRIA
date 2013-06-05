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
    user: req.body.userid
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
    
  function calculateAverage(ratings){
    var sum = 0, count = 0;
    for (index in ratings) {
      sum += parseInt(ratings[index]);
      count += 1
    }
    return (sum / count);
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
