const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');
const routes = Router();


routes.get('/',(request,response) => {
    console.log(request.query);//O request.query armazena a pesquisa, quando usado um método GET
    return response.json({message: 'Vinicius'});
});

routes.post('/devs', async (request,response) => {
    const { github_username, techs } = request.body;
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //ao colocar a string entre crases, é possível colocar um variável no meio usando o $
    //a chamada da api do git hub deve ser assíncrona, pois deve aguardar a resposta da requisição
    //o async indica que é uma função assíncrona. a await antes do get aguarda a resposta para depois continuar o código
    //fazendo a desesttruturação
    const {name = login,bio,avatar_url} = apiResponse.data;

    const techsArray = techs.split(',').map(tech => tech.trim());
    // o igual nesse caso indica que se não tiver name no response, a propriedade name recebe o valor de login
    console.log(name, github_username, avatar_url,bio,techs);

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
    });
    return response.json({dev});
});

routes.put('/',(request,response) => {
    return response.json({});
});

routes.delete('/users/:chave',(request,response) => {
    console.log(request.params); //Identificar um recurso na alteração ou remoção
    return response.json({ apagado: 'true'})
});

module.exports = routes; //responsávvel por exportar as rotas, isso faz com que elas sejam vistas em toda a aplicação
