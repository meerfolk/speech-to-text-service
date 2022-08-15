import { UploadModel, SpeechRecognitionModel } from '../models';

export interface ILoggerService {
    info: (obj: unknown) => void;
}

export interface ICloudService {
    upload: (model: UploadModel) => Promise<void>;
    recognize: (model: UploadModel) => Promise<SpeechRecognitionModel>;
    getRecognitionText: (operationId: string) => Promise<string>;
}

export interface IFileNameGenerator {
    generate: () => string;
}

export * from './http-request.service';
export * from './storage.service.interface';
export * from './converter.service.interface';
