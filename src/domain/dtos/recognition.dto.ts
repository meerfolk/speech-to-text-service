export class RecognitionDto {
    constructor(
        public readonly id: string,
        public readonly uploadFileName: string,
        public readonly isCompleted: boolean,
    ) {}
}
