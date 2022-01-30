import { UploadModel } from './upload.model';

export interface ILoggerService {
    info: (obj: unknown) => void;
}

export interface ICloudService {
    upload: (model: UploadModel) => Promise<void>;
}
