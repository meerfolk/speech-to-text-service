import Fastify from 'fastify';

import { IWebService, IWebServiceOptions } from './interfaces';

export class FastifyWebService implements IWebService {
    constructor(private readonly options: IWebServiceOptions) {}

    public async init(): Promise<void> {
        const server = Fastify({});

        server.get('/', async () => {
            return 'OK';
        });

        server.listen(this.options.port);
    }
}
