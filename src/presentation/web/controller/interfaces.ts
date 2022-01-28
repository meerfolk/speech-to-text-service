export interface IRequest<T> {
    headers: Record<string, string | string[] | undefined>;
    body: T;
}

export interface IWebService {
    addGetRoute: <T>(path: string, handler: (req: IRequest<void>) => Promise<T>) => void;
    addPostRoute: <T,U>(path: string, handler: (req: IRequest<U>) => Promise<T>) => void;
    start: () => Promise<void>;
}
