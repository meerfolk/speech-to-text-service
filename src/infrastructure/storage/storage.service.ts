import type { Low, JSONFile as JSONFileType, Adapter } from 'lowdb';
// @ts-expect-error ts-mixed-mode
import inclusion from 'inclusion';

import { IStorageService } from '~/domain/interfaces';

export class StorageService implements IStorageService {
    private storage: Low<Record<string, unknown>> | null = null ;

    constructor(
        private readonly fileName: string,
        private readonly initialInformation: Record<string, unknown>,
    ) {}

    public async read<T>(key: string): Promise<T> {
        const storage = await this.getStorage();

        if (storage.data === null) {
            this.throwIfStorageIsEmpty();
        }

        return storage.data[key] as T;
    }

    public async write(key: string, data: unknown): Promise<void> {
        const storage = await this.getStorage();

        if (storage.data === null) {
            this.throwIfStorageIsEmpty();
        }

        storage.data[key] = data;

        await storage.write();
    }

    public async readAll<T>(): Promise<T> {
        const storage = await this.getStorage();

        if (storage.data === null) {
            this.throwIfStorageIsEmpty();
        }

        return storage.data as T;
    }

    private async getStorage(): Promise<Low<Record<string, unknown>>> {
        if (this.storage !== null) {
            return this.storage;
        }

        return this.init();
    }

    private async init(): Promise<Low<Record<string, unknown>>> {
        const { Low, JSONFile } = await inclusion('lowdb') as { Low: new(adapter: Adapter<Record<string, unknown>>) => Low<Record<string, unknown>>, JSONFile: typeof JSONFileType };

        this.storage = new Low(new JSONFile(this.fileName));

        await this.storage.read();

        if (this.storage.data === null) {
            this.storage.data = this.initialInformation;
        }

        return this.storage;
    }

    private throwIfStorageIsEmpty(): never {
        throw new Error('Storage is empty');
    }
}
