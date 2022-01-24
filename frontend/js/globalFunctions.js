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