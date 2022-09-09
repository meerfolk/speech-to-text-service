import {
    ICloudService,
    IFileNameGenerator,
    IStorageService,
    IConverterService,
} from '../interfaces';
import { UploadModel } from '../models';

import { BaseUseCase } from './base.use-case';


export class RecognizeFileUseCase extends BaseUseCase<Buffer, string> {
    constructor(
        private readonly cloudService: ICloudService,
        private readonly fileNameGenerator: IFileNameGenerator,
        private readonly storageService: IStorageService,
        private readonly converterService?: IConverterService,
    ) {
        super();
    }

    private async saveRecognition(id: string, model: UploadModel): Promise<void> {
        await Promise.all([
            await this.storageService.saveRecognition({
                id,
                uploadFileName: model.name,
                recognitionPath: null,
            }),
            await this.storageService.pushNewRecognitionId(id),
        ]);
    }

    public async execute(baseFile: Buffer): Promise<string> {
        const file = this.converterService
            ? await this.converterService.convert(baseFile)
            : baseFile;


        const name = this.fileNameGenerator.generate();
        const model = new UploadModel(name, file);

        await this.cloudService.upload(model);
        const srModel = await this.cloudService.recognize(model);

        await this.saveRecognition(srModel.recognitionId, model);

        return srModel.recognitionId;
    }
}
