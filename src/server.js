// To use node
const express = require('express');
// For being able to join directory names for easier manipulation
const path = require('path');
const Handlebars = require('handlebars');
// If we want to use handlebars
const exphbs = require('express-handlebars');
// For easier use of CRUD
const methodOverride = require('method-override');
// To handle user sessions
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// Initializations
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));

// To let the app use hbs files for views
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'webdev',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/student'));
app.use(require('./routes/courses'));
app.use(require('./routes/activities'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
});