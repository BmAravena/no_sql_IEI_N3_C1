window.onload = function(){
    
};

function validarFormulario(){
    let inputNombre = document.getElementById('inputNombre').value;
    let inputRut = document.getElementById('inputRut').value;
    let inputEmail = document.getElementById('inputEmail').value;
    let inputContrasena = document.getElementById('password').value;
    
    if(inputNombre == '' || inputRut == '' || inputEmail == '' || inputContrasena == ''){
        alert('Por favor ingrese TODOS los datos requeridos.')
    }else{
        alert('datos correctos, procesando formulario...')
    }
};