const Express = require('express')
        Router = Express.Router()
        PageController = require(`${process.cwd()}/controllers/page`)

Router 
    .route('/')
    .get(PageController.index)



Router 
.route('/review/:id')
.get(PageController.details)

Router 
.route('/reviews')
.get(PageController.reviews)

// 4. Définition de la route qui reçoit la requête HTTP en AJAX
Router 
.route('/reviews/:genre/:year/:page')
.get(PageController.filter)

module.exports = Router