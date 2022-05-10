import {
  ICloudService,
  IHttpRequestService,
} from '~/domain/interfaces';
import {
  UploadModel,
  SpeechRecognitionModel,
} from '~/domain/models';

import { YandexUploadService, } from './upload.service';
import { YandexSpeechkitService } from './recognize.service';
import { IYandexStorageOptions } from './interfaces';
import { RecognitionParser } from './recognition';

interface IYandexServiceOptions {
    storage: IYandexStorageOptions;
    speechkit: {
        apiKey: string;
    };
};

export class YandexService implements ICloudService {
    private readonly uploadService: YandexUploadService;
    private readonly recognitionService: YandexSpeechkitService;
    private readonly recognitionParser: RecognitionParser;

    constructor(options: IYandexServiceOptions, httpService: IHttpRequestService) {
        this.uploadService = new YandexUploadService(options.storage);
        this.recognitionService = new YandexSpeechkitService(
          httpService,
          options.storage,
          options.speechkit.apiKey,
        );
        this.recognitionParser = new RecognitionParser();
    }

    public async upload(model: UploadModel): Promise<void> {
        await this.uploadService.upload(model);
    }

    public async recognize(model: UploadModel): Promise<SpeechRecognitionModel> {
      return this.recognitionService.recognize(model);
    }

    public async getRecognitionText(operationId: string): Promise<string> {
        const recognition = await this.recognitionService.getRecognition(operationId);

        if (recognition.done === false) {
            return '';
        }

        return this.recognitionParser.parse(recognition);
    }
}
