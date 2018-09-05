const i18n = require('i18n');

exports.index = (req, res)=>{
console.log(i18n.__('hello',{ name: 'Toto'}));
// res.end(res.__('hello'))
res.render('index',{

})
}