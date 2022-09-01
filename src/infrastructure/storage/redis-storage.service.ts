import { createClient, RedisClientType } from 'redis';

import { IRecognitionModel, IStorageService } from '~/domain/interfaces';

export interface IRedisOptions {
    connection: string;
    prefix: string;
    idsKey: string;
    newIdsKey: string;
}

export class RedisStorageService implements IStorageService {
    public readonly idsKey: string;

    private readonly prefix: string;
    private readonly client: RedisClientType;

    private isConnected = false;

    constructor(readonly options: IRedisOptions) {
        this.client = createClient({
            url: options.connection,
        });
        this.prefix = options.prefix;
        this.idsKey = options.idsKey;
    }

    private getKey(key: string): string {
        return `${this.prefix}.${key}`;
    }

    private async tryConnect(): Promise<void> {
        if (this.isConnected) {
            return;
        }

        this.isConnected = true;
        await this.client.connect();
    }

    public async read<T>(key: string): Promise<T | null> {
        await this.tryConnect();

        const objString = await this.client.get(this.getKey(key));

        if (objString === null) {
            return null;
        }

        return JSON.parse(objString);
    }

    public async write(key: string, data: unknown): Promise<void> {
        await this.tryConnect();

        this.client.set(this.getKey(key), JSON.stringify(data));
    }

    public async push(key: string, data: unknown): Promise<void> {
        await this.tryConnect();

        const strData = typeof data === 'string' ? data : JSON.stringify(data);

        await this.client.lPush(this.getKey(key), strData);
    } 

    public async readAll(): Promise<IRecognitionModel[]> {
        await this.tryConnect();

        const keys = (await this.client.lRange(this.getKey(this.idsKey), 0, 100))
            .map((key) => this.getKey(key));

        const objStrings = await this.client.mGet(keys);

        return objStrings
            .map((objString) => JSON.parse(objString as string));
    }

    public async saveRecognition(data: IRecognitionModel): Promise<void> {
        await Promise.all([
            this.push(this.idsKey, data.id),
            this.write(data.id, data),
        ]);
    }
}
