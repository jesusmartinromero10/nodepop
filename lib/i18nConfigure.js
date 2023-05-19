const i18n = require ('i18n')
const path = require('path')

i18n.configure({
    locales:['es','en'],//idiomas a traducir
    directory: path.join(__dirname,'..','locales'), //creamos la ruta a la carpeta locales
    defaultLocale: 'en', // lenguaje por defecto
    autoReload:true, //mira los cambios automanticamente
    syncFiles:true, //crea literal nuevo y lo escribe automanticamente en todos los idiomas
    cookie: 'nodepop-locale', //le damos a i18n el nombre de la cookie para qu ela conozca
})


i18n.setLocale('en') //para poderlo usar en scripts

module.exports=i18n
