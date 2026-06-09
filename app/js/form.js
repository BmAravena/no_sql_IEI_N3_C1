function validarFormulario() {
    let inputNombre = document.getElementById('inputNombre');
    let inputRut = document.getElementById('inputRut');
    let inputEmail = document.getElementById('inputEmail');
    let inputContrasena = document.getElementById('password');
    let inputRepetirContrasena = document.getElementById('passwordRepetir');
    let formularioValido = true;

    if (!validarInput(inputNombre)
        || !validarInput(inputRut)
        || !validarRut(inputRut)
        || !validarInput(inputEmail)
        || !validarEmail(inputEmail)
        || !validarInput(inputContrasena)
        || !validarContrasena(inputContrasena)
        || !validarInput(inputRepetirContrasena)
        || inputRepetirContrasena.value !== inputContrasena.value) {
        formularioValido = false;
    }

    if (formularioValido) {
        const formulario = document.getElementById('formularioRegistro');
        const dataForm = new FormData(formulario);
        const datos = Object.fromEntries(dataForm.entries());

        const enviarFormulario = async () => {
            try {
                const response = await fetch('http://localhost:5000/guardarUsuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log("Datos recibidos:", data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        enviarFormulario();
    } else {
        alert('Debe completar los campos resaltados para enviar el formulario');
    }
};

function validarInput(input) {
    return input.value !== '' ? inputValido(input) : inputInvalido(input);
}

function validarEmail(inputEmail) {
    const expresionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return expresionEmail.test(inputEmail.value) ? inputValido(inputEmail) : inputInvalido(inputEmail);
}

function validarContrasena(inputContrasena) {
    const expresionContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return expresionContrasena.test(inputContrasena.value) ? inputValido(inputContrasena) : inputInvalido(inputContrasena);
}

function validarRut(inputRut) {
    rutCompleto = inputRut.value
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
        return inputInvalido(inputRut);
    }
    const tmp = rutCompleto.split('-');
    const digv = tmp[1];
    const rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return digitoVerificador(rut) != digv ? inputInvalido(inputRut) : inputValido(inputRut);
}

function digitoVerificador(T) {
    const M = 0, S = 1;
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