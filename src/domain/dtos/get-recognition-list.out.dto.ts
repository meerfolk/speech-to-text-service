import { RecognitionDto } from './recognition.dto';

export class GetRecognitionListOutDto {
    constructor(
        public readonly data: RecognitionDto[],
        public readonly total: number,
    ) {}
}
