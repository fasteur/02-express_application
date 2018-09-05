var Express = require('express'),
    i18n = require("i18n");
    CookieParser = require('cookie-parser')
    Router = require('./app.router')
    ErrorHandler= require('./helpers/error-handler')
    Engine =require('express-hbs')
    HBSHelpers = require('./helpers/hbs-helpers')
const app = Express()

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
  app.use(CookieParser())
/**
*Set i18n middleware on app 
 */
  app.use(i18n.init)
/**
Set Router on */
  app.use('/',Router)

  /**
  *
   */
   module.exports = app
   app.engine('hbs',Engine.express4({}))

   app.set('view engine','hbs')
  HBSHelpers.registerHelpers(Engine)