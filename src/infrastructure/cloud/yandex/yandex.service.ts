import {ICloudService} from '~/domain/interfaces';

export class YandexService implements ICloudService {
    public async recognize(file: Buffer): Promise<void> {
        console.log(file);
    }
}
