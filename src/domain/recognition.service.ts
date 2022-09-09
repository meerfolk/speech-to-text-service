import {
    IFileNameGenerator,
    ICloudService,
    IStorageService,
    IConverterService,
} from './interfaces';
import { UseCaseFactory } from './use-cases/use-case.factory';
import { GetRecognitionListInDto, GetRecognitionListOutDto } from './dtos';

export class RecognitionService {
    private readonly useCaseFactory: UseCaseFactory;

    constructor(
        readonly cloudService: ICloudService,
        readonly nameGenerator: IFileNameGenerator,
        readonly storageService: IStorageService,
        readonly converterService?: IConverterService,
    ) {
        this.useCaseFactory = new UseCaseFactory(
            cloudService,
            nameGenerator,
            storageService,
            converterService,
        );
    }

    public async recognize(file: Buffer): Promise<string> {
        const recognizeFileUseCase = this.useCaseFactory.createRecognizeFileUseCase();

        return recognizeFileUseCase.execute(file);
    }

    public async getRecognition(operationId: string): Promise<string> {
        const getRecognitionUseCase = this.useCaseFactory.createGetRecognitionUseCase();

        return getRecognitionUseCase.execute(operationId);
    }

    public async getRecognitionList(dto: GetRecognitionListInDto): Promise<GetRecognitionListOutDto> {
        const getRecognitionListUseCase = this.useCaseFactory.createGetRecognitionListUseCase();

        return getRecognitionListUseCase.execute(dto);
    }

    public async pullNewRecognition(): Promise<void> {
        const pullNewRecognitionUseCase = this.useCaseFactory.createPullNewRecognitionUseCase();

        return pullNewRecognitionUseCase.execute();
    }
}
