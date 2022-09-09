export interface IRecognitionModel {
  id: string;
  uploadFileName: string;
  recognitionPath: string | null;
}

export interface IStorageService {
    popNewRecognitionId: () => Promise<string | null>;
    pushNewRecognitionId: (id: string) => Promise<void>;
    saveRecognition: (data: IRecognitionModel) => Promise<void>;
    addRecognitionPath: (id: string, path: string) => Promise<void>;
    read: <T>(key: string) => Promise<T | null>;
    write: (key: string, data: unknown) => Promise<void>;
    readAll: () => Promise<IRecognitionModel[]>;
}
