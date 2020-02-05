const { Router } = require('express');
const routes = Router();

routes.get('/',(request,response) => {
    console.log(request.query);//O request.query armazena a pesquisa, quando usado um método GET
    return response.json({message: 'Vinicius'});
});

routes.post('/devs',(request,response) => {
    console.log(request.body);//Acessa os dados do corpo da requisição
    return response.json({});
});

routes.put('/',(request,response) => {
    return response.json({});
});

routes.delete('/users/:chave',(request,response) => {
    console.log(request.params); //Identificar um recurso na alteração ou remoção
    return response.json({ apagado: 'true'})
});

module.exports = routes; //responsávvel por exportar as rotas, isso faz com que elas sejam vistas em toda a aplicação
