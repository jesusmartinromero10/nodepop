var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');
const {query, validationResult} = require('express-validator');


// GET "/tags" Devuelve la lista de los tags permitidos en Nodepop.

router.get("/tags", (req, res, next) => {
  res.send({tags_permitidos: ["lifestyle", "mobile", "motor", "work"]});
});


/* GET home page. */


router.get('/', async (req, res, next) => {
  try {

    // filtros
    const filterByNombre = req.query.nombre;
    const filterByPrecio = req.query.precio;
    const filterByTag = req.query.tags;
    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;
    // ordenar
    const sort = req.query.sort;
    // selección de campos
    const fields = req.query.fields;
    
    
    const filtro = {};
    
    if (filterByNombre) {
      filtro.nombre = filterByNombre;
     
    }

    if (filterByPrecio) {
      filtro.precio = filterByPrecio;
    }

    if(filterByTag) {
      const permitidos = ["lifestyle", "mobile", "motor", "work"]
      if(!permitidos.includes(filterByTag)){
        res.send('Los tags permitidos son "lifestyle", "mobile", "motor", "work"')
      }

      filtro.tags = filterByTag;
    }

    const anuncios = await Anuncio.lista(filtro, skip, limit, sort, fields);
    res.locals.anuncios = anuncios;
    res.render('index');

  } catch (error) {
    next(error);
  }
});
module.exports = router;
