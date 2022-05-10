export interface IPostOptions {
    headers?: Record<string, string>;
}

export interface IGetOptions {
    headers?: Record<string, string>;
}

export interface RawResponse {
    headers?: {
        location?: string;
    }
}

export interface IHttpRequestService {
    get: (url: string, options?: IGetOptions) => Promise<unknown>;
    getBuffer: (url: string, options?: IGetOptions) => Promise<Buffer>;
    post: (url: string, body?: object, options?: IPostOptions) => Promise<unknown>;
    postRaw: (url: string, body?: object, options?: IPostOptions) => Promise<[RawResponse, unknown]>
}
