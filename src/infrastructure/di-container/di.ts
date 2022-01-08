import { IWebService, FastifyWebService } from '../web';

export class DIContainer {
    private readonly container;
    private readonly singletones: Map<keyof (typeof this.container), unknown> = new Map();

    constructor() {
        this.container = {
            WebService: this.WebServiceFactory(),
        };
    }

    private WebServiceFactory(): IWebService {
        if (!this.singletones.has('WebService')) {
            this.singletones.set('WebService', new FastifyWebService({ port: 3000 }));
        }

        return this.singletones.get('WebService') as typeof this.container['WebService'];
    }

    public get<T extends keyof (typeof this.container)>(token: T): typeof this.container[T]{
        return this.container[token];
    }
}

