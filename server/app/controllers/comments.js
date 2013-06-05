// Include dependencies
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');


/**
 * Type: POST
 * Route: /casedesign/:id/comments
 */
exports.create = function (req, res) {
  var comment = new Comment({
    comment: req.body.comment,
    caseDesign: req.params.id,
    user: req.body.userid
  });
    
  comment.save(function (err) {
    return res.send({
      "error":  err,
      "result": comment
    });
  });
}

/**
 * Type: GET
 * Route: /casedesign/:id/comments
 */
exports.index = function (req, res) {
  Comment
    .find({caseDesign: req.params.id}, {}, {'posted_at': -1})
    .exec(function (err, comments) {
      return res.send({
        "error": err,
        "result": comments
      });
    });
}

/**
 * Type: DELETE
 * Route: /comment/:id
 */
exports.destroy = function (req, res) {
  Comment.findByIdAndRemove(req.params.id, function (err, doc) {
    return res.send({
      "error": err,
      "result": (err ? false : true)
    });
  });
}
