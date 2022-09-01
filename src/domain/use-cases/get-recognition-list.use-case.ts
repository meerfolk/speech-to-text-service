import { IRecognitionModel, IStorageService } from '../interfaces';

import { GetRecognitionListInDto, GetRecognitionListOutDto, RecognitionDto } from '../dtos';
 
import { BaseUseCase } from './base.use-case';

export class GetRecognitionListUseCase extends BaseUseCase<GetRecognitionListInDto, GetRecognitionListOutDto> {
    constructor(private readonly storageService: IStorageService) {
        super();
    }

    public async execute(dto: GetRecognitionListInDto): Promise<GetRecognitionListOutDto> {
        const { limit, offset } = dto;

        const all = await this.storageService.readAll();

        return new GetRecognitionListOutDto(
            all
                .slice(offset, offset + limit)
                .map(
                    (item: IRecognitionModel) =>
                        new RecognitionDto(
                            item.id,
                            item.uploadFileName,
                            Boolean(item.recognitionPath),
                        ),
                ),
            all.length,
        );
    }
}
