import { RecognitionService } from '~/domain/recognition.service';
import { GetRecognitionListOutDto } from '~/domain/dtos';
import { IWebService, IRequest, IResponse, IValidationService } from './interfaces';

export class ApiController {
    constructor(
      private readonly webService: IWebService,
      private readonly recognitionService: RecognitionService,
      private readonly validationService: IValidationService,
    ) {}

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

    private async getRecognitionList(req: IRequest<void>, res: IResponse): Promise<GetRecognitionListOutDto | string> {
        const data = {
            limit: Number(req.query?.limit),
            offset: Number(req.query?.offset),
        };
        const validationError = this.validationService.validateRecognitionListRequest(data);

        if (validationError !== null) {
            res.setStatus(400);
            return validationError.message;
        }

        return this.recognitionService.getRecognitionList(data);
    }

    public init(): void {
        this.webService.addPostRoute<string,Buffer>('/', (req: IRequest<Buffer>) => this.upload(req.body));
        this.webService.addGetRoute<string>('/recognition', this.getRecognition.bind(this));
        this.webService.addGetRoute<GetRecognitionListOutDto | string>('/recognitions', this.getRecognitionList.bind(this));
    }
}
