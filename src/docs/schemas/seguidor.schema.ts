export const seguidorSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
            summary: 'ID do seguidor',
            example: 'fcf14690-9e08-407b-911c-12354409b9d7'
        },
        usuarioId: {
            type: 'string',
            format: 'uuid',
            summary: 'ID do Usuario',
            example: 'fcf14690-9e08-407b-911c-12354409b9d7'
        },
        seguidorId: {
            type: 'string',
            format: 'uuid',
            summary: 'ID do Tweet',
            example: 'fcf14690-9e08-407b-911c-12354409b9d7'
        },
    },
    required: ["usuarioId", "seguidorId"],
}
