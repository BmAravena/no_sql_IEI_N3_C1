window.onload = function(){
    
};

function validarFormulario(){
    let inputNombre = document.getElementById('inputNombre');
    let inputRut = document.getElementById('inputRut');
    let inputEmail = document.getElementById('inputEmail');
    let inputContrasena = document.getElementById('password');
    let inputRepetirContrasena = document.getElementById('passwordRepetir');
    let formularioValido = true;
    
    if(inputNombre.value == ''){
        inputNombre.classList.add('alerta');
        inputNombre.classList.add('is-invalid');
        formularioValido = false;     
    }else{
        inputNombre.classList.remove('alerta');
        inputNombre.classList.remove('is-invalid');
        inputNombre.classList.add('is-valid');
    }

    if(inputRut.value == ''){
        inputRut.classList.add('alerta');
        inputRut.classList.add('is-invalid');
        formularioValido = false;
    }else{
        inputRut.classList.remove('alerta');
        inputRut.classList.remove('is-invalid');
        inputRut.classList.add('is-valid');
    }

    if(inputEmail.value == '' || !validarEmail(inputEmail.value)){
        inputEmail.classList.add('alerta');
        inputEmail.classList.add('is-invalid');
        formularioValido = false;
    }else{
        inputEmail.classList.remove('alerta');
        inputEmail.classList.remove('is-invalid');
        inputEmail.classList.add('is-valid');
    }

    if(inputContrasena.value == '' || !validarContrasena(inputContrasena.value)){
        inputContrasena.classList.add('alerta');
        inputContrasena.classList.add('is-invalid');
        formularioValido = false;
    }else{
        inputContrasena.classList.remove('alerta');
        inputContrasena.classList.remove('is-invalid');
        inputContrasena.classList.add('is-valid');
    }

    if(inputRepetirContrasena.value == '' || inputRepetirContrasena.value != inputContrasena.value){
        inputRepetirContrasena.classList.add('alerta');
        inputRepetirContrasena.classList.add('is-invalid');
        formularioValido = false;
    }else{
        inputRepetirContrasena.classList.remove('alerta');
        inputRepetirContrasena.classList.remove('is-invalid');
        inputRepetirContrasena.classList.add('is-valid');
    }

    if(formularioValido){
        alert('Datos ingresados correctamente, enviando formulario...');
    }else{
        alert('Debe completar los campos resaltados para enviar el formulario');
    }
};

function validarEmail(email){
    const expresionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return expresionEmail.test(email);
}

function validarContrasena(contrasena){
    const expresionContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return expresionContrasena.test(contrasena);
}