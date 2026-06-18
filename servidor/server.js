const express = require('express'); // Librería que permite generar servidores JS
const cors = require('cors'); // Permite la ejecución de scripts entre máquinas distintas (cliente - servidor)
const mongoose = require('mongoose'); // ORM para trabajar con express (Object Relatonal Mapping)
const bcrypt = require('bcryptjs'); // Librería para encriptar contraseñas

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Chequeamos el puerto en el que efectivamente está corriendo la app
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Crear la conexion con MongoDB
mongoose.connect('mongodb://localhost:27017/IEI_N3_C1')
    .then(() => console.log('Conexión Exitosa!'))
    .catch((err) => console.error('Error al conectar a la DB: ', err));

// Creamos la ENTIDAD/MODELO en mongoose (ORM)
const usuario = new mongoose.Schema({
    nombre: String,
    rut: String,
    email: String,
    fechaNacimiento: String,
    contrasena: String
});

const pais = new mongoose.Schema({
    nombre: String,
    nacionalidad: String,
    iso_2: String
})

// Creamos el OBJETO en mongoose, usando el MODELO como patrón/base
const Usuario = mongoose.model('Usuario', usuario, 'usuarios');

const Pais = mongoose.model('Pais', pais, 'paises');

// Crear el ENDPOINT para recibir los datos de usuario
app.post('/guardarUsuario', async (req, res) => {
    try {
        // Leemos la data desde el BODY (cuerpo) de la REQUEST (solicitud)
        const { nombre, rut, email, fechaNacimiento, contrasena } = req.body;
        const contrasenaEncriptada = bcrypt.hashSync(contrasena, 10);
        // Instanciamos el OBJETO Usuario con los valores obtenidos desde la REQUEST
        const nuevoUsuario = new Usuario({ nombre, rut, email, fechaNacimiento, contrasena: contrasenaEncriptada });

        // Le indicamos al ORM que debe PERSISTIR ese OBJETO
        await nuevoUsuario.save();
        res.status(200).json({ message: 'Datos Guardados correctamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al guardar los datos: ', err });
    }
});

// Crear el ENDPOINT para leer los datos de usuario
app.get('/obtenerUsuarios', async (req, res) => {
    try {
        // Obtenemos una lista de usuarios desde DB
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los datos: ', err });
    }
});

// Crear el ENDPOINT para leer los datos de paises
app.get('/obtenerPaises', async (req, res) => {
    try {
        // Obtenemos una lista de paises desde DB
        const paises = await Pais.find();
        res.status(200).json(paises);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los datos: ', err });
    }
});