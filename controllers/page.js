// const i18n = require('i18n');
// const find = require('find')

const Movie = require('../models/movie'); 





exports.index = async (req, res)=>{
// console.log(i18n.__('hello',{ name: 'Toto'}));
// // res.end(res.__('hello'))

  
    let movies = await Movie.find().sort({"fields.rank":1}).limit(10);
   
    

res.render('pages/index',{
    movies_part1 : movies.slice(0,3),
    movies_part2 : movies.slice(3,6),
    movies_part3 : movies.slice(6)
})

}

exports.details = async (req,res)=>{
    let id = req.params.id; 
   
    let movie = await Movie.findOne({_id:id})
  
    res.render('pages/details',{
        title:movie.fields.title,
        movie:movie,
    })
}
exports.reviews=async(req,res)=>{
    let movies= await Movie.find().sort({'fields.title':1});
    let genres=[];
    let years=[];
    let i = 2000, current = parseInt(new Date().getUTCFullYear());
 
    await movies.forEach(async(movie)=>{
        await movie.fields.genres.forEach(async(genre)=>{
            if(genres.lastIndexOf(genre)=== -1){
                await genres.push(genre.trim());
            }
        });
    });
 
    for(i;i<= current;i++)
    {
        years.push(i);
    }
    res.render('pages/reviews',{
        title:'movie reviews',
        movies:movies.slice(0,12),
        genres:genres.sort(),
        years:years.reverse(),
    })
 }



//4. Action de controller qui gere la requete HTTP en AJAX
 exports.filter= async (req , res)=>{

     // récup des param passés par la requete 
     let genre = req.params.genre; 
     let year = req.params.year;
     let page = req.params.page - 1 ; 
     let numberOfResultsToDisplay = 12; 
     console.log(genre);
     console.log(year);
   
    // Récupération des films en DB, en fonction des critères passés par la requête
     let movies = await Movie.find({},{}).limit(5)
    //  .find(
    //      {
    //          $and : [
    //             { 'fields.genres' : { $in : [ genre ] } } ,
    //             { 'fields.year' : year }
    //         ] 
    //     }
    // )
    //  .sort({ 'fields.title': 1 })
    //  .skipt(numberOfResultsToDisplay * page) // 12 * 3 = 36 
    //  .limit( numberOfResultsToDisplay )
    //---------------------------------------------------------------------------
    //  // retourner les résultats 
    //  // méthode 1: retourner la vue compilée coté serveur dans le cas ou il ny a pas de framework coté client 
    //  res.render('partials/movies', {
    //      movies : movies, 
    //      layout : null 
    //  })
     // méthode 2 : retourner du Json
     res.json(movies);// express expose json() sur req, sinon res.end(JSON.stignify(movies))
 }








//  exports.subscribe = (req , res )=> {
//      if(typeof(req.session.passport) !== 'undefined')
//      {
//          res.redirect('/')
//      }
//      else
//      {
//          res.render('pages/subscribe', {
//              title :'Register',
//              h1 :'Register', 
//              hasFooter : true, 
//              action : '/register'
//          })
//      }
//  }