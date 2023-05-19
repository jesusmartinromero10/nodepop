const express = require('express')
const router = express.Router()

router.get('/:locale', (req, res, next) =>{
    const locale = req.params.locale
    //ponemos una cookies en la respuesta que indique al browser el nuevo locale
    res.cookie('nodepop-locale', locale, { //añadimos un nombre a la cookie y le pasamos el parametro locale que llevara la cookie
        maxAge: 1000 * 60 * 60 * 24 * 30 //tiene un mes de vida
    })

    //redireccionamos a la pagina desde donde veniamos con la cookie con el idioma

    res.redirect(req.get('referer')); //referer nos da donde veniamos

})

module.exports = router