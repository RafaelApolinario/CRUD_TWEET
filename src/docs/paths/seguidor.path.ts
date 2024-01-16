export const seguidorPath = {
    post: {
        tags: ['seguidor'],
        summary: 'Endpoint para tornar o seguidor de um usuário',
        security: [
            {
                bearerAuth: []
            }
        ],
        parameters: [
            {
             name: "usuarioId",
             in: "path",
             description: "ID do usuario",
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
                        required: ['seguidorId'],
                        type: "object",
                        properties: {
                            tweetId: {
                                type: 'string',
                                format: 'uuid',
                                summary: 'ID do Usuario seguido'
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
                                    example: 201
                                },
                                ok: {
                                    type: 'boolean',
                                    summary: 'Indica se a requisição deu certo ou não',
                                    example: true
                                },
                                mensagem: {
                                    type: 'string',
                                    summary: 'Mensagem amigável para mostrar ao usuário',
                                    example: 'seguidor criado!'
                                },
                                dados: {
                                    $ref: '#/schemas/seguidor'
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
            },
        }
    },
    delete: {
        tags: ['seguidor'],
        summary: 'Endpoint para o seguidor usuario',
        security: [
            {
                bearerAuth: []
            }
        ],
        parameters: [
           {
            name: "id",
            in: "path",
            description: "ID do seguidor", 
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
                                    $ref: '#/schemas/seguidor'
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