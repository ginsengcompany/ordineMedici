var util = require('util');

module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.render('login');
    });

    app.get('/home', function (req, res, next) {
        res.render('index');
    });

    app.get('/creaEvento', function (req, res, next) {
        res.render('creaEvento');
    });

    app.get('/assegnaEvento', function (req, res, next) {
        res.render('assegnaEvento');
    });

    app.get('/gestioneNotifiche', function (req, res, next) {
        res.render('gestioneNotifiche');
    });

    app.get('/modificaEvento', function (req, res, next) {
        res.render('modificaEvento');
    });

    app.get('/aggiungiContatto', function (req, res, next) {
        res.render('aggiungiContatto');
    });

    app.get('/gestioneApp', function (req, res, next) {
        res.render('gestioneApp');
    });

    app.get('/gestioneEmail', function (req, res, next) {
        res.render('gestioneEmail');
    });

    app.get('/tabEmail', function (req, res, next) {
        res.render('tabEmail');
    });

    app.post('/', function (req, res, next) {

        // you might like to do a database look-up or something more scalable here
        if (req.body.userAuthenticated && req.body.userAuthenticated === true) {
            req.session.authenticated = true;
            res.redirect('/home');
        }

    });

    app.get('/logout', function (req, res, next) {
        delete req.session.authenticated;
        res.redirect('/');
    });

};