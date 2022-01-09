import path from 'path';

import { IConfigurationService } from './interfaces';

export class ConfigurationService implements IConfigurationService {
    private readonly configuration: Record<string, unknown> = {};

    constructor(private readonly configurationPath: string) {
        /* eslint-disable @typescript-eslint/no-var-requires */
        this.configuration = require(path.join(process.cwd(), this.configurationPath));
        /* eslint-enable @typescript-eslint/no-var-requires */
    }

    public get<T>(path: string): T {
        const result = path.split('.')
            .reduce<Record<string, unknown>>((config, path) => {
                const partialContfig = config[path];

                return partialContfig as Record<string, unknown>;
            }, this.configuration);

        return result as T;
    }
}
