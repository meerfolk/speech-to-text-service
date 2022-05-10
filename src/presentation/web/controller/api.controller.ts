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

    private async getRecognition(req: IRequest<void>): Promise<string> {
        const operationId = req.query?.operationId;

        if (!operationId) {
            throw new Error('operationId is required');
        }

        const recognition = await this.recognitionService.getRecognition(operationId);

        return recognition;
    }

    public init(): void {
        this.webService.addPostRoute<string,Buffer>('/', (req: IRequest<Buffer>) => this.upload(req.body))
        this.webService.addGetRoute<string>('/recognition', this.getRecognition.bind(this));
    }
}
