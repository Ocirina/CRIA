var mongoose, Comment;

/* Include dependencies */
mongoose = require('mongoose');
Comment = mongoose.model('Comment');


/**
 * Type: POST
 * Route: /casedesign/:id/comments
 */
exports.create = function (req, res) {
  var comment = new Comment({
    comment: req.body.comment,
    caseDesign: req.params.id
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
  var conditions, fields, options;

  conditions = {};
  fields = {};
  options = {'name': -1};
  // TODO: filter on casedesign
  Comment.find(conditions, fields, options)
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
