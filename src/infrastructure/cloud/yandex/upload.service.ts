import AWS from 'aws-sdk';

import { UploadModel } from '~/domain/models';

import { IYandexStorageOptions } from './interfaces';

export class YandexUploadService {
    private static STORAGE_ENPOINT = 'https://storage.yandexcloud.net';

    private readonly storage: AWS.S3;
    private readonly bucket: string;

    constructor(options: IYandexStorageOptions) {
        this.storage = new AWS.S3({
            credentials: {
                accessKeyId: options.id,
                secretAccessKey: options.key,
            },
            endpoint: YandexUploadService.STORAGE_ENPOINT,
            region: options.region,
        });

        this.bucket = options.bucket;
    }

    public async upload(model: UploadModel): Promise<void> {
        await this.storage.upload({
            Key: model.name,
            Body: model.file,
            Bucket: this.bucket,
        }).promise();
    }
}
