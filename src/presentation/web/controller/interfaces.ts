export interface IRequest<T> {
    headers: Record<string, string | string[] | undefined>;
    body: T;
    query?: Record<string, string>;
}

export interface IResponse {
    setStatus: (status: number) => void;
}

export interface IWebService {
    addGetRoute: <T>(path: string, handler: (req: IRequest<void>, res: IResponse) => Promise<T>) => void;
    addPostRoute: <T,U>(path: string, handler: (req: IRequest<U>) => Promise<T>) => void;
    start: () => Promise<void>;
    addHtmlGetRoute: (path: string, template: string, handler: () => Promise<Record<string, unknown>>) => void;
}

export interface IValidationService {
    validateRecognitionListRequest: (data: unknown) => Error | null;
}
