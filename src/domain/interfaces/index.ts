import { UploadModel, SpeechRecognitionModel } from '../models';

export interface ILoggerService {
    info: (obj: unknown) => void;
}

export interface ICloudService {
    upload: (model: UploadModel) => Promise<void>;
    recognize: (model: UploadModel) => Promise<SpeechRecognitionModel | null>;
}

export interface IFileNameGenerator {
    generate: () => string;
}

export * from './http-request.service';

