const mongoose = require ('mongoose');

mongoose.set('strictQuery', false) //quitamos el warning

//para captar si hay error conexion
mongoose.connection.on('error', err => {
    console.log('El error de conexion', err);
});

//la primera vez que se conecta
mongoose.connection.once('open', () => {
    console.log('Conectado a Mongodb en', mongoose.connection.name);
});


//direccion de conexion de la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/anunciosNodepop');

module.exports = mongoose.connection;