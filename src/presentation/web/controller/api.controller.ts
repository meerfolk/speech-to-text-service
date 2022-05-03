import { RecognitionService } from '~/domain/recognition.service';
import { IWebService, IRequest } from './interfaces';

export class ApiController {
    constructor(
      private readonly webService: IWebService,
      private readonly recognitionService: RecognitionService) {}

    private async upload(file: Buffer): Promise<string> {
        const recognitionId = await this.recognitionService.recognize(file);

        return recognitionId;
    }

    public init(): void {
        this.webService.addPostRoute<string,Buffer>('/', (req: IRequest<Buffer>) => this.upload(req.body))
    }
}
