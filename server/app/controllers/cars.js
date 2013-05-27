var mongoose, Car, Url;

/* Include dependencies */
mongoose = require('mongoose');
Car = mongoose.model('Car');
Url = require('url');

/**
 * Ups the item in the array.
 * If the item doesn't exists then it will add it.
 * @param {String} key The key of the item in the array.
 * @param {Object} array The array of items from which to up the count.
 * @return {Object} The array.
 */
function upItem(key, array){
    if (!array[key]){
        array[key] = 0;
    }
    array[key] += 1;
    return array;
}

/**
 * Type: POST
 * Route: /cars
 * This route is for creating new Car models.
 */
exports.create = function (req, res) {
    var doc = new Car(req.body);
    doc.save(function (err) {
        return res.send({
            "error": err,
            "result": doc
        });
    });
}

/**
 * Type: GET
 * Route: /cars
 * This route is for retrieving a list of Car models.
 * It is always ordered by price descending.
 */
exports.list = function (req, res) {
    var conditions, fields, options;
    conditions = {};
    fields = {};
    options = {'price': -1};
    Car .find(conditions, fields, options)
        .where('sold').equals(false)
        .exec(function (err, doc) {
            return res.send({
                "error": err,
                "result": doc
            });
        });
}

/**
 * Type: GET
 * Route: /cars/:id
 * This route is for retrieving a list of Car models.
 * It is always ordered by price descending.
 */
exports.detail = function (req, res) {
    Car
        .findOne({_id: req.params.id})
        .populate({
          path: 'reservations',
          select: '-car -modificationDate -keywords',
          options: { limit: 5, sort: [['price', -1 ]] }
        })
        .where('sold').equals(false)
        .exec(function (err, doc) {
            return res.send({
                "error": err,
                "result": doc
            });
        });
}

/**
 * Type: PUT
 * Route: /cars/:id
 * Updates the given car with the posted data.
 */
exports.update = function (req, res) {
    var conditions, update, options, callback;
    conditions = {_id: req.params.id};
    update = req.body;
    options = { multi: true }
    callback = function (err, doc) {
        return res.send({
            "error": err,
            "result": doc
        });
    };
    Car.findOneAndUpdate(conditions, update, options, callback);
}

/**
 * Type: GET
 * Route: /cars/:id/sold
 * Updates the car to be sold.
 */
exports.sold = function (req, res) {
    var conditions, update, options, callback;
    conditions = {_id: req.params.id};
    update = {sold:true, soldOn: new Date()};
    options = { multi: true }
    callback = function (err, doc) {
        return res.send({
            "error": err,
            "result": doc
        });
    };
    Car.findOneAndUpdate(conditions, update, options, callback);
}

/**
 * Type: GET
 * Route: /cars/statics/sold/month
 * This route is for getting sales per month sorted by month.
 */
exports.staticsSoldPerMonth = function(req, res) {
    var conditions, fields, options;
        conditions = {soldOn: {$ne: null}};
        fields = 'soldOn';
        options = {'soldOn': -1},
        year = (req.params.year ? parseInt(req.params.year) : new Date().getFullYear());

    Car .find(conditions, fields, options)
        .exec(function(err, cars){
            var grouped = groupByMonth(cars, year);
            return res.send({
                error: err,
                result: grouped
            });
        });

    /**
     * Groups the cars by month for the current year.
     * This method is made as a temp replacement for the vague aggregate method.
     * @param {Object} Records from the database.
     * @return {Object} Grouped records.
     */
    function groupByMonth(cars, year) {
        var months, month;
        months = initMonths();
        for(carindex in cars) {
            if (cars[carindex] && cars[carindex].soldOn.getFullYear() === year) {
                month = cars[carindex].soldOn.getMonth() + 1;
                months = upItem(month, months);
            }
        }
        return months;
    }

    /**
     * Initialize an empty array with 12 items for the 12 months.
     * @return {Object} A list with 12 (months) empty items.
     */
    function initMonths() {
        var months = {};
        for (i = 1; i <= 12; i++) {
            months[i] = 0;
        }
        return months;
    }
};

/**
 * Type: GET
 * Route: /cars/statics/sold/brand
 * Retrieves the cars sold by brand. The return will be a key (Brand) to
 * value (Count) array.
*/
exports.staticsSoldPerBrand = function(req, res) {
    var conditions, fields, options;
        conditions = {soldOn: {$ne: null}};
        fields = 'brand';
        options = {'brand': -1};

    Car .find(conditions, fields, options)
        .exec(function(err, cars){
            var grouped = groupByBrand(cars);
            return res.send({
                error: err,
                result: grouped
            });
        });

    /**
     * Groups the cars by brand.
     * This method is made as a temp replacement for the vague aggregate method.
     * @param {Object} Records from the database.
     * @return {Object} Grouped records.
     */
    function groupByBrand(cars) {
        var brands = {};
        for(carindex in cars) {
            if (cars[carindex]) {
                brands = upItem(cars[carindex].brand, brands);
            }
        }
        return brands;
    }
};

/**
 * Type: POST
 * Route: /search
 * This route is used for searching on the car brand and type.
 */
exports.search = function(req, res) {
    var select = {};
    if (req.body.brand != 'null') {
        select.brand = req.body.brand;
    }
    if (req.body.type != 'null') {
        select.type = req.body.type;
    }
    Car
        .find(select)
        .exec(function(err, cars) {
            return res.send({
                "error": err,
                "result": cars
            });
        });
};

/**
 * Type: GET
 * Route: /cars/brands
 * This will retrieve a list of all the brands used in the database.
 */
exports.brands = function(req, res){
    Car
        .find({}, {'_id':0,'brand':1}, {'group': 'brand'})
        .distinct('brand', function(err, brands) {
            return res.send({
                "error": err,
                "result": brands
            });
    });
};
/**
 * Type: GET
 * Route: /cars/brands/:brand
 * With the given brand all the types are retrieved from the database.
 */
exports.types = function(req, res){
    Car
        .find({'brand': req.params.brand}, {'_id':0,'type':1}, {'group': 'type'})
        .distinct('type', function(err, brands) {
            return res.send({
                "error": err,
                "result": brands
            });
    });
};


/**
 * Type: DELETE
 * Route: /cars/:id
 * Removes the car from the database.
 * NOTE: the middleware will remove all associated Reservations.
 */
exports.delete = function (req, res) {
    Car.findByIdAndRemove(req.params.id, function (err, doc) {
        return res.send({
            "error": err,
            "result": {_id: req.params.id}
        });
    });
}
