import { RecognitionService } from '~/domain';
import { IWebService } from './interfaces';

export class HtmlController {
    constructor(
        private readonly webService: IWebService,
        private readonly recognitionService: RecognitionService,
    ) {}

    private async getTable(): Promise<Record<string, unknown>> {
        const recognitions = await this.recognitionService.getRecognitionList({
            limit: 10,
            offset: 0,
        });
        return {
            recognitions: recognitions.data
        };
    }

    public init(): void {
        this.webService.addHtmlGetRoute('/html/table', './table.html', this.getTable.bind(this));
    }
}
