export interface ILoggerService {
    info: (obj: unknown) => void;
}

export interface ICloudService {
    recognize: (file: Buffer) => Promise<void>;
}
