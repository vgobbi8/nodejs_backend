//definindo como const pois não precisam ser alteradas
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');//./aquivo -> deve ser assim por ser uma dependência de um arquivo (camino relativo)
mongoose.connect('mongodb+srv://sa:15213841@cluster0-oaq2c.mongodb.net/test?retryWrites=true&w=majority',{ //string de conexão mongo db
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express.json()); //Indica para o express interpretar requisições JSON
//GET(receber), POST(criar informação), PUT(editar algo), DELETE(deletar algo)
app.use(routes); //
// Tipos de parâmetros
// Query Params: request.query (Filtros, ordenação, paginação) --> para listagens, por exemplo
// Route Params: request.params (Identificar recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)


app.listen(3333); //Define a porta da aplicação
