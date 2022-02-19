import { IWebService } from './interfaces';
import { HtmlController } from './html.controller';
import { ApiController } from './api.controller';

export class MainController {
    constructor(private readonly webService: IWebService) {}

    public init(): void {
        const htmlController = new HtmlController(this.webService);
        const apiController = new ApiController(this.webService);

        htmlController.init();
        apiController.init();

        this.webService.start();
    }
}
