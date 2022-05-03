import { IFileNameGenerator, ICloudService } from '../interfaces';

import { RecognizeFileUseCase } from './recognize-file.use-case';

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
}
