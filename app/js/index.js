window.onload = function () {
    obtenerUsuarios();
}

function obtenerUsuarios() {
    const enviarFormulario = async () => {
        try {
            // LLamamos al ENDPOINT para obtener datos de usuarios
            const response = await fetch('http://localhost:3000/obtenerUsuarios');
            const usuarios = await response.json();

            new DataTable('#usuarios', {
                data: usuarios,
                columns: [
                    { data: 'nombre' },
                    { data: 'rut' },
                    { data: 'email' },
                    { data: 'nacionalidad' },
                    { data: 'fechaNacimiento' }
                ]
            });
        } catch (err) {
            console.log('Error al obtener los datos: ', err)
        }
    }
    enviarFormulario();
};