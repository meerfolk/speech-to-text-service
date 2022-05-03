import { ICloudService, IFileNameGenerator } from '../interfaces';
import { UploadModel } from '../models';

import { BaseUseCase } from './base.use-case';

export class RecognizeFileUseCase extends BaseUseCase<Buffer> {
    constructor(
        private readonly cloudService: ICloudService,
        private readonly fileNameGenerator: IFileNameGenerator,
    ) {
        super();
    }

    public async execute(file: Buffer): Promise<string> {
        const name = this.fileNameGenerator.generate();
        const model = new UploadModel(name, file);

        await this.cloudService.upload(model);
        const srModel = await this.cloudService.recognize(model);

        return srModel.recognitionId;
    }
}
