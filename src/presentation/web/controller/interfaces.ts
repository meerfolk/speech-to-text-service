export interface IRequest {
    headers: Record<string, string | string[] | undefined>;
}

export interface IWebService {
    addGetRoute: <T>(path: string, handler: (req: IRequest) => Promise<T>) => void;
    start: () => Promise<void>;
}
