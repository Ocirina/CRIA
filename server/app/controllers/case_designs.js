// Include dependencies
var mongoose = require('mongoose');
var CaseDesign = mongoose.model('CaseDesign');
var User = mongoose.model('User');


/**
 * Type: POST
 * Route: /casedesigns
 */
exports.create = function (req, res) {
  var caseDesign = new CaseDesign(req.body);
  
  /**
   * Save base64 as png image
   * @see http://stackoverflow.com/questions/6926016/nodejs-saving-a-base64-encoded-image-to-disk
   */
  var base64Data = req.body.preview.replace(/^data:image\/png;base64,/, "");
  var fileName = "public/upload/"+safeFileName(caseDesign._id);
  require("fs").writeFile(fileName, base64Data, 'base64', function(err) {
    caseDesign.preview = fileName.replace("public/", "");
    getUser(req, res, caseDesign);
  });
  
  /**
   * Finds the User that is logged into. When found it pushes the caseDesign
   * into its collection. 
   * @param Object req The request object.
   * @param Object res The response object.
   * @param Object caseDesign The new instance of caseDesign.
   */
  function getUser(req, res, caseDesign) {
    User.findById(req.body.user, function(err, user) {
      user.caseDesigns.push(caseDesign._id);
      user.save(req, function(err) {
        saveDesign(req, res, caseDesign);
      });
    });
  }
  
  /**
   * Saves the caseDesign and returns the object in the response.
   * @param Object req The request object.
   * @param Object res The response object.
   * @param Object caseDesign The new instance of caseDesign.
   */
  function saveDesign(req, res, caseDesign) {
    caseDesign.save(function (err) {
      delete caseDesign.canvas;
      return res.send({
        "error":  err,
        "result": caseDesign
      });
    });
  }
  
  /**
   * Converts the given name into a name safe for files.
   * @param String name The name to convert.
   * @return String Save png filename.
   */
  function safeFileName(name) {
    name = name.toString();
    name = slugify(name);
    return name+'.png'
  }
  
  /**
   * Converts the string to slugified string. This removes all spaces for "-".
   * Swaps accents for there normal characters and removes unsave characters.
   * Then it removes double dashes.
   * @param String str The string to slugify.
   * @return String The slugified string.
   */
  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
}

/**
 * Type: GET
 * Route: /casedesigns
 */
exports.index = function (req, res) {
  var conditions, fields, options;

  conditions = {};
  fields = '-canvas';
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
    .select('-canvas')
    .populate({
      path: 'user',
      select: '_id firstName lastName'
    })
    .exec(function (err, casedesigns) {
      return res.send({
        "error": err,
        "result": casedesigns
      });
    });
}
/**
 * Type: GET
 * Route: /canvas/:id
 */
exports.canvas = function (req, res) {
  CaseDesign
    .findOne({_id: req.params.id})
    .select('_id name canvas user')
    .populate({
      path: 'user',
      select: '_id firstName lastName'
    })
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
