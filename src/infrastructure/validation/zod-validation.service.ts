import { getRecognitionListSchema } from './schemas';

export class ZodValidationService {
    public validateRecognitionListRequest(data: unknown): Error | null {
        const result = getRecognitionListSchema.safeParse(data);

        if (result.success) {
            return null;
        }

        return result.error;
    }
}
