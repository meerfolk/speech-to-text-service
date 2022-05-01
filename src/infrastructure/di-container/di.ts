import { ILoggerService, ICloudService, IHttpRequestService } from '~/domain/interfaces';
import { IWebService } from '~/presentation/web';

import { ConsoleLoggerService } from '../logger';
import { FastifyWebService } from '../web';
import { ConfigurationService } from '../configuration';
import { HttpRequestService } from '../http';
import { YandexService } from '../cloud/yandex/yandex.service';

export class DIContainer {
    private readonly container = {
        ConfigurationService: this.ConfigurationServiceFactory.bind(this),
        LoggerService: this.LoggerServiceFactory.bind(this),
        WebService: this.WebServiceFactory.bind(this),
        CloudService: this.CloudServiceFactory.bind(this),
        HttpRequestService: this.HttpRequestServiceFactory.bind(this),
    };
    private readonly singletones: Map<keyof (typeof this.container), unknown> = new Map();

    private ConfigurationServiceFactory(): ConfigurationService {
        if (!this.singletones.has('ConfigurationService')) {
            const logger = this.get('LoggerService');
            this.singletones.set('ConfigurationService', new ConfigurationService('./configuration/default.js', logger));
        }

        return this.singletones.get('ConfigurationService') as ConfigurationService;
    }

    private WebServiceFactory(): IWebService {
        if (!this.singletones.has('WebService')) {
            const logger = this.get('LoggerService');
            const configurationService = this.get('ConfigurationService');

            const webConfiguration = configurationService.configuration.web;

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

    private CloudServiceFactory(): ICloudService {
        if (!this.singletones.has('CloudService')) {
            const configurationService = this.get('ConfigurationService');
            const options = {
                storage: configurationService.configuration.cloud.yandex.storage,
                speechkit: {
                    apiKey: configurationService.configuration.cloud.yandex.speechkit.apiKey,
                }
            }
            const httpRequestService = this.get('HttpRequestService');

            this.singletones.set('CloudService', new YandexService(options, httpRequestService));
        }

        return this.singletones.get('CloudService') as ICloudService;
    }

    private HttpRequestServiceFactory(): IHttpRequestService {
        if (!this.singletones.has('HttpRequestService')) {
            const logger = this.get('LoggerService');

            this.singletones.set('HttpRequestService', new HttpRequestService(logger));
        }

        return this.singletones.get('HttpRequestService') as IHttpRequestService;
    }

    public get<T extends keyof (typeof this.container)>(token: T): ReturnType<typeof this.container[T]>{
        const factory = this.container[token];

        // as used to avoid ts type resolution problems
        return factory() as ReturnType<typeof this.container[T]>;
    }
}

