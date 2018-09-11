const Express = require('express'),
        Router = Express.Router(),
        PageController = require(`${process.cwd()}/controllers/page`),
        AuthentificationController = require(`${process.cwd()}/controllers/authentification`)

Router 
    .route('/')
    .get(PageController.index)

Router 
    .route('/review/:id')
    .get(PageController.details)
Router 
    .route('/about')
    .get(
    [
        AuthentificationController.isAuthenticated, 
        PageController.about
    ])

Router 
    .route('/reviews')
    .get(PageController.reviews)

// 4. Définition de la route qui reçoit la requête HTTP en AJAX
Router 
    .route('/reviews/:genre/:year/:page')
    .get(PageController.filter)

Router 
    .route('/register')
    .get(PageController.subscribe)
    .post(PageController.validateSubscription, PageController.register)
Router 
    .route('/login')
    .get(PageController.login)
    .post(AuthentificationController.login)

Router 
.route('/logout')
.get(AuthentificationController.logout)
   



module.exports = Router