const { Router } = require("express");
const triagem = require('./triagem_controller');

const routes = new Router();

routes.post('/login',               triagem.login);

routes.post('/buscar_perguntas',    triagem.buscar_perguntas);
routes.post('/buscar_perguntas_ativas',    triagem.buscar_perguntas_ativas);
routes.post('/cadastrar_perguntas', triagem.cadastrar_perguntas);
routes.post('/editar_perguntas',    triagem.editar_perguntas);

routes.post('/buscar_clientes_pen', triagem.buscar_clientes_pen);
routes.post('/buscar_clientes',     triagem.buscar_clientes);
routes.post('/editar_cliente',      triagem.editar_cliente);

routes.post('/cadastrar_resposta',  triagem.cadastrar_resposta);
routes.post('/buscar_respostas',    triagem.buscar_respostas);
routes.post('/buscar_resp_cli',     triagem.buscar_resp_cli);

module.exports = routes;