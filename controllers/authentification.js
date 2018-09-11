const Passport = require('passport')
/**
 * 
 */
exports.login = Passport.authenticate('local', { 
    successRedirect : '/',
    failureRedirect : '/login'
    
})
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.logout = (req , res) =>{ 
    req.logout(); 
    res.redirect('/');
}
/**
 * 
 * @param {s} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/login')
    }
    
}