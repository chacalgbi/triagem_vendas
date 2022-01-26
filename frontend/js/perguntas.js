var array_perguntas = [];
var count_id = [];

function verifyLogin(){
    if(loged === 'yes'){
        document.getElementById('user').innerHTML = "Operador: " + user;
        perguntas();
    }else{
        msgWithTime('center', 'error', 'Por favor faça o login!', true, 3000);
        setTimeout(function () { location.replace("index.html"); }, 3000);
    }
}

async function perguntas(){
    await BD(server, 'buscar_perguntas', {}).then((res)=>{
        table(res.dados.resposta);
    }).catch((err)=>{
        console.log(err);
        msgWithTime('center', 'error', 'Erro ao buscar Perguntas!', true, 3000);
    });

}

function table(array){
    let table = '';
    let options = [{id: 0, name: 'sim'}, {id: 1, name: 'não'}];
    let cor = '';
    array.forEach((item, index)=>{
        if(item.ativo === 'não'){
            cor = '#F08080'
        }else{
            cor = '#00FF7F'
        }
        table += `<tr id="linha${item.id}" style="background-color: ${cor};">`;
            table += `<td></td>`;
            table += `<td>${index+1}</td>`;
            table += `<td style="white-space: pre-wrap;">${item.pergunta}</td>`;
            table += `<td>${item.tipo}</td>`;
            table += `<td style="white-space: pre-wrap;">${item.respostas}</td>`;
            table += `<td><select class="form-control" id="edit${index}">${constructSelect(options, item.ativo, item.ativo)}</select></td>`;
            table += `<td>${item.hora1}</td>`;
            table += `<td><button type="button" class="btn btn-outline-primary" title="Salvar Status" onclick="salvar('${item.id}', ${index})"><i class='bx bx-save bx-md'></i></button></td>`;
        table += '</tr>';
    });

    document.getElementById('corpo').innerHTML = table;
    document.getElementById('tabela').style.display = 'block';
    dataTables('tabela');

}

async function salvar(id, index){
    let obj ={
        id: id,
        ativo: $(`#edit${index} :selected`).text()
    }

    await BD(server, 'editar_perguntas', obj)
    .then((res)=>{
        loading(true, 'center', false, 1000, 'success', 'Pergunta atualizada!');
        setTimeout(function () { location.replace("perguntas.html"); }, 1000)
    })
    .catch((err)=>{
        console.log(err);
        msgWithTime('center', 'error', 'Erro ao atualizar a Pergunta!', true, 2000);
    });

}

async function cadastrar_pergunta(){
    let obj = {
        pergunta: document.getElementById('pergunta_insert').value,
        tipo: $(`#tipo_insert :selected`).text(),
        respostas: document.getElementById('resposta_insert').value
    }

    console.log(obj);

    if(obj.pergunta === '' || obj.resposta === '' || obj.tipo === '' || obj.tipo === 'Selecione uma opção'){
        msgWithTime('center', 'error', 'Preencha todos os Campos!', true, 2000);
    }else{

        await BD(server, 'cadastrar_perguntas', obj)
        .then((res)=>{
            loading(true, 'center', false, 1500, 'success', 'Pergunta Cadastrada!');
            setTimeout(function () { location.replace("perguntas.html"); }, 1500)
        })
        .catch((err)=>{
            console.log(err);
            msgWithTime('center', 'error', 'Erro ao cadastrar a pergunta!', true, 2000);
        });

    }

}

function select_input(value){
    document.getElementById('div_resposta').style.display = 'block';
    if (value === 'Seleção'){
        document.getElementById('display_msg').style.display = 'block';
    }else{
        document.getElementById('display_msg').style.display = 'none';
    }
}

verifyLogin()