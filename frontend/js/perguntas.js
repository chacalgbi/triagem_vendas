var array_perguntas = [];
var count_id = [];

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
    array.forEach((item, index)=>{
        table += `<tr id="linha${item.id}">`;
            table += `<td></td>`;
            table += `<td>${index+1}</td>`;
            table += `<td style="white-space: pre-wrap;">${item.pergunta}</td>`;
            table += `<td>${item.tipo}</td>`;
            table += `<td style="white-space: pre-wrap;">${item.respostas}</td>`;
            table += `<td><select class="form-control" id="edit${index}">${constructSelect(options, item.ativo, item.ativo)}</select></td>`;
            table += `<td>${item.hora1}</td>`;
            table += `<td><button type="button" class="btn btn-outline-primary" title="Salvar Status" onclick="salvar('${item.id}', ${index})"><i class='bx bx-edit-alt bx-md'></i></button></td>`;
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

perguntas();