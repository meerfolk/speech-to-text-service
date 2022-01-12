import Fastify from 'fastify';

import { ILoggerService } from '../../domain/interfaces';
import { Controller } from '../../presentation/web/controller';

import { IWebService, IWebServiceOptions } from './interfaces';

export class FastifyWebService implements IWebService {
    constructor(
        private readonly controller: Controller,
        private readonly options: IWebServiceOptions,
        private readonly logger: ILoggerService,
    ) {}

    public async init(): Promise<void> {
        const server = Fastify({});

        const routes = this.controller.getRoutes();

        server.get(Controller.GET_DEFAULT_EP_SYMBOL.toString(), async () => {
            const baseGetHandler = routes[Controller.GET_DEFAULT_EP_SYMBOL];
            baseGetHandler();
        });

        server.listen(this.options.port, () => {
            this.logger.info(`Service started on ${this.options.port} port`);
        });
    }
}
