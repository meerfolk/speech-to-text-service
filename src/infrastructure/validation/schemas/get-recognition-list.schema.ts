import { z as Z } from 'zod';

export const getRecognitionListSchema = Z.object({
    limit: Z.number().min(1).max(100),
    offset: Z.number().min(0),
});
