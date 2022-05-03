import { IHttpRequestService, RawResponse } from '~/domain/interfaces';
import { UploadModel, SpeechRecognitionModel } from '~/domain/models';

import { IYandexStorageOptions } from './interfaces';

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
    private static SPEECHKIT_ENDPOINT = 'https://transcribe.api.cloud.yandex.net/speech/stt/v2/longRunningRecognize';
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
        return YandexSpeechkitService.SPEECHKIT_ENDPOINT;
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

    private async sendRequest(model: UploadModel): Promise<[RawResponse, unknown]> {
        const url = this.getServiceUrl();
        const body = this.generateBody(model.name);
        const headers = this.generateHeaders();

        const response = await this.httpRequestService.postRaw(url, body, {
            headers,
        });

        return response;
    }

    public async recognize(model: UploadModel): Promise<SpeechRecognitionModel> {
        const [_res, body] = await this.sendRequest(model);

        const { id } = body as { id: string };

        return new SpeechRecognitionModel(id);
    }
}

