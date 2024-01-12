import { badRequest, notFound, securitySchemes, serverError, unauthorized } from './components';
import { likePath } from './paths/like.path';
import { likeSchema } from './schemas/like.schema';
import { error } from './schemas/error.schema';

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
        '/likes/:id': likePath,
        // '/replies': {}
    },
    components: {
        badRequest: badRequest,
        notFound: notFound,
        unauthorized: unauthorized,
        serverError: serverError,
        securitySchemes: securitySchemes
    },
    schemas: {
        error: error,
        like: likeSchema,
        avalicao: {},
    }
}

export default docs;