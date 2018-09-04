const Express = require('express')
        Router = Express.Router()
        PageController = require(`${process.cwd()}/controllers/page`)

Router 
    .route('/')
    .get(PageController.index)

module.exports = Router