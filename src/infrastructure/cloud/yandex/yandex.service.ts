import {
  ICloudService,
  IHttpRequestService,
  UploadModel,
  SpeechRecognitionModel,
} from '~/domain';

import { YandexUploadService, } from './upload.service';
import { YandexSpeechkitService } from './recognize.service';
import { IYandexStorageOptions } from './interfaces';

interface IYandexServiceOptions {
    storage: IYandexStorageOptions;
    speechkit: {
        apiKey: string;
    };
};

export class YandexService implements ICloudService {
    private readonly uploadService: YandexUploadService;
    private readonly recognitionService: YandexSpeechkitService;

    constructor(options: IYandexServiceOptions, httpService: IHttpRequestService) {
        this.uploadService = new YandexUploadService(options.storage);
        this.recognitionService = new YandexSpeechkitService(
          httpService,
          options.storage,
          options.speechkit.apiKey,
        );
    }

    public async upload(model: UploadModel): Promise<void> {
        this.uploadService.upload(model);
    }

    public async recognize(model: UploadModel): Promise<SpeechRecognitionModel | null> {
      return this.recognitionService.recognize(model);
    }
}
