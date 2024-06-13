export interface IWebService {
  init: () => Promise<void>;
}

export interface IWebServiceOptions {
  port: number;
  host: string;
  static: string;
  viewsRoot: string;
  basePath: string;
}
