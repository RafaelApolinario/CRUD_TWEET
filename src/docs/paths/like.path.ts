export const likePath = {
    post: {
        tags: ['Like'],
        summary: 'Endpoint para gerar o like em um tweet de um usuário',
        security: [
            {
                bearerAuth: []
            }
        ],
        parameters: [
            {
             name: "id",
             in: "path",
             description: "ID do Like",
             required: true,
             schema: {
               type: "string",
               format: "uuid"
             }
           } 
         ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        required: ['tweetId'],
                        type: "object",
                        properties: {
                            tweetId: {
                                type: 'string',
                                format: 'uuid',
                                summary: 'ID do Tweet curtido'
                            }
                        }
                    }
                }
            }
        },
        responses: {
            201: {
                description: "Sucesso",
                content: {
                    'application/json': {
                        schema: {
                            required: ['code', 'ok', 'mensagem', 'dados'],
                            type: "object",
                            properties: {
                                code: {
                                    type: 'integer',
                                    format: 'int32',
                                    summary: 'Status code conforme padrão REST',
                                    example: 200
                                },
                                ok: {
                                    type: 'boolean',
                                    summary: 'Indica se a requisição deu certo ou não',
                                    example: true
                                },
                                mensagem: {
                                    type: 'string',
                                    summary: 'Mensagem amigável para mostrar ao usuário',
                                    example: 'Like criado!'
                                },
                                dados: {
                                    $ref: '#/schemas/like'
                                }
                            }
                        }
                    }
                },
                400: {
                    $ref: '#/components/badRequest'
                },
                401: {
                    $ref: '#/components/unauthorized'
                },
                500: {
                    $ref: '#/components/serverError'
                },
            }
        }
    },
    put: {
        tags: ['Alunos'],
        summary: 'Endpoint para o like no tweet',
        security: [
            {
                bearerAuth: []
            }
        ],
        parameters: [
           {
            name: "id",
            in: "path",
            description: "ID do Like", 
            required: true,
            schema: {
              type: "string",
              format: "uuid"
            }
          } 
        ],
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                code: {
                                    type: 'integer',
                                    format: 'int32',
                                    summary: 'Status code conforme padrão REST',
                                    example: 200,
                                },
                                ok: {
                                    type: 'boolean',
                                    summary: 'Indica se a requisição deu certo ou não',
                                    example: true
                                },
                                mensagem: {
                                    type: 'string',
                                    summary: 'Mensagem amigável para mostrar ao usuário',
                                    example: 'Tweet atualizado com sucesso!'
                                },
                                dados: {
                                    $ref: '#/schemas/like'
                                }
                            },
                            required: ["code", "ok", "mensagem", "dados"],
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            401: {
                $ref: '#/components/unauthorized'
            },
            404: {
                $ref: '#/components/notFound'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    },
}