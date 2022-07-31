import { ICloudService, IFileNameGenerator, IStorageService } from '../interfaces';
import { UploadModel } from '../models';

import { BaseUseCase } from './base.use-case';

interface IRecognitionModel {
  id: string;
  uploadFileName: string;
  recognitionPath: string | null;
}

export class RecognizeFileUseCase extends BaseUseCase<Buffer, string> {
    constructor(
        private readonly cloudService: ICloudService,
        private readonly fileNameGenerator: IFileNameGenerator,
        private readonly storageService: IStorageService,
    ) {
        super();
    }

    private async saveRecognition(recognition: IRecognitionModel): Promise<void> {
        return this.storageService.write(recognition.id, recognition);
    }

    public async execute(file: Buffer): Promise<string> {
        const name = this.fileNameGenerator.generate();
        const model = new UploadModel(name, file);

        await this.cloudService.upload(model);
        const srModel = await this.cloudService.recognize(model);

        await this.saveRecognition({
            id: srModel.recognitionId,
            uploadFileName: name,
            recognitionPath: null,
        });

        return srModel.recognitionId;
    }
}
