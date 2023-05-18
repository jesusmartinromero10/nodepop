'use strict';

const Anuncio = require('../models/Anuncio');
const connection = require('../lib/connectMongoose');
const Usuario = require('../models/Usuarios')

main().catch(err => console.log('Hubo un error', err));

async function main() {

  // inicializamos colección de anuncios
  await initAnuncios();

  // inicializamos colección de usuarios
  await initUsuarios();

  connection.close();

}

async function initAnuncios() {
  // borrar todos los documentos de la colección de anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany([
    {   nombre: 'moto yamaha r1',
        venta: true,
        precio: 20000,
        foto: 'r1.jpeg',
        tags: ['motor' ]
      },

    {   nombre: 'coche bmw m4',
        venta: true,
        precio: 60442,
        foto: 'm4.jpeg',
        tags: ['motor', 'lifestyle']
      },

    {
        nombre: 'auto integral',
        venta: true,
        precio: 200000,
        foto: 'autocaravana.jpeg',
        tags: ['motor', 'lifestyle']
      },

    {  
        nombre: 'iphone 12 pro',
        venta: true,
        precio: 244,
        foto: 'iphone.jpeg',
        tags: ['mobile', 'lifestyle']
      },

    {
        nombre: 'moto agua kawasaky',
        venta: true,
        precio: 34000,
        foto: 'motoagua.jpeg',
        tags: ['motor', 'lifestyle']
      },

    {  
        nombre: 'yate lujo',
        venta: true,
        precio: 2031244,
        foto: 'yate.jpeg',
        tags: ['motor', 'lifestyle']
      }
  ]);
  console.log(`Creados ${inserted.length} anuncios`);
}


//creamos iniciacion usuarios
async function initUsuarios() {
  // borrar todos los documentos de usuarios
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios iniciales
  const inserted = await Usuario.insertMany([
    { email: 'user@example.com', password: await Usuario.hashPassword('1234')},
    
  ]);
  console.log(`Creados ${inserted.length} usuarios.`);
}