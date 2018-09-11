var Express = require('express'),
    i18n = require("i18n"),
    CookieParser = require('cookie-parser'),
    Router = require('./app.router'),
    ErrorHandler= require('errorhandler'),
    Engine =require('express-hbs'),
    HBSHelpers = require('./helpers/hbs-helpers'),
    app = Express(),
    ErrorHelper = require('./helpers/error-handler'),
    LocalStrategy = require('passport-local').Strategy,
    Passport = require('passport'),
    DotEnv = require('dotenv');
    Session = require ('express-session'),
    BodyParser = require('body-parser'),
    SessionStore = new Session.MemoryStore,
    ExpressValidator =require('express-validator');
const User = require('./models/user'); 


DotEnv.config( { path : './variables.env'})

/**
Configure i18n module */
i18n.configure({
    locales:['en', 'fr'],
    coolie: 'movies-app-locales',
    directory: __dirname + '/locales'
});
/**
*Expore cookies on req.cookies
 */
app.use( CookieParser())
/**
*Set i18n middleware on app 
 */
app.use(i18n.init)
app.engine('hbs',Engine.express4({
       partialsDir : `${__dirname}/views/partials`,
       defaultLayout : `${__dirname}/views/layouts/default.hbs`
   }))
app.set('view engine','hbs')
//HBSHelpers---
HBSHelpers.registerHelpers(Engine)
app.use(Express.static('public'))

//body parser 
app.use( BodyParser.json() );
app.use( BodyParser.urlencoded({ extended : true} ) ); 
//---Define authentification manager---
app.use(CookieParser(process.env.SECRET));
app.use( Session({
    cookie : { maxAge : 60000},
    store : SessionStore, 
    secret : process.env.SECRET, 
    resave : true, 
    saveUninitialized: true
}))
/**
 * Passport configuration 
 */

Passport.use( User.createStrategy() );
Passport.serializeUser( User.serializeUser() );
Passport.deserializeUser( User.deserializeUser() ); 
/**
 * Define passport module initialize
 */
app.use( Passport.initialize())
/**
 * Define session provider for authentification 
 */
app.use( Passport.session())

/**
 * Set validation engine
 */
app.use( ExpressValidator() );
/**
Set Router on */
app.use('/',Router)

/**
 * Errors handler
 */
if(process.env.APP_ENV === 'development')
{
    app.use( ErrorHandler( { log : ErrorHelper.notify }))
}
/**
*
 */
module.exports = app