const mongoose = require ('mongoose');

//creo shema anuncio

const schemaAnuncio = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

schemaAnuncio.statics.lista = function(filtro, skip, limit, sort, fields) {
    const query = Anuncio.find(filtro); 
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec();
  }

// crear el modelo de Agente
const Anuncio = mongoose.model('Anuncio', schemaAnuncio);





// exportar el modelo
module.exports = Anuncio;