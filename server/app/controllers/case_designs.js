var mongoose, CaseDesign;

/* Include dependencies */
mongoose = require('mongoose');
CaseDesign = mongoose.model('CaseDesign');


/**
 * Type: POST
 * Route: /casedesign
 */
exports.create = function (req, res) {
  var caseDesign = new CaseDesign(req.body);
    CaseDesign.save(function (err) {
      return res.send({
        "error":  err,
        "result": caseDesign
      });
  });
}

/**
 * Type: GET
 * Route: /casedesigns
 */
exports.index = function (req, res) {
  var conditions, fields, options;

  conditions = {};
  fields = {};
  options = {'name': -1};

    CaseDesign.find(conditions, fields, options)
      .exec(function (err, casedesigns) {
        return res.send({
          "error": err,
          "result": casedesigns
        });
      });
}

/**
 * Type: GET
 * Route: /casedesign/:id
 */
exports.show = function (req, res) {
  var id = req.params.id;

  CaseDesign
    .findOne({_id: id})
    .exec(function (err, casedesigns) {
      return res.send({
        "error": err,
        "result": casedesigns
      });
    });
}

/**
 * Type: PUT
 * Route: /casedesign/:id
 */
exports.update = function (req, res) {
  var conditions = {_id: req.params.id},
      update = req.body,
      options = { multi: true },
      callback = function (err, user) {
        return res.send({
          "error": err,
          "result": user
        });
      };
  CaseDesign.findOneAndUpdate(conditions, update, options, callback);
}

/**
 * Type: DELETE
 * Route: /casedesign/:id
 */
exports.destroy = function (req, res) {
  CaseDesign.findByIdAndRemove(req.params.id, function (err, doc) {
    return res.send({
      "error": err,
      "result": (err ? false : true)
    });
  });
}
