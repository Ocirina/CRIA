// Include dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition for CaseDesign.
var CaseDesign = Schema({
    name:           {type: String,  required: true, index: true},
    shared:         {type: Boolean, required: true},
    user:           {type: Schema.Types.ObjectId, ref: 'User'},
    preview:        {type: Schema.Types.ObjectId, ref: 'CaseDesign'},
    caseModel:      {type: Schema.Types.ObjectId, ref: 'CaseModel'},
    designObjects:  [{type: Schema.Types.ObjectId, ref: 'DesignObject'}]
});

/**
 * Before saving it creates the designObjects send with the order.
 * I've chosen for a middleware function to keep the controllers more clean.
 * @see http://mongoosejs.com/docs/middleware.html
 *
 * Note:
 * I found a problem which wasn't described in the documentation online.
 * The documentation doesn't say a thing about executing the callback given
 * with the save method. This method must be executed manually within the middleware.
 * Found the solution with this url: https://github.com/LearnBoost/mongoose/issues/499
 *
 * Note:
 * The reference to this is to the CaseDesign instance which will be saved.
 * This wasn't documented and solution was found here: http://stackoverflow.com/a/14774743/1988125
 */
CaseDesign.pre('save', function(next, req, callback){
  var design = this; // See second note above.
  var cb = function(err, line){
    if (!err) {
      design.designObjects.push(line._id);
      next(callback);
    }
    else {next(err);}
  };
  createDesignObjects(req.body.designObjects, design, cb);
  
  /**
   * Loops throught the orderlines and calls the createOrder method.
   * @param {Array} designObjects An array of designObjects objects from the request.
   * @param {Object} design Reference to the CaseDesign instance
   * @param {Function} cb Callback to execute on save of an orderline. 
   */
  function createDesignObjects(designObjects, design, cb) {
    for (var index in designObjects) {
      createDesignObject(designObjects[index], design, cb);
    }
  }
  
  /**
   * Creates the DesignObject object from the Mongoose models.
   * It also associates the orderline with order and executes the callback on save.
   * @param {Array} designObjects An array of designObjects objects from the request.
   * @param {Object} design Reference to the CaseDesign instance
   * @param {Function} cb Callback to execute on save of an designObject. 
   */
  function createDesignObject(designObjects, design, cb) {
    var DesignObject = mongoose.models["DesignObject"];
    var item = new DesignObject(designObjects);
    item.design = design._id;
    item.save(cb);
  }
});

// Define the Mongoose model.
mongoose.model("CaseDesign", CaseDesign, "CaseDesigns");