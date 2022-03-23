import { createServer, Factory, Model } from "miragejs";
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
            server.createList('user', 10)
        },

        routes() {

            this.namespace = 'api';
            //delay pra carregar os dados
            this.timing = 750;

            this.get('/users');
            this.post('/users');

            //limpa o '/api' pra nao dar conflito com o /api do NextJs e o passthrough manda em frente
            this.namespace = '';
            this.passthrough()
        }
    })

    return server;
}