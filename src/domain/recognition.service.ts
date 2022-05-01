import { UseCaseFactory } from './use-cases/use-case.factory';

export class RecognitionService {
    constructor(private readonly useCaseFactory: UseCaseFactory ) {}

    public async recognize(file: Buffer): Promise<void> {
        const recognizeFileUseCase = this.useCaseFactory.createRecognizeFileUseCase();

        await recognizeFileUseCase.execute(file);
    }
}
