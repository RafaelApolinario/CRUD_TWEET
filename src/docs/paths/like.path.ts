export const likePath = {
    post: {
        tags: ['Like'],
        summary: 'Endpoint para gerar o like em um tweet de um usuário',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        required: ['tweetId'],
                        type: "object",
                        properties: {
                            email: {
                                type: 'string',
                                format: 'int250',
                                summary: 'ID do tweet curtido',
                                example: '3625d9ee-3cd2-4014-9a09-0c138f8fbf8e'
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
    }
}