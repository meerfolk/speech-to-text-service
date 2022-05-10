import { IncomingMessage } from 'http';
import { request } from 'https';

import { IGetOptions, IHttpRequestService, ILoggerService, IPostOptions } from '../../domain/interfaces';

type Methods = 'GET' | 'POST';

interface IRequestOptions {
    method: Methods;
    url: string;
    headers?: Record<string, string>;
    body?: object;
}

export class HttpRequestService implements IHttpRequestService {
    constructor(private readonly logger: ILoggerService) {}

    private generatePostHeaders(headers?: Record<string, string>): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            ...(headers ?? {}),
        };
    }

    private bufferToObj(buffer: Buffer): object {
        const str = buffer.toString('utf8');

        if (!str) {
            return {};
        }

        return JSON.parse(str);
    }

    private requestRaw(options: IRequestOptions): Promise<[IncomingMessage, Buffer]> {
        const chunks: Array<Buffer> = []; 
        const { method, url, body, headers } = options;

        return new Promise((resolve, reject) => {
            const req = request(
                url,
                {
                    method,
                    headers: headers ?? {},
                },
                (res) => {
                    res.on('data', (chunk: Buffer) => {
                        chunks.push(chunk);
                    });

                    res.on('end', () => {
                        const buffer = Buffer.concat(chunks);

                        if ((res.statusCode ?? 500) >= 400) {
                            const body = this.bufferToObj(buffer);
                            const message = `${method} ${url} request was failed`;

                            this.logger.info(
                                { body, status: res.statusCode },
                            );
                            reject(new Error(message));
                            return;
                        }

                        resolve([res, buffer]);
                    });
                }
            );

            if (body !== undefined) {
                req.write(JSON.stringify(body));
            }

            req.on('error', reject);
            req.end();
        });
    }

    public async get(url: string, options?: IGetOptions): Promise<unknown> {
        const buffer = await this.getBuffer(url, options);

        return this.bufferToObj(buffer);
    }

    public async getBuffer(url: string, options?: IGetOptions): Promise<Buffer> {
        const [_, buffer] = await this.requestRaw({
            url,
            method: 'GET',
            headers: this.generatePostHeaders(options?.headers),
        });

        return buffer;
    }

    public async post(url: string, body?: object, options?: IPostOptions): Promise<unknown> {
        const [_response, data] = await this.postRaw(url, body, options);

        return data;
    }

    public async postRaw(url: string, body?: object, options?: IPostOptions): Promise<[IncomingMessage, unknown]> {
        const [response, buffer] = await this.requestRaw({
            url,
            method: 'POST',
            body,
            headers: this.generatePostHeaders(options?.headers),
        });

        return [response, this.bufferToObj(buffer)];
    }
}
