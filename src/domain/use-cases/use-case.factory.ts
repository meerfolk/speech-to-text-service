import { IFileNameGenerator, ICloudService } from '../interfaces';

import { RecognizeFileUseCase } from './recognize-file.use-case';
import { GetRecognitionUseCase } from './get-recognition.use-case';

export class UseCaseFactory {
    constructor(
        private readonly cloudService: ICloudService,
        private readonly fileNameGenerator: IFileNameGenerator,
    ) {}

    public createRecognizeFileUseCase(): RecognizeFileUseCase {
        return new RecognizeFileUseCase(
            this.cloudService,
            this.fileNameGenerator,
        );
    }

    public createGetRecognitionUseCase(): GetRecognitionUseCase {
        return new GetRecognitionUseCase(this.cloudService);
    }
}
