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

    if (!validarInput(inputRut) || !validarRut(inputRut)) {
        formularioValido = false;
    }

    if (!validarInput(inputEmail) || !validarEmail(inputEmail)) {
        formularioValido = false;
    }

    if (!validarInput(inputContrasena) || !validarContrasena(inputContrasena)) {
        formularioValido = false;
    }

    if (!validarInput(inputRepetirContrasena) || inputRepetirContrasena.value != inputContrasena.value) {
        formularioValido = false;
    }

    if (formularioValido) {
        const formulario = document.getElementById('formularioRegistro');
        const dataForm = new FormData(formulario);
        const datos = Object.fromEntries(dataForm.entries());

        const response = async () => {
            await fetch('http://localhost:5000/guardarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            }).then(response => response.json())
                .then(data => console.log("Datos recividos:", data))
                .catch(error => console.error("Error:", error))
        }
        console.log(response.json())
    } else {
        alert('Debe completar los campos resaltados para enviar el formulario');
    }
};

function validarInput(input) {
    input.value == '' ? inputInvalido(input) : inputValido(input);
}

function validarEmail(inputEmail) {
    const expresionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    expresionEmail.test(inputEmail.value) ? inputValido(inputEmail) : inputInvalido(inputEmail);
}

function validarContrasena(inputContrasena) {
    const expresionContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    expresionContrasena.test(inputContrasena.value) ? inputValido(inputContrasena) : inputInvalido(inputContrasena);
}

function validarRut(inputRut) {
    rutCompleto = inputRut.value
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    digitoVerificador(rut) != digv ? inputInvalido(inputRut) : inputValido(inputRut);
}

function digitoVerificador(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}

function inputInvalido(input) {
    input.classList.add('alerta');
    input.classList.add('is-invalid');
    return false
};

function inputValido(input) {
    input.classList.remove('alerta');
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true
};