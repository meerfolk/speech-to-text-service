export interface IRecognitionModel {
  id: string;
  uploadFileName: string;
  recognitionPath: string | null;
}

export interface IStorageService {
    saveRecognition: (data: IRecognitionModel) => Promise<void>;
    push: (key: string, data: unknown) => Promise<void>;
    read: <T>(key: string) => Promise<T | null>;
    write: (key: string, data: unknown) => Promise<void>;
    readAll: () => Promise<IRecognitionModel[]>;
}
