const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray'); 


module.exports = {
    async index(request,response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request,response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //ao colocar a string entre crases, é possível colocar um variável no meio usando o $
            //a chamada da api do git hub deve ser assíncrona, pois deve aguardar a resposta da requisição
            //o async indica que é uma função assíncrona. a await antes do get aguarda a resposta para depois continuar o código
            //fazendo a desestruturação
            const {name = login,bio,avatar_url} = apiResponse.data;
            // o igual nesse caso indica que se não tiver name no response, a propriedade name recebe o valor de login
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude] //Deve passar assim pois o mongo db armazena assim, longitude-latitude
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location: location,
            });
        }

        return response.json({dev});
    }
};
