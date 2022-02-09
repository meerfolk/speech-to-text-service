import { z as Z } from 'zod';

export const schema = Z.object({
    web: Z.object({
        port: Z.number(),
    }),
    cloud: Z.object({
        yandex: Z.object({
            storage: Z.object({
                id: Z.string(),
                key: Z.string(),
                bucket: Z.string(),
                region: Z.string(),
            }),
            speechkit: Z.object({
                apiKey: Z.string(),
            }),
        }),
    }),
});

export type SchemaType = Z.infer<typeof schema>;
