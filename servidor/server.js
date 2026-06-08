const express = require('express'); // Librería que permite generar servidores JS
const cors = require('cors'); // Permite la ejecución de scripts entre máquinas distintas (cliente - servidor)
const bodyParser = require('body-parser'); // Toma la información de un FORM y lo "parsea" en un objeto JSON
const mongoose = require('mongoose'); // ORM para trabajar con express (Object Relatonal Mapping)

const app = express();
const PORT = process.env.PORT || 5000;;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extend: true }));
// app.use(bodyParser.json());

// Chequeamos el puerto en el que efectivamente está corriendo la app
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Crear la conexion con MongoDB
mongoose.connect('mongodb://localhost:27017/test')
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

// Creamos el OBJETO en mongoose, usando el MODELO como patrón/base
const Usuario = mongoose.model('Usuario', usuario, 'usuarios');

// Crear el ENDPOINT para recibir los datos de usuario
app.post('/guardarUsuario', async (req, res) => {
    try {
        // Leemos la data desde el BODY (cuerpo) de la REQUEST (solicitud)
        const { nombre, rut, email, fechaNacimiento, contrasena } = req.body;
        // Instanciamos el OBJETO Usuario con los valores obtenidos desde la REQUEST
        const nuevoUsuario = new Usuario({ nombre, rut, email, fechaNacimiento, contrasena });

        // Le indicamos al ORM que debe PERSISTIR ese OBJETO
        await nuevoUsuario.save();
        res.status(200).json({ message: 'Datos Guardados correctamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al guardar los datos' });
    }
});