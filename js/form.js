window.onload = function(){
    
};

function validarFormulario(){
    let inputNombre = document.getElementById('inputNombre');
    let inputRut = document.getElementById('inputRut');
    let inputEmail = document.getElementById('inputEmail');
    let inputContrasena = document.getElementById('password');
    let formularioValido = true;
    
    if(inputNombre.value == ''){
        inputNombre.classList.add('alerta');
        formularioValido = false;     
    }else{
        inputNombre.classList.remove('alerta');
    }

    if(inputRut.value == ''){
        inputRut.classList.add('alerta');
        formularioValido = false;
    }else{
        inputRut.classList.remove('alerta');
    }

    if(inputEmail.value == '' || !validarEmail(inputEmail.value)){
        alert(validarEmail(inputEmail.value));
        inputEmail.classList.add('alerta');
        formularioValido = false;
    }else{
        inputEmail.classList.remove('alerta');
    }

    if(inputContrasena.value == ''){
        inputContrasena.classList.add('alerta');
        formularioValido = false;
    }else{
        inputContrasena.classList.remove('alerta');
    }
    
    if(formularioValido){
        alert('Datos ingresados correctamente, envoando formulario...');
    }else{
        alert('Debe completar los campos resaltados para enviar el formulario');
    }
};

function validarEmail(email){
    const expresionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return expresionEmail.test(email);
}