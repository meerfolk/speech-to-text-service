import Fastify, { FastifyInstance } from 'fastify';

import { ILoggerService } from '../../domain/interfaces';
import { IWebService, IRequest } from '../../presentation/web/controller';

import { IWebServiceOptions } from './interfaces';

export class FastifyWebService implements IWebService {
    private readonly server: FastifyInstance;

    constructor(
        private readonly options: IWebServiceOptions,
        private readonly logger: ILoggerService,
    ) {
        this.server = Fastify({});
    }

    public addGetRoute<T>(path: string, handler: (req: IRequest) => Promise<T>): void {
        this.server.get(path, async (req) => {
            const result = await handler(req);

            return result;
        });
    }

    public async start(): Promise<void> {
        this.server.listen(this.options.port, () => {
            this.logger.info(`Service started on ${this.options.port} port`);
        });
    }
}
