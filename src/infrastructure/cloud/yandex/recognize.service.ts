import { IHttpRequestService, RawResponse } from '~/domain/interfaces';
import { UploadModel, SpeechRecognitionModel } from '~/domain/models';

import { IYandexStorageOptions } from './interfaces';
import { SuccessRecognitionResponse, NotFinishedRecognitionResponse } from './recognition';

type YandexSpeechkitBodyType = {
    config: {
        specification: {
            languageCode: string;
        };
    };
    audio: {
        uri: string;
    };
};

export class YandexSpeechkitService {
    private static SPEECHKIT_RECOGNITION_ENDPOINT = 'https://transcribe.api.cloud.yandex.net/speech/stt/v2/longRunningRecognize';
    private static SPEECHKIT_OPERATIONS_ENDPOINT_TEMPLATE =
      'https://operation.api.cloud.yandex.net/operations/<operationId>';
    private static STORAGE_ENPOINT_TEMPLATE = 'https://storage.yandexcloud.net/<bucket>/<key>';

    constructor(
        private readonly httpRequestService: IHttpRequestService,
        private readonly storageOptions: IYandexStorageOptions,
        private readonly speechKitApiKey: string,
    ) {}

    private getFileUrl(fileName: string): string {
        return YandexSpeechkitService.STORAGE_ENPOINT_TEMPLATE
            .replace('<bucket>', this.storageOptions.bucket)
            .replace('<key>', fileName);
    }

    private getServiceUrl(): string {
        return YandexSpeechkitService.SPEECHKIT_RECOGNITION_ENDPOINT;
    }
    
    private getOperationsUrl(operationId: string): string {
      return YandexSpeechkitService.SPEECHKIT_OPERATIONS_ENDPOINT_TEMPLATE
        .replace('<operationId>', operationId);
    }

    private generateBody(fileName: string): YandexSpeechkitBodyType {
        return {
            config: {
                specification: {
                    languageCode: 'ru-RU',
                },
            },
            audio: {
                uri: this.getFileUrl(fileName),
            },
        };
    }

    private generateHeaders(): Record<string, string> {
        return {
            'Authorization': `Api-Key ${this.speechKitApiKey}`,
        };
    }

    private async sendRequestToStartRecognition(model: UploadModel): Promise<[RawResponse, unknown]> {
        const url = this.getServiceUrl();
        const body = this.generateBody(model.name);
        const headers = this.generateHeaders();

        const response = await this.httpRequestService.postRaw(url, body, {
            headers,
        });

        return response;
    }

    private async sendRequestToGetRecognition(operationId: string): Promise<
      SuccessRecognitionResponse | NotFinishedRecognitionResponse
    > {
      const url = this.getOperationsUrl(operationId);
      const headers = this.generateHeaders();

      const response = await this.httpRequestService.get(url, {
        headers,
      })

      return response as SuccessRecognitionResponse | NotFinishedRecognitionResponse;
    }

    public async recognize(model: UploadModel): Promise<SpeechRecognitionModel> {
        const [_res, body] = await this.sendRequestToStartRecognition(model);

        const { id } = body as { id: string };

        return new SpeechRecognitionModel(id);
    }

    public async getRecognition(operationId: string): Promise<SuccessRecognitionResponse | NotFinishedRecognitionResponse> {
        return this.sendRequestToGetRecognition(operationId);
    }
}

