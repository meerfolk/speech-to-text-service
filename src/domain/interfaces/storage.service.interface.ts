export interface IStorageService {
    read: <T>(key: string) => Promise<T>;
    write: (key: string, data: unknown) => Promise<void>;
    readAll: <T>() => Promise<T>;
}
