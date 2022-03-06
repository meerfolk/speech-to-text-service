import { IWebService } from './interfaces';

export class HtmlController {
    constructor(private readonly webService: IWebService) {}

    public init(): void {}
}
