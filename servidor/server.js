const express = require('express'); // Librería que permite generar servidores JS
const cors = require('cors'); // Permite la ejecución de scripts entre máquinas distintas (cliente - servidor)
const bodyParser = require('body-parser'); // Toma la información de un FORM y lo "parsea" en un objeto JSON
const mongoose = require('mongoose'); // ORM para trabajar con express (Object Relatonal Mapping)

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Crear la conexion con MongoDB
mongoose.connect('mongodb://localhost:27017/test')
    .then(()=>console.log('Conexión Exitosa!'))
    .catch((err)=>console.error('Error al conectar a la DB: ',err));

// Creamos la ENTIDAD en mongoose (ORM)
const usuario = new mongoose.Schema({
    nombre: String,
    rut: String,
    email: String,
    fechaNacimiento: String,
    contrasena: String
});

// Iniciamos el objeto en mongoose
const Usuario = mongoose.model('Usuario',usuario,'usuarios');

// Crear el ENDPOINT para recibir los datos de usuario
app.post('guardarUsuario', async(req,res)=>{
    try{        
        const{nombre, rut, email, fechaNacimiento, contrasena} = req.body;
        const nuevoUsuario = new Usuario({nombre, rut, email, fechaNacimiento, contrasena});
        await nuevoUsuario.save();
        res.status(200).json({message:'Datos Guardados correctamente.'});
    }catch (err){
        console.log('Error al guardar los datos: ',err);
        res.status(500).json({message: 'Error al guardar los datos'});
    }
});