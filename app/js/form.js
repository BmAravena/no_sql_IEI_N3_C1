function validarFormulario() {
    let inputNombre = document.getElementById('inputNombre');
    let inputRut = document.getElementById('inputRut');
    let inputEmail = document.getElementById('inputEmail');
    let inputContrasena = document.getElementById('password');
    let inputRepetirContrasena = document.getElementById('passwordRepetir');
    let formularioValido = true;

    if (!validarInput(inputNombre)) {
        formularioValido = false;
    }

    if (!validarInput(inputRut)) {
        formularioValido = false;
    }

    if (!validarInput(inputEmail) || !validarEmail(inputEmail.value)) {
        formularioValido = false;
    }

    if (!validarInput(inputContrasena) || !validarContrasena(inputContrasena.value)) {
        formularioValido = false;
    }

    if (!validarInput(inputRepetirContrasena) || inputRepetirContrasena.value != inputContrasena.value) {
        formularioValido = false;
    }

    if (formularioValido) {
        alert('Datos ingresados correctamente, enviando formulario...');
    } else {
        alert('Debe completar los campos resaltados para enviar el formulario');
    }
};

function validarInput(input) {
    if (input.value == '') {
        input.classList.add('alerta');
        input.classList.add('is-invalid');
    }
    else{
        input.classList.remove('alerta');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
}

function validarEmail(email) {
    const expresionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return expresionEmail.test(email);
}

function validarContrasena(contrasena) {
    const expresionContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return expresionContrasena.test(contrasena);
}