import { IFileNameGenerator, ICloudService } from './interfaces';
import { UseCaseFactory } from './use-cases/use-case.factory';

export class RecognitionService {
    private readonly useCaseFactory: UseCaseFactory;

    constructor(
        readonly cloudService: ICloudService,
        readonly nameGenerator: IFileNameGenerator,
    ) {
        this.useCaseFactory = new UseCaseFactory(cloudService, nameGenerator);
    }

    public async recognize(file: Buffer): Promise<string> {
        const recognizeFileUseCase = this.useCaseFactory.createRecognizeFileUseCase();

        return recognizeFileUseCase.execute(file);
    }

    public async getRecognition(operationId: string): Promise<string> {
      const getRecognitionUseCase = this.useCaseFactory.createGetRecognitionUseCase();

      return getRecognitionUseCase.execute(operationId);
    }
}
