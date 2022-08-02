import { RecognitionService } from '~/domain/recognition.service';
import { GetRecognitionListOutDto } from '~/domain/dtos';
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

    private async getRecognitionList(req: IRequest<void>): Promise<GetRecognitionListOutDto> {
        const limit = Number(req.query?.limit);
        const offset = Number(req.query?.offset);

        return this.recognitionService.getRecognitionList({ limit, offset });
    }

    public init(): void {
        this.webService.addPostRoute<string,Buffer>('/', (req: IRequest<Buffer>) => this.upload(req.body));
        this.webService.addGetRoute<string>('/recognition', this.getRecognition.bind(this));
        this.webService.addGetRoute<GetRecognitionListOutDto>('/recognitions', this.getRecognitionList.bind(this));
    }
}
