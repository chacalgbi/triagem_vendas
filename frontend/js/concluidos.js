var array_perguntas = [];
var count_id = [];

async function respostas(){
    await BD(server, 'buscar_resp_cli', {}).then((res)=>{
        table(res.dados.resposta);
    }).catch((err)=>{
        console.log(err);
        msgWithTime('center', 'error', 'Erro ao buscar Respostas!', true, 3000);
    });

}


function table(array){
    let table = '';
    
    array.forEach((item, index)=>{
        table += `<tr id="linha${item.id}">`;
            table += `<td></td>`;
            table += `<td>${index+1}</td>`;
            table += `<td>${item.nome_cli}</td>`;
            table += `<td style="white-space: pre-wrap;">${item.obs}</td>`;
            table += `<td><textarea rows="6" style="width: 300px" disabled>${item.perg}</textarea></td>`;
            table += `<td>${item.hora}</td>`;
            table += `<td>${item.operador}</td>`;
        table += '</tr>';
    });

    document.getElementById('corpo').innerHTML = table;
    document.getElementById('tabela').style.display = 'block';
    dataTables('tabela');

}

respostas();