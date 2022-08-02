import { IStorageService } from '../interfaces';

import { GetRecognitionListInDto, GetRecognitionListOutDto, RecognitionDto } from '../dtos';
 
import { BaseUseCase } from './base.use-case';

export class GetRecognitionListUseCase extends BaseUseCase<GetRecognitionListInDto, GetRecognitionListOutDto> {
    constructor(private readonly storageService: IStorageService) {
        super();
    }

    public async execute(dto: GetRecognitionListInDto): Promise<GetRecognitionListOutDto> {
        const { limit, offset } = dto;

        const allObj: Record<string, RecognitionDto> = await this.storageService.readAll();
        const data = Object.values(allObj);

        return new GetRecognitionListOutDto(
            data.slice(offset, offset + limit),
            data.length,
        );
    }
}
