const mongoose = require ('mongoose');

//creo shema anuncio

const schemaAnuncio = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

schemaAnuncio.statics.lista = async function(filtro, skip, limit, sort, fields) {
    //cojo de filtro la palabra nombre que es la key del objeto y la convierto en string
    if(Object.keys(filtro).toString() === 'nombre'){ 
    //busco todos los anuncios que tenemos  
      const aaa = await Anuncio.find()
      
      const filt = []
    //recorro los anuncios uno por uno
      const bbb = aaa.forEach(a => {
     //por cada aununcio si empieza por la o las letras (startsWith) que metamos en la url lo metemos en el array filt   
        if(a.nombre.startsWith(filtro.nombre)){
        filt.push(a.nombre)
        
        return filt
      }
      })
      //buscamos los anuncios con esos nombres que trae filt
      const query = Anuncio.find({ nombre : filt }); 
      query.skip(skip);
      query.limit(limit);
      query.sort(sort);
      query.select(fields);
      return query.exec();

    }
    else {
      const query = Anuncio.find(filtro); 
      query.skip(skip);
      query.limit(limit);
      query.sort(sort);
      query.select(fields);
      return query.exec();
    }
  }

// crear el modelo de Agente
const Anuncio = mongoose.model('Anuncio', schemaAnuncio);





// exportar el modelo
module.exports = Anuncio;