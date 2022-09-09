import Redis from 'ioredis';

import { IRecognitionModel, IStorageService } from '~/domain/interfaces';

export interface IRedisOptions {
    connection: string;
    prefix: string;
    idsKey: string;
    newIdsKey: string;
}

export class RedisStorageService implements IStorageService {
    public readonly idsKey: string;
    public readonly newIdsKey: string;

    private readonly prefix: string;
    private readonly client: Redis;

    constructor(readonly options: IRedisOptions) {
        this.client = new Redis(options.connection);
        this.prefix = options.prefix;
        this.idsKey = options.idsKey;
        this.newIdsKey = options.newIdsKey;
    }

    private getKey(key: string): string {
        return `${this.prefix}.${key}`;
    }

    private async pop(key: string): Promise<string | null> {
        const data = await this.client.blpop(this.getKey(key), 10);

        if (data === null) {
            return null;
        }

        return data[1];
    }

    private async push(key: string, data: unknown): Promise<void> {
        const strData = typeof data === 'string' ? data : JSON.stringify(data);

        await this.client.lpush(this.getKey(key), strData);
    } 

    public async read<T>(key: string): Promise<T | null> {
        const objString = await this.client.get(this.getKey(key));

        if (objString === null) {
            return null;
        }

        return JSON.parse(objString);
    }

    public async write(key: string, data: unknown): Promise<void> {
        this.client.set(this.getKey(key), JSON.stringify(data));
    }

    public async readAll(): Promise<IRecognitionModel[]> {
        const keys = (await this.client.lrange(this.getKey(this.idsKey), 0, 100))
            .map((key) => this.getKey(key));

        const objStrings = await this.client.mget(keys);

        return objStrings
            .map((objString) => JSON.parse(objString as string));
    }

    public async saveRecognition(data: IRecognitionModel): Promise<void> {
        await Promise.all([
            this.push(this.idsKey, data.id),
            this.write(data.id, data),
        ]);
    }

    public async addRecognitionPath(id: string, path: string): Promise<void> {
        const data = await this.read<IRecognitionModel>(this.getKey(id));

        if (data === null) {
            throw new Error(`Recognition with id ${id} not found`);
        }

        data.recognitionPath = path;

        await this.write(id, data);
    }

    public async popNewRecognitionId(): Promise<string | null> {
        return this.pop(this.newIdsKey);
    }

    public async pushNewRecognitionId(id: string): Promise<void> {
        await this.push(this.newIdsKey, id);
    }
}
