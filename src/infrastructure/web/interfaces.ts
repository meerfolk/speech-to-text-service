export interface IWebService {
    init: () => Promise<void> 
}

export interface IWebServiceOptions {
    port: number;
    viewsRoot: string;
}
