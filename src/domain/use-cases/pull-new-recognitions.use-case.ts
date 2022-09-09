import { ICloudService, IRecognitionModel, IStorageService } from '../interfaces';

export class PullNewRecognitionUseCase {
    constructor(
        private readonly storageService: IStorageService,
        private readonly cloudService: ICloudService,
    ) {}

    public async execute(): Promise<void> {
        const newId = await this.storageService.popNewRecognitionId();

        if (newId === null) {
            return;
        }

        try {
            const recognitionResult = await this.cloudService.getRecognitionText(newId);

            if (recognitionResult === '') {
                await this.storageService.pushNewRecognitionId(newId);
                return;
            }

            await this.cloudService.upload({
                name: newId,
                file: Buffer.from(recognitionResult),
            });

            const recognitionData = await this.storageService.read<IRecognitionModel>(newId);

            if (recognitionData === null) {
                throw new Error('Recognition data not found');
            }

            await this.storageService.addRecognitionPath(newId, newId);
        } catch (error) {
            await this.storageService.pushNewRecognitionId(newId);
            console.error(error);
        }
    }
}
