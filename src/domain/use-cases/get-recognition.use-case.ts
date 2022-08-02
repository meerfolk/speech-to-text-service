import { ICloudService } from '../interfaces';

import { BaseUseCase } from './base.use-case';

export class GetRecognitionUseCase extends BaseUseCase<string, string> {
    constructor(private readonly cloudService: ICloudService) {
        super();
    }

    public async execute(operationId: string): Promise<string> {
        const recognition = await this.cloudService.getRecognitionText(operationId);

        return recognition;
    }
}
