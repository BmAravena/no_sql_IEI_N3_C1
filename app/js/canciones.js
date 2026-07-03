use("IEI_N3_C1");


// Función para obtener el ID del usuario a partir del correo electrónico
function getUsuarioId(email) {
    var u = db.usuarios.findOne({ email: email });
    return u ? u._id : null;
}

// Posible lista de canciones para insertar en la colección "canciones"
var canciones = [
    {
        usuario: getUsuarioId("juan.gonzalez@correo.cl"),
        titulo: "Lucid Dreams",
        artista: "Juice WRLD",
        album: "Goodbye & Good Riddance",
        genero: "Hip Hop",
        duracion: 239,
        anio: 2018,
        idioma: "Inglés",
        plataforma: "Spotify",
        favorita: true
    },
    {
        usuario: getUsuarioId("maria.soto@correo.cl"),
        titulo: "All Girls Are The Same",
        artista: "Juice WRLD",
        album: "Goodbye & Good Riddance",
        genero: "Hip Hop",
        duracion: 166,
        anio: 2018,
        idioma: "Inglés",
        plataforma: "YouTube",
        favorita: false
    },
    {
        usuario: getUsuarioId("pedro.munoz@correo.cl"),
        titulo: "Robbery",
        artista: "Juice WRLD",
        album: "Death Race for Love",
        genero: "Hip Hop",
        duracion: 240,
        anio: 2019,
        idioma: "Inglés",
        plataforma: "Spotify",
        favorita: true
    },
    {
        usuario: getUsuarioId("ana.contreras@correo.cl"),
        titulo: "Wishing Well",
        artista: "Juice WRLD",
        album: "Legends Never Die",
        genero: "Hip Hop",
        duracion: 194,
        anio: 2020,
        idioma: "Inglés",
        plataforma: "Apple Music",
        favorita: false
    },
    {
        usuario: getUsuarioId("diego.morales@correo.cl"),
        titulo: "Lean Wit Me",
        artista: "Juice WRLD",
        album: "Goodbye & Good Riddance",
        genero: "Hip Hop",
        duracion: 175,
        anio: 2018,
        idioma: "Inglés",
        plataforma: "Spotify",
        favorita: true
    },
    {
        usuario: getUsuarioId("camila.fuentes@correo.cl"),
        titulo: "Chamber of Reflection",
        artista: "Mac DeMarco",
        album: "Salad Days",
        genero: "Indie Rock",
        duracion: 231,
        anio: 2014,
        idioma: "Inglés",
        plataforma: "YouTube",
        favorita: true
    },
    {
        usuario: getUsuarioId("felipe.hernandez@correo.cl"),
        titulo: "My Kind of Woman",
        artista: "Mac DeMarco",
        album: "2",
        genero: "Indie Rock",
        duracion: 190,
        anio: 2012,
        idioma: "Inglés",
        plataforma: "Spotify",
        favorita: false
    },
    {
        usuario: getUsuarioId("valentina.flores@correo.cl"),
        titulo: "For the First Time",
        artista: "Mac DeMarco",
        album: "This Old Dog",
        genero: "Indie Rock",
        duracion: 183,
        anio: 2017,
        idioma: "Inglés",
        plataforma: "Apple Music",
        favorita: true
    },
    {
        usuario: getUsuarioId("jose.valenzuela@correo.cl"),
        titulo: "Salad Days",
        artista: "Mac DeMarco",
        album: "Salad Days",
        genero: "Indie Rock",
        duracion: 145,
        anio: 2014,
        idioma: "Inglés",
        plataforma: "YouTube",
        favorita: false
    },
    {
        usuario: getUsuarioId("daniela.rodriguez@correo.cl"),
        titulo: "Heart to Heart",
        artista: "Mac DeMarco",
        album: "Here Comes the Cowboy",
        genero: "Indie Rock",
        duracion: 211,
        anio: 2019,
        idioma: "Inglés",
        plataforma: "Spotify",
        favorita: true
    }
];

// Filtrar canciones que no pudieron resolverse por falta del usuario y luego insertar.
var cancionesAInsertar = [];
for (var i = 0; i < canciones.length; i++) {
    if (canciones[i].usuario) {
        cancionesAInsertar.push(canciones[i]);
    } else {
        print("Advertencia: usuario no encontrado para canción: " + canciones[i].titulo);
    }
}

if (cancionesAInsertar.length > 0) {
    db.canciones.insertMany(cancionesAInsertar);
    print("Inserción de canciones completada: " + cancionesAInsertar.length);
} else {
    print("No hay canciones para insertar (no se encontraron usuarios).");
}
