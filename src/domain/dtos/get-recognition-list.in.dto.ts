export class GetRecognitionListInDto {
    constructor(
        public readonly limit: number,
        public readonly offset: number,
    ) {}
}
