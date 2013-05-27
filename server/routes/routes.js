module.exports = function (app) {


    // User
    app.get('/user', user.index);
    app.post('/user/new', user.create);
    app.put('/user/:id', user.update);
    app.delete('/user/:id', user.destroy);

    // CaseDesign
    app.get('/casedesign', casedesign.index);
    app.post('/casedesign/new', casedesign.create);
    app.put('/casedesign/:id', casedesign.update);
    app.delete('/casedesign/:id', casedesign.destroy);

    /*
    var cars, reservations;
    cars = require('../app/controllers/cars.js');
    reservations = require('../app/controllers/reservations.js'),
    administrators = require('../app/controllers/administrators.js');
    
    app.post('/cars', cars.create);
    app.post('/search', cars.search);
    app.get('/cars/brands', cars.brands);
    app.get('/cars/brands/:brand', cars.types);
    app.get('/cars/statics/sold/month', cars.staticsSoldPerMonth);
    app.get('/cars/statics/sold/brand', cars.staticsSoldPerBrand);
    app.get('/cars/:id/sold', cars.sold);
    app.get('/cars/:id', cars.detail);
    app.get('/cars', cars.list);
    app.put('/cars/:id', cars.update);
    app.delete('/cars/:id', cars.delete);
    */
}
