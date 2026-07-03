const path = require('path'); // Librería para manejar rutas de archivos y directorios
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }); // Cargar variables de entorno desde el archivo .env
const express = require('express'); // Librería que permite generar servidores JS
const cors = require('cors'); // Permite la ejecución de scripts entre máquinas distintas (cliente - servidor)
const mongoose = require('mongoose'); // ORM para trabajar con express (Object Relatonal Mapping)
const bcrypt = require('bcryptjs'); // Librería para encriptar contraseñas
const dns = require("node:dns/promises");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'app')));

dns.setServers(["1.1.1.1"]);

const uri = process.env.URI

// Crear la conexion con MongoDB
mongoose.connect(uri)
    .then(() => console.log('Conexión Exitosa!'))
    .catch((err) => console.error('Error al conectar a la DB: ', err));

// Chequeamos el puerto en el que efectivamente está corriendo la app
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const direccion = new mongoose.Schema({
    comuna: String,
    calle: String,
    numero: String,
    departamento: String
});

// Creamos la ENTIDAD/MODELO en mongoose (ORM) con validaciones básicas
const usuario = new mongoose.Schema({
    nombre: { type: String, required: true },
    rut: { type: String, required: true, unique: true, match: /^[0-9]+-[0-9kK]{1}$/ },
    // `correo` es el campo principal que queremos usar ahora.
    // `email` se mantiene por compatibilidad con documentos antiguos.
    correo: { type: String, required: true, unique: true, sparse: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    email: { type: String, unique: true, sparse: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    telefono: String,
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: value => value < new Date(),
            message: 'La fecha de nacimiento debe ser anterior a la fecha actual.'
        }
    },
    nacionalidad: { type: String, required: true },
    generoString: { type: String, enum: ['M', 'F', 'O'], required: true },
    direccion: { type: direccion, required: true },
    contrasena: { type: String, required: true, minlength: 8 },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
});

const pais = new mongoose.Schema({
    nombre: String,
    nacionalidad: String,
    iso2: String,
    nameES: String
});

// Creamos el OBJETO en mongoose, usando el MODELO como patrón/base
const Usuario = mongoose.model('Usuario', usuario, 'usuarios');

const Pais = mongoose.model('Pais', pais, 'paises');

// Schema y modelo para Canción
const cancion = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    titulo: { type: String, required: true },
    artista: String,
    album: String,
    genero: String,
    duracion: Number, // segundos
    anio: Number,
    idioma: String,
    plataforma: String,
    favorita: { type: Boolean, default: false }
});

const Cancion = mongoose.model('Cancion', cancion, 'canciones');

// Crear el ENDPOINT para recibir los datos de usuario
app.post('/guardarUsuario', async (req, res) => {
    try {
        // Leemos la data desde el BODY (cuerpo) de la REQUEST (solicitud)
        const { nombre, rut, correo, email, telefono, generoString, fechaNacimiento, contrasena, nacionalidad, direccion } = req.body;
        const correoFinal = correo || email;
        const direccionUsuario = JSON.parse(direccion);

        const salt = bcrypt.genSaltSync(10);
        const contrasenaEncriptada = bcrypt.hashSync(contrasena, salt);
        // Instanciamos el OBJETO Usuario con los valores obtenidos desde la REQUEST
        const nuevoUsuario = new Usuario({
            nombre,
            rut,
            correo: correoFinal,
            email: correoFinal,
            telefono,
            generoString,
            fechaNacimiento,
            contrasena: contrasenaEncriptada,
            nacionalidad,
            direccion: direccionUsuario
        });

        // Le indicamos al ORM que debe PERSISTIR ese OBJETO
        await nuevoUsuario.save();
        res.status(200).json({ message: 'Datos Guardados correctamente.' });
    } catch (err) {
        // Manejo de errores de validación de mongoose
        if (err.name === 'ValidationError') {
            const errores = Object.keys(err.errors).map(k => err.errors[k].message || err.errors[k].kind);
            return res.status(400).json({ message: 'Error de validación', errores });
        }
        // Error por duplicado en campos únicos
        if (err.code === 11000) {
            const keyValue = err.keyValue || {};
            let field = Object.keys(keyValue)[0];
            if (!field && err.message) {
                const match = err.message.match(/index: (.+?)_/);
                if (match) field = match[1];
            }
            const message = field === 'correo'
                ? 'El correo ya existe en la base de datos.'
                : field === 'email'
                    ? 'El correo ya existe en la base de datos.'
                    : field === 'rut'
                        ? 'El RUT ya existe en la base de datos.'
                        : 'Ya existe un registro con el mismo valor.';
            console.error('Duplicate key error:', { field, keyValue, message, raw: err.message });
            return res.status(400).json({ message, field, keyValue });
        }
        console.error('Save usuario error:', err);
        res.status(500).json({ message: 'Error al guardar los datos', err });
    }
});

// Crear el ENDPOINT para leer los datos de usuario
app.get('/obtenerUsuarios', async (req, res) => {
    try {
        // Obtenemos una lista de usuarios desde DB
        const usuarios = await Usuario.aggregate([
            {
                $lookup: {
                    from: 'paises',
                    localField: 'nacionalidad',
                    foreignField: 'iso2',
                    as: 'paisOrigen'
                }
            },
            {
                $addFields: {
                    email: { $ifNull: ['$email', '$correo'] }
                }
            }
        ]);

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

// Endpoint para persistir una Canción
app.post('/guardarCancion', async (req, res) => {
    try {
        const { usuario, titulo, artista, album, genero, duracion, anio, idioma, plataforma, favorita } = req.body;

        // Verificar que el usuario exista
        const user = await Usuario.findById(usuario);
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado para el id proporcionado.' });

        const nuevaCancion = new Cancion({ usuario, titulo, artista, album, genero, duracion, anio, idioma, plataforma, favorita });
        await nuevaCancion.save();
        res.status(200).json({ message: 'Canción guardada correctamente.' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errores = Object.keys(err.errors).map(k => err.errors[k].message || err.errors[k].kind);
            return res.status(400).json({ message: 'Error de validación', errores });
        }
        res.status(500).json({ message: 'Error al guardar la canción', err });
    }
});

// Endpoint para obtener canciones con datos del usuario (lookup)
app.get('/obtenerCanciones', async (req, res) => {
    try {
        const canciones = await Cancion.aggregate([
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'usuario',
                    foreignField: '_id',
                    as: 'usuarioInfo'
                }
            }
        ]);
        res.status(200).json(canciones);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener canciones', err });
    }
});