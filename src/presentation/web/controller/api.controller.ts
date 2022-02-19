import { IWebService, IRequest } from './interfaces';

export class ApiController {
    constructor(private readonly webService: IWebService) {}

    private async upload(file: Buffer): Promise<string> {
        return `${file.length} bytes was uploaded`;
    }

    public init(): void {
        this.webService.addPostRoute<string,Buffer>('/', (req: IRequest<Buffer>) => this.upload(req.body))
    }
}
