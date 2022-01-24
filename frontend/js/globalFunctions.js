var user = sessionStorage.nome_triagem;
var loged = sessionStorage.loged;
var server = sessionStorage.server;

function verifyLogin(){
    if(loged === 'yes'){
        
    }else{
        msgWithTime('center', 'error', 'Por favor faça o login!', true, 3000);
        setTimeout(function () { location.replace("index.html"); }, 3000);
    }
}

function sair(){
    loading(false, 'center', false, 2000, 'info', `Até logo ${user}`);
    sessionStorage.nome_triagem = ""; 
    sessionStorage.loged = ""; 
    sessionStorage.server = "";
    setTimeout(function() { location.replace("index.html"); }, 2200);
}

function formatar_celular(num){
    let formatado = num.replace(/\D+/g, "");
    let final = '';
    if(formatado.length == 11){
        final = formatado.replace(/(\d{2})?(\d{5})?(\d{4})/, "($1) $2-$3");
    }else if(formatado.length == 10){
        final = formatado.replace(/(\d{2})?(\d{4})?(\d{4})/, "($1) 9$2-$3");
    }else if(formatado.length ==  9){
        final = formatado.replace(/(\d{5})?(\d{4})/, "(77) $1-$2");
    }else if(formatado.length ==  8){
        final = formatado.replace(/(\d{4})?(\d{4})/, "(77) 9$1-$2");
    }else{
        final = "erro";
    }
    return final;
}

function constructSelect(array, value='', name=''){

    let option = '';

    if(name==='' || name ==='null'){
        option += `<option value="" selected disabled>Selecione uma opção</option>`;
    }else{
        option += `<option selected value="${value}">${name}</option>`;
    }

    array.forEach((item, index)=>{
        if(name != item.name){
            option += `<option value="${item.id}">${item.name}</option>`;
        }
    });

    return option;

}

function msgWithTime(position, icon, title, button, timer){
    // EXEMPLO: msgWithTime('center', 'success', 'Apagado!', true, 1000);

    //warning, error, success, info, question
    //'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end'.
    Swal.fire({
        position: position,
        icon: icon,
        title: title,
        showConfirmButton: button,
        timer: timer
    });
}

function loading(small, position, confirm, timer, icon, text){
    // EXEMPLO: loading(true, 'center', false, 2000, 'info', 'Aguarde carregar...');

    //warning, error, success, info, question
    //'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end'.
    Swal.fire({ 
        toast: small, 
        position: position, 
        showConfirmButton: confirm, 
        timer: timer, 
        timerProgressBar: true,
        icon: icon, 
        title: text 
    })
}

function msgConfirm(title, text, icon, function_yes, function_no){
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, Desejo!',
        cancelButtonText: 'Cancelar'
    })
    .then((result) => {
        if (result.isConfirmed){
            function_yes();
        }else{
            function_no();
        }
    })
}

function BD(server, endPoint, obj){
    return new Promise(function(resolve, reject){
        axios.post(`${server}${endPoint}`, obj).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        });
    })
}

verifyLogin();