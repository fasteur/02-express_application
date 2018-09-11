const Movie = require('../models/movie'); 
const Mongoose = require ('mongoose'); 
Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://@localhost:27017/technocite', (error)=>{
    if(error) throw error; 
    console.log('Mongo is now connected to our system please requests away');
});


module.exports = async ()=>{
    
    let movies = await Movie.find(
        {},{},(error,movie)=>{
            if(error) throw error; 
            console.log(`CLG de movie dans find.js voir callback = ${movie}`);
        }
    ).limit(10);
    console.log(movies);
    return movies
}