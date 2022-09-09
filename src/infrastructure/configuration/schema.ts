import { z as Z } from 'zod';

export const schema = Z.object({
    web: Z.object({
        port: Z.number(),
        host: Z.string(),
        static: Z.string(),
        viewsRoot: Z.string(),
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
    storage: Z.object({
        connectionString: Z.string(),
    }),
    worker: Z.object({
        interval: Z.number(),
    }),
});

export type SchemaType = Z.infer<typeof schema>;
