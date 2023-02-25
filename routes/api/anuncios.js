const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');


//GET /api/anuncios
//lista los anuncios

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
      const permitidos = ["lifestyle", "mobile", "motor"]
      if(!permitidos.includes(filterByTag)){
        res.send('Los tags permitidos son "lifestyle", "mobile", "motor", "work"')
      }

      filtro.tags = filterByTag;
    }

    const anuncios = await Anuncio.lista(filtro, skip, limit, sort, fields);

    res.json({ results: anuncios });

  } catch (error) {
    next(error);
  }
});

// GET /api/anuncio/(_id)
// Devuelve un anuncio buscando por _id
router.get('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    const anuncio = await Anuncio.findById(id);


    res.json({ result: anuncio });

  } catch (error) {
    next(error);
  }

});

//crear anuncio

router.post('/', async (req, res, next) => {
    try {
  
      const anuncioData = req.body;
  
      // creamos una instancia de Anuncio en memoria
      const anuncio = new Anuncio(anuncioData);
  
      // la persistimos en la BD
      const anuncioGuardado = await anuncio.save();
  
      res.json({ result: anuncioGuardado });
  
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;