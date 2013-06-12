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

    CaseDesign
      .find(conditions, fields, options)
      .populate({
        path: 'user',
        select: 'firstName lastName'
      })
      .exec(function (err, casedesigns) {
        casedesigns = shuffleArray(casedesigns);
        return res.send({
          "error": err,
          "result": casedesigns
        });
      });
  /**
   * Randomize array element order in-place.
   * Using Fisher-Yates shuffle algorithm.
   * @see http://en.wikipedia.org/wiki/Fisher-Yates_shuffle
   * @param Array arr The array to shuffle.
   * @return Shuffled array.
   */
   function shuffleArray ( arr ) {
     var i = arr.length, j, temp;
     if ( i === 0 ) { return false; }
     while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = arr[i];
        arr[i] = arr[j]; 
        arr[j] = temp;
      }
      return arr;
   }
}

/**
 * Type: GET
 * Route: /casedesign/:id
 */
exports.show = function (req, res) {
  CaseDesign
    .findOne({_id: req.params.id})
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
      options = { multi: false },
      callback = function (err, casedesign) {
        return res.send({
          "error": err,
          "result": casedesign
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
