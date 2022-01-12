import { IWebService, IRequest } from './interfaces';

export class Controller {
    constructor(private readonly webService: IWebService) {}

    private async baseGet(): Promise<string> {
        return 'OK';
    }

    private init(): void {
        this.webService.addGetRoute<string>('/', (_req: IRequest) => this.baseGet());
    }

    public async webServiceStart(): Promise<void> {
        this.init();

        this.webService.start();
    }
}
