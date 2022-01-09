import { ILoggerService } from '../../domain/interfaces';

import { ConsoleLoggerService } from '../logger';
import { IWebService, FastifyWebService } from '../web';
import { IConfigurationService, ConfigurationService } from '../configuration';

export class DIContainer {
    private readonly container;
    private readonly singletones: Map<keyof (typeof this.container), unknown> = new Map();

    constructor() {
        this.container = {
            ConfigurationService: this.ConfigurationServiceFactory.bind(this),
            LoggerService: this.LoggerServiceFactory.bind(this),
            WebService: this.WebServiceFactory.bind(this),
        };
    }

    private ConfigurationServiceFactory(): IConfigurationService {
        if (!this.singletones.has('ConfigurationService')) {
            this.singletones.set('ConfigurationService', new ConfigurationService('./configuration/default.js'));
        }

        return this.singletones.get('ConfigurationService') as ConfigurationService;
    }

    private WebServiceFactory(): IWebService {
        if (!this.singletones.has('WebService')) {
            const logger = this.get('LoggerService');
            const configuration = this.get('ConfigurationService');

            const webConfiguration = configuration.get('web') as { port: number };

            this.singletones.set('WebService', new FastifyWebService(webConfiguration, logger));
        }

        return this.singletones.get('WebService') as IWebService;
    }

    private LoggerServiceFactory(): ILoggerService {
        if (!this.singletones.has('LoggerService')) {
            this.singletones.set('LoggerService', new ConsoleLoggerService());
        }

        return this.singletones.get('LoggerService') as ILoggerService;
    }

    public get<T extends keyof (typeof this.container)>(token: T): ReturnType<typeof this.container[T]>{
        const factory = this.container[token];

        // as used to avoid ts type resolution problems
        return factory() as ReturnType<typeof this.container[T]>;
    }
}

