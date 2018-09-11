const [major, minor] = process.versions.node.split('.').map( parseFloat )
if(major < 7 || major === 7 && minor <= 5){
    console.log('--- The node version of the server is too low for modern node programming');
    throw ('The node version of the server is too low for modern node programming')
}
const DotEnv = require('dotenv');
const app =  require('./app')
const Mongoose = require('mongoose');
//---------------------------------------->



DotEnv.config( { path : './variables.env'})
// --------- Connexion Mongoose---------------------->
Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://@localhost:27017/technocite',(error)=>{
    if(error) throw error ;
    console.log('Mongo is now connected to our system please requests away');
});

app.listen(process.env.PORT, ()=>{
    console.log('server is running on port '+ process.env.PORT);
})