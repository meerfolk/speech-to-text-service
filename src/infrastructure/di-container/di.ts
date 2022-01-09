import { ILoggerService } from '../../domain/interfaces';

import { ConsoleLoggerService } from '../logger';
import { IWebService, FastifyWebService } from '../web';

export class DIContainer {
    private readonly container;
    private readonly singletones: Map<keyof (typeof this.container), unknown> = new Map();

    constructor() {
        this.container = {
            WebService: this.WebServiceFactory(),
            LoggerService: this.LoggerServiceFactory(),
        };
    }

    private WebServiceFactory(): IWebService {
        if (!this.singletones.has('WebService')) {
            const logger = this.LoggerServiceFactory();

            this.singletones.set('WebService', new FastifyWebService({ port: 3000 }, logger));
        }

        return this.singletones.get('WebService') as typeof this.container['WebService'];
    }

    private LoggerServiceFactory(): ILoggerService {
        if (!this.singletones.has('LoggerService')) {
            this.singletones.set('LoggerService', new ConsoleLoggerService());
        }

        return this.singletones.get('LoggerService') as typeof this.container['LoggerService'];
    }

    public get<T extends keyof (typeof this.container)>(token: T): typeof this.container[T]{
        return this.container[token];
    }
}

