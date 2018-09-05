const i18n= require('i18n')
exports.registerHelpers = (hbs)=>{
    hbs.registerHelper('t', function(){
        return i18n.__.apply(this, arguments)
    })
}