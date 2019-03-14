module.exports = function (app, passport) {
    const fs = require('fs');

    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/guests',
        failureRedirect: '/login',
        failureFlash: true
    }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/guests', function (req, res) {
        res.render('guests.ejs', {
        });
    });

    app.get('/rooms', function (req, res) {
        res.render('rooms.ejs', {
        });
    });

    app.get('/reservations', function (req, res) {
        res.render('reservations.ejs', {

        });
    });

    app.get('/emergency', function (req, res) {
        res.render('emergency.ejs', {

        });
    });

    app.get('/invoice', function (req, res) {
        res.render('invoice.ejs', {

        });
    });

    app.get('/js/invoice.js', function(req,res) {
        res.writeHead(200, { 'Content-Type': 'application/js' });
        fs.readFile('js/invoice.js', function(err, data) {
          res.write(data);
          res.end();
        });
    });

    app.get('/style.css', function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fs.readFile('views/style.css', function (err, data) {
            res.write(data);
            res.end();
        });
    })

    app.get('/Company_Logo.jpg', function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fs.readFile(`views/Company_Logo.jpg`, function (err, data) {
            res.write(data);
            res.end();
        });
    });

    app.get('/src/Comfortaa-Regular.ttf', function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(`views/src/Comfortaa-Regular.ttf`, function (err, data) {
            res.write(data);
            res.end();
        });
    })

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
