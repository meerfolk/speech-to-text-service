import { IWebService } from './interfaces';
import { HtmlController } from './html.controller';
import { ApiController } from './api.controller';
import { RecognitionService } from '~/domain';

export class MainController {
    constructor(
        private readonly webService: IWebService,
        private readonly recognitionService: RecognitionService
    ) {}

    public init(): void {
        const htmlController = new HtmlController(this.webService);
        const apiController = new ApiController(this.webService, this.recognitionService);

        htmlController.init();
        apiController.init();

        this.webService.start();
    }
}
