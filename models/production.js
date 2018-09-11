const Mongoose = require('mongoose');
let Schema = Mongoose.Schema;


let schema = new Schema({
    company: {
        type : String,
        required: true,
        enum:['MGM','Universal','Tartempion'] // La companie doit absolument faire partie de ces trois là 
    }, 
    director: String,   
});

module.exports= Mongoose.model('Production',schema);