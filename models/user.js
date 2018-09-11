
const Mongoose = require('mongoose'),
   PassportLocalMongoose = require('passport-local-mongoose'),
   validator = require('validator'),
   Bcrypt = require('bcrypt');

   const DotEnv=require('dotenv');
   DotEnv.config({path:'./variables.env'});

const schema = new Mongoose.Schema({
   username: {
       type: String,
       unique: true,
       required: true,
       trim: true
   },
   email: {
       type: String,
       trim: true,
       unique: true,
       lowercase: true,
       required: 'You must specify an email',
       validate: [validator.isEmail, 'adresse mail invalide']
   },
   password: {
       type: String,
   },
});

schema.methods.generateHash = function (password) {
   return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8), null);
};
schema.methods.validPassword = function (password, user) {
   return Bcrypt.compareSync(password, user.password);
};

schema.plugin(PassportLocalMongoose,{
usernameField:'email',
passwordField:'password',
session:true
});
module.exports=Mongoose.model('user',schema);