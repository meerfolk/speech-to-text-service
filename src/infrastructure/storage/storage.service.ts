import type { Low } from 'lowdb';

import { IStorageService } from '~/domain/interfaces';

export class StorageService implements IStorageService {
    private storage: Low<Record<string, unknown>> | null = null ;

    constructor(
        private readonly fileName: string,
        private readonly initialInformation: Record<string, unknown>,
    ) {}

    public async read<U>(key: string): Promise<U> {
        const storage = await this.getStorage();

        if (storage.data === null) {
            this.throwIfStorageIsEmpty();
        }

        return storage.data[key] as U;
    }

    public async write(key: string, data: unknown): Promise<void> {
        const storage = await this.getStorage();

        if (storage.data === null) {
            this.throwIfStorageIsEmpty();
        }

        storage.data[key] = data;

        await storage.write();
    }

    private async getStorage(): Promise<Low<Record<string, unknown>>> {
        if (this.storage !== null) {
            return this.storage;
        }

        return this.init();
    }

    private async init(): Promise<Low<Record<string, unknown>>> {
        const { Low, JSONFile } = await import('lowdb');

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
