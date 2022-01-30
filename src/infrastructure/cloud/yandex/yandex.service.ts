import { ICloudService, UploadModel } from '~/domain';

import { YandexUploadService, IYandexStorageOptions } from './upload.service';

interface IYandexServiceOptions {
    storage: IYandexStorageOptions;
};

export class YandexService implements ICloudService {
    private readonly uploadService: YandexUploadService;

    constructor(options: IYandexServiceOptions) {
        this.uploadService = new YandexUploadService(options.storage);
    }

    public async upload(model: UploadModel): Promise<void> {
        this.uploadService.upload(model);
    }
}
