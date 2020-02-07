const { Router } = require('express');
const routes = Router();
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

routes.post('/devs', DevController.store);
routes.get('/devs',DevController.index);
routes.get('/search',SearchController.index);

routes.put('/',(request,response) => {
    return response.json({});
});

routes.delete('/users/:chave',(request,response) => {
    console.log(request.params); //Identificar um recurso na alteração ou remoção
    return response.json({ apagado: 'true'})
});
module.exports = routes; //responsávvel por exportar as rotas, isso faz com que elas sejam vistas em toda a aplicação
