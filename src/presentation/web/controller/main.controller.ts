import { IValidationService, IWebService } from './interfaces';
import { HtmlController } from './html.controller';
import { ApiController } from './api.controller';
import { RecognitionService } from '~/domain';

export class MainController {
    constructor(
        private readonly webService: IWebService,
        private readonly recognitionService: RecognitionService,
        private readonly validationService: IValidationService,
    ) {}

    public init(): void {
        const htmlController = new HtmlController(this.webService, this.recognitionService);
        const apiController = new ApiController(
            this.webService,
            this.recognitionService,
            this.validationService,
        );

        htmlController.init();
        apiController.init();

        this.webService.start();
    }
}
