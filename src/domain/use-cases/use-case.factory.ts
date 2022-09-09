import {
    IFileNameGenerator,
    ICloudService,
    IStorageService,
    IConverterService,
} from '../interfaces';

import { RecognizeFileUseCase } from './recognize-file.use-case';
import { GetRecognitionUseCase } from './get-recognition.use-case';
import { GetRecognitionListUseCase } from './get-recognition-list.use-case';
import { PullNewRecognitionUseCase } from './pull-new-recognitions.use-case';

export class UseCaseFactory {
    constructor(
        private readonly cloudService: ICloudService,
        private readonly fileNameGenerator: IFileNameGenerator,
        private readonly storageService: IStorageService,
        private readonly converterService?: IConverterService,
    ) {}

    public createRecognizeFileUseCase(): RecognizeFileUseCase {
        return new RecognizeFileUseCase(
            this.cloudService,
            this.fileNameGenerator,
            this.storageService,
            this.converterService,
        );
    }

    public createGetRecognitionUseCase(): GetRecognitionUseCase {
        return new GetRecognitionUseCase(this.cloudService);
    }

    public createGetRecognitionListUseCase(): GetRecognitionListUseCase {
        return new GetRecognitionListUseCase(this.storageService);
    }

    public createPullNewRecognitionUseCase(): PullNewRecognitionUseCase {
        return new PullNewRecognitionUseCase(this.storageService, this.cloudService);
    }
}
