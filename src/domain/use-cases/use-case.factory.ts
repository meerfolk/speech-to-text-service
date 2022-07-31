import { IFileNameGenerator, ICloudService, IStorageService } from '../interfaces';

import { RecognizeFileUseCase } from './recognize-file.use-case';
import { GetRecognitionUseCase } from './get-recognition.use-case';

export class UseCaseFactory {
    constructor(
        private readonly cloudService: ICloudService,
        private readonly fileNameGenerator: IFileNameGenerator,
        private readonly storageService: IStorageService,
    ) {}

    public createRecognizeFileUseCase(): RecognizeFileUseCase {
        return new RecognizeFileUseCase(
            this.cloudService,
            this.fileNameGenerator,
            this.storageService,
        );
    }

    public createGetRecognitionUseCase(): GetRecognitionUseCase {
        return new GetRecognitionUseCase(this.cloudService);
    }
}
