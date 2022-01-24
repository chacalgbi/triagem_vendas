require('dotenv').config()
const app = require('./app');
const log   = require('./log');

app.listen(8081, () => {
    log("API Triagem de Vendas iniciado na Porta 8081");
});