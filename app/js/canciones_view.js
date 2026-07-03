window.onload = function () {
    // Inicializa el formulario y la tabla al cargar la página.
    cargarUsuarios();
    obtenerCanciones();

    // Asigna el evento de guardado al botón.
    document.getElementById('btnGuardar').addEventListener('click', guardarCancion);
}

/**
 * Carga la lista de usuarios desde el backend y llena el select de usuario.
 */
async function cargarUsuarios() {
    try {
        const resp = await fetch('http://localhost:3000/obtenerUsuarios');
        const usuarios = await resp.json();
        const select = document.getElementById('selectUsuario');
        usuarios.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u._id;
            opt.textContent = u.nombre + ' - ' + u.rut;
            select.appendChild(opt);
        });
    } catch (err) {
        console.error('Error cargando usuarios', err);
    }
}

/**
 * Envía el formulario de canción al backend para crear una nueva canción.
 */
async function guardarCancion() {
    const data = {
        usuario: document.getElementById('selectUsuario').value,
        titulo: document.getElementById('inputTitulo').value,
        artista: document.getElementById('inputArtista').value,
        album: document.getElementById('inputAlbum').value,
        genero: document.getElementById('inputGenero').value,
        plataforma: document.getElementById('inputPlataforma').value || '',
        duracion: Number(document.getElementById('inputDuracion').value) || undefined,
        anio: Number(document.getElementById('inputAnio').value) || undefined,
        favorita: document.getElementById('inputFavorita').value === 'true'
    };

    try {
        const resp = await fetch('http://localhost:3000/guardarCancion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!resp.ok) {
            const err = await resp.json();
            alert('Error guardando canción: ' + (err.message || resp.status));
            return;
        }
        // refrescar tabla
        obtenerCanciones();
        document.getElementById('formCancion').reset();
    } catch (err) {
        console.error('Error al guardar canción', err);
    }
}

let tabla = null;

/**
 * Consulta las canciones desde el backend y construye o actualiza la tabla DataTable.
 */
async function obtenerCanciones() {
    try {
        const resp = await fetch('http://localhost:3000/obtenerCanciones');
        const canciones = await resp.json();

        // Mapear para DataTable
        const data = canciones.map(c => ({
            titulo: c.titulo,
            artista: c.artista,
            album: c.album,
            genero: c.genero,
            duracion: c.duracion,
            anio: c.anio,
            plataforma: c.plataforma || '',
            favorita: c.favorita,
            usuarioNombre: (c.usuarioInfo && c.usuarioInfo[0]) ? c.usuarioInfo[0].nombre : '',
            usuarioRut: (c.usuarioInfo && c.usuarioInfo[0]) ? c.usuarioInfo[0].rut : ''
        }));

        if (tabla) {
            tabla.clear();
            tabla.rows.add(data);
            tabla.draw();
            return;
        }

        tabla = new DataTable('#tablaCanciones', {
            data: data,
            columns: [
                { data: 'titulo' },
                { data: 'artista' },
                { data: 'album' },
                { data: 'genero' },
                { data: 'duracion' },
                { data: 'anio' },
                { data: 'plataforma' },
                { data: 'favorita', render: d => d ? 'Sí' : 'No' },
                { data: 'usuarioNombre' },
                { data: 'usuarioRut' }
            ]
        });

    } catch (err) {
        console.error('Error obteniendo canciones', err);
    }
}
