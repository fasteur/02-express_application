const app =  require('./app')
const Mongoose = require('mongoose');
//---------------------------------------->



// --------- Connexion Mongoose---------------------->
Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://@localhost:27017/technocite',(error)=>{
    if(error) throw error ;
    console.log('Mongo is now connected to our system please requests away');
});

app.listen(8001, ()=>{
    console.log('server is running on port 8001');
})