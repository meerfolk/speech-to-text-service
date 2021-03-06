export interface IRequest<T> {
    headers: Record<string, string | string[] | undefined>;
    body: T;
    query?: Record<string, string>;
}

export interface IWebService {
    addGetRoute: <T>(path: string, handler: (req: IRequest<void>) => Promise<T>) => void;
    addPostRoute: <T,U>(path: string, handler: (req: IRequest<U>) => Promise<T>) => void;
    start: () => Promise<void>;
    addHtmlGetRoute: (path: string, template: string, handler: () => Promise<Record<string, unknown>>) => void;
}
