// import {  } from './components';
// import {  } from './paths';
// import {  } from './schemas';

const docs = {
    openapi: "3.0.0",
    info: {
        title: "API Tweets - Growdev",
        description: "Endpoints do Projeto Tweets",
        version: "1.0.0",
        contact: {
            email: "rafaelma2007@hotmail.com"
        }
    },
    servers: [
        {
            url: "http://localhost:3333"
            //posteriormente tem q ser o link do deploy
        }
    ],
    paths: {
        '/usuarios': {},
        '/tweets': {},
        '/likes': {},
        // '/replies': {}
    },
    components: {
        badRequest: {},
        notFound: {},
        unauthorized: {},
        serverError: {},
        securitySchemes: {}
    },
    schemas: {
        error: {},
        usuario: {},
        avalicao: {},
    }
}

export default docs;