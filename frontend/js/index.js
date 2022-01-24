async function login(){
    let server = 'http://localhost:8081/';
    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;

    if(usuario.length < 4 || senha.length < 4){
        msgWithTime('center', 'error', 'Preencha corretamente os campos!', true, 3000);
        document.getElementById('usuario').value = '';
        document.getElementById('senha').value = '';
        document.getElementById('usuario').focus();
    }else{
        let obj = { usuario: usuario, senha: senha }

        await BD(server, 'login', obj).then((res)=>{
            if(res.dados == undefined){
                msgWithTime('center', 'error', 'Usuário ou senha não encontrados!', true, 3000);
                document.getElementById('usuario').value = '';
                document.getElementById('senha').value = '';
                document.getElementById('usuario').focus();
            }else{
                console.log(res.dados.resposta[0]);
                sessionStorage.server = server;
                sessionStorage.nome_triagem = res.dados.resposta[0].nome;
                sessionStorage.loged = "yes";
                $.notify(`Bem-Vindo ${res.dados.resposta[0].nome}`, "success");
                setTimeout(function () { location.replace("triagem.html"); },2000)
            }
        }).catch((err)=>{
            console.log(err);
            msgWithTime('center', 'error', 'Erro de Servidor!', true, 3000);
        }); 
    }






    //localStorage.setItem("server", server);


}