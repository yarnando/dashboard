import { createServer, Factory, Model, Response } from "miragejs";
import { faker } from '@faker-js/faker'

type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({

        models: {
            user: Model.extend<Partial<User>>({})
        },

        // 'Fábrica' de dados, que gera vários dados de uma única vez
        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10)
                }                
            }),
        },

        seeds(server) {
            //quantos users vc quer criar? nesse caso, 200
            server.createList('user', 200)
        },

        routes() {

            this.namespace = 'api';
            //delay pra carregar os dados
            this.timing = 750;

            this.get('/users', function (schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(page) - 1)
                const pageEnd = pageStart + Number(per_page)
                
                //lembrar: slice nao inclui o ultimo indice
                const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd)

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                )
            });

            this.get('/users/:id')

            this.post('/users');

            //limpa o '/api' pra nao dar conflito com o /api do NextJs e o passthrough manda em frente
            this.namespace = '';
            this.passthrough()
        }
    })

    return server;
}