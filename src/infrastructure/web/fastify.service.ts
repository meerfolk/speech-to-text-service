import Fastify from 'fastify';
import { ILoggerService } from '../../domain/interfaces';

import { IWebService, IWebServiceOptions } from './interfaces';

export class FastifyWebService implements IWebService {
    constructor(private readonly options: IWebServiceOptions, private readonly logger: ILoggerService) {}

    public async init(): Promise<void> {
        const server = Fastify({});

        server.get('/', async () => {
            return 'OK';
        });

        server.listen(this.options.port, () => {
            this.logger.info(`Service started on ${this.options.port} port`);
        });
    }
}
