var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');
const {query, validationResult} = require('express-validator');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {

    const anuncios = await Anuncio.find();
    res.locals.anuncios = anuncios;

    // res.render('index', { title: 'Nodepop' });
    res.render('index');

  } catch (err) {
    next(err);
  }
});


module.exports = router;
