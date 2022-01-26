var array_perguntas = [];
var count_id = [];

function verifyLogin(){
    if(loged === 'yes'){
        document.getElementById('user').innerHTML = "Operador: " + user;
        getTriagens();
    }else{
        msgWithTime('center', 'error', 'Por favor faça o login!', true, 3000);
        setTimeout(function () { location.replace("index.html"); }, 3000);
    }
}

async function getTriagens(){
    await BD(server, 'buscar_clientes_pen', {}).then((res)=>{
        table(res.dados.resposta);
    }).catch((err)=>{
        console.log(err);
        msgWithTime('center', 'error', 'Erro ao buscar Clientes!', true, 3000);
    });

    await BD(server, 'buscar_perguntas_ativas', {}).then((res)=>{
        array_perguntas = res.dados.resposta;
    }).catch((err)=>{
        console.log(err);
        msgWithTime('center', 'error', 'Erro ao buscar perguntas!', true, 3000);
    });
}

function insertQuestions(id_client, name_client){
    document.getElementById('name_edit').innerHTML = name_client;
    document.getElementById('id_edit').innerHTML = id_client;
    let content = '';
    count_id = [];
    array_perguntas.forEach((item, index)=>{
        count_id.push(item);
        content += `<div class="input-group mb-3"><span class="input-group-text">${item.pergunta}</span>`;
        if(item.tipo === 'Seleção'){
            let temp = item.respostas.split(",");
            let options = [];
            temp.forEach((nome, id)=>{
                options.push({id: index, name: nome});
            });
            content += `<select class="form-control perguntas_select" id="edit${index}">${constructSelect(options)}</select>`;
        }else{
            content += `<input type="text" class="form-control perguntas_input" id="edit${index}">`;
        }
        content += `</div>`;
    });
    document.getElementById('form_edit').innerHTML = content;
}

async function cadastrarTriagem(){
    let array_respostas = [];
    let selects = document.querySelectorAll(".perguntas_select");
    let inputs = document.querySelectorAll(".perguntas_input");

    for (let i = 0; i < selects.length; i++) {
        const id = selects[i].id;
        let valor = $(`#${id} :selected`).text();
        array_respostas.push(valor);
    }

    for (let i = 0; i < inputs.length; i++) {
        const id = inputs[i].id;
        let valor = document.getElementById(`${id}`).value;
        array_respostas.push(valor);
    }

    console.log(array_respostas);

    if(array_respostas.includes('Selecione uma opção') || array_respostas.includes('')){
        msgWithTime('center', 'error', 'Responda todas as perguntas!', true, 2000);
    }else{
        for (const [index, item] of count_id.entries()) {

            let obj = {
                id_cliente: document.getElementById('id_edit').innerHTML,
                id_pergunta: item.id,
            }
    
            if(item.tipo === 'Seleção'){
                obj.resposta = $(`#edit${index} :selected`).text();
            }else{
                obj.resposta = document.getElementById(`edit${index}`).value;
            }
    
            await BD(server, 'cadastrar_resposta', obj)
            .then((res)=>{})
            .catch((err)=>{
                console.log(err);
                msgWithTime('center', 'error', 'Erro ao cadastrar respostas!', true, 2000);
            });       
    
        }
    
        let obj_cli = {
            status: 'Concluído',
            operador: user,
            obs: document.getElementById('obs_insert').value,
            id: document.getElementById('id_edit').innerHTML
        }
    
        await BD(server, 'editar_cliente', obj_cli)
        .then((res)=>{
            loading(true, 'center', false, 1000, 'success', 'Cliente atualizado!');
            setTimeout(function () { location.replace("triagem.html"); }, 1000)
        })
        .catch((err)=>{
            console.log(err);
            msgWithTime('center', 'error', 'Erro ao atualizar cliente!', true, 2000);
        });
    }

}

function table(array){
    let table = '';
    let cor = '';

    array.forEach((item, index)=>{

        if(parseInt(item.valor_plano) < parseInt(item.tiket)){
            cor = '#F08080'
        }else{
            cor = '#00FF7F'
        }

        table += `<tr id="linha${item.id}">`;
            table += `<td></td>`;
            table += `<td>${index+1}</td>`;
            table += `<td>${item.nome_cli}</td>`;
            table += `<td>${item.codcli}</td>`;
            table += `<td>${item.nome_pop}</td>`;
            table += `<td>${item.endereco}</td>`;
            table += `<td>${item.bairro}</td>`;
            table += `<td>${formatar_celular(item.celular)}</td>`;
            table += `<td><button type="button" class="btn btn-outline-warning" title="Fazer triagem" data-bs-toggle="modal" data-bs-target="#modal_edit"
            onclick="insertQuestions('${item.id}','${item.nome_cli}')"
            ><i class='bx bx-edit-alt'></i></button></td>`;
            table += `<td>${item.fone}</td>`;
            table += `<td style="background-color: ${cor};">R$ ${item.valor_plano}</td>`;
            table += `<td>R$ ${item.tiket}</td>`;
            table += `<td>${item.perfil}</td>`;
            table += `<td>${item.tecnico}</td>`;
            table += `<td>${item.descri_ser}</td>`;
        table += '</tr>';
    });

    document.getElementById('corpo').innerHTML = table;
    document.getElementById('tabela').style.display = 'block';
    dataTables('tabela');

}

verifyLogin();