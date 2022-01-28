import { IWebService, IRequest } from './interfaces';

export class Controller {
    constructor(private readonly webService: IWebService) {}

    private async baseGet(): Promise<string> {
        return 'OK';
    }

    private async upload(file: Buffer): Promise<string> {
        return `${file.length} bytes was uploaded`;
    }

    private init(): void {
        this.webService.addGetRoute<string>('/', (_req: IRequest<void>) => this.baseGet());
        this.webService.addPostRoute<string,Buffer>('/', (req: IRequest<Buffer>) => this.upload(req.body))
    }

    public async webServiceStart(): Promise<void> {
        this.init();

        this.webService.start();
    }
}
