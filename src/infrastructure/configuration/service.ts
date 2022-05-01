import path from 'path';

import { ILoggerService } from '~/domain/interfaces';

import { schema, SchemaType } from './schema';

export class ConfigurationService {
    public readonly configuration: SchemaType;

    constructor(
        private readonly configurationPath: string,
        private readonly logger: ILoggerService,
    ) {
        const config = require(path.join(process.cwd(), this.configurationPath));
        const parse = schema.safeParse(config);

        if (parse.success) {
            this.configuration = parse.data;
        } else {
            this.logger.info(parse.error);
            throw new Error(`Configuration doesn't parsed`);
        }
    }
}
