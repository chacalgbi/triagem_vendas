const log   = require('./log');
const API   = require('./API');
const BD    = require('./BD');

let tudo_ok = true;
let resp = {};

class triagem{

    async login(req, res){
        tudo_ok = true;
        resp = {};
        const query = `SELECT *, DATE_FORMAT(hora, '%d/%m/%Y %H:%i') as hora1 FROM login WHERE usuario="${req.body.usuario}" AND senha="${req.body.senha}";`;

        await BD(query).then((ok)=>{
            log(`${ok.resposta[0].nome}, seu Login foi efetuado com sucesso`, "info");
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async buscar_perguntas(req, res){
        tudo_ok = true;
        resp = {};
        const query = `SELECT *, DATE_FORMAT(hora, '%d/%m/%Y %H:%i') as hora1 FROM perguntas;`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async buscar_perguntas_ativas(req, res){
        tudo_ok = true;
        resp = {};
        const query = `SELECT *, DATE_FORMAT(hora, '%d/%m/%Y %H:%i') as hora1 FROM perguntas WHERE ativo="sim";`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async cadastrar_perguntas(req, res){
        tudo_ok = true;
        resp = {};
        const query = `INSERT INTO perguntas (pergunta, tipo, respostas, ativo) values ("${req.body.pergunta}", "${req.body.tipo}", "${req.body.respostas}", "sim");`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async editar_perguntas(req, res){
        tudo_ok = true;
        resp = {};
        const query = `UPDATE perguntas SET ativo='${req.body.ativo}' WHERE id='${req.body.id}';`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async buscar_clientes_pen(req, res){
        tudo_ok = true;
        resp = {};
        const query = `SELECT * FROM clientes WHERE status='Pendente';`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async buscar_clientes(req, res){
        tudo_ok = true;
        resp = {};
        const query = `SELECT * FROM clientes;`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async editar_cliente(req, res){
        tudo_ok = true;
        resp = {};
        const query = `UPDATE clientes SET status='${req.body.status}', operador='${req.body.operador}', obs='${req.body.obs}', hora_edicao=NOW() WHERE id='${req.body.id}';`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async cadastrar_resposta(req, res){
        tudo_ok = true;
        resp = {};
        const query = `INSERT INTO respostas (id_cliente, id_pergunta, resposta) values ("${req.body.id_cliente}", "${req.body.id_pergunta}", "${req.body.resposta}");`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async buscar_respostas(req, res){
        tudo_ok = true;
        resp = {};
        const query = `SELECT * FROM respostas;`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

    async buscar_resp_cli(req, res){
        tudo_ok = true;
        resp = {};
        const query = `SELECT clientes.nome_cli, clientes.obs, clientes.operador, DATE_FORMAT(hora_edicao, '%d/%m/%Y %H:%i') as hora, GROUP_CONCAT(CONCAT(perguntas.pergunta, '\n Res: ', respostas.resposta, '\n') separator " ") 
        as perg FROM respostas
        INNER JOIN clientes ON respostas.id_cliente = clientes.id 
        INNER JOIN perguntas ON respostas.id_pergunta = perguntas.id 
        GROUP BY clientes.nome_cli
        ORDER BY hora DESC;`;

        await BD(query).then((ok)=>{
            resp.dados = ok;
            resp.msg = "Sucesso"; 
        }).catch((erro)=>{
            tudo_ok = false;
            resp.msg = erro;      
        });

        API(resp, res, 200, tudo_ok);
    }

}
module.exports = new triagem();