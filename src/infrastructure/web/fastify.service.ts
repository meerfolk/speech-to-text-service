import Fastify, { FastifyInstance } from 'fastify';
import poinOfView from 'point-of-view';
import mustache from 'mustache';
import fastifyStatic from 'fastify-static';
import path from 'path';

import { ILoggerService } from '../../domain/interfaces';
import { IWebService, IRequest } from '../../presentation/web';

import { IWebServiceOptions } from './interfaces';

export class FastifyWebService implements IWebService {
    private readonly server: FastifyInstance;

    constructor(
        private readonly options: IWebServiceOptions,
        private readonly logger: ILoggerService,
    ) {
        const server = Fastify({});
        // @ts-ignore
        server.addContentTypeParser('application/octet-stream', async function(req){
            const result = await new Promise((resolve, reject) => {
                const chunks: Array<Buffer> = [];
                req.on('data', (chunk: Buffer) => chunks.push(chunk))
                req.on('end', () => {
                    const fullBuffer = Buffer.concat(chunks);
                    resolve(fullBuffer);
                });
                req.on('error', (error: unknown) => {
                    reject(error);
                });
            });

            return result;
        });
        server.register(poinOfView, {
            engine: {
                mustache,
            },
            root: this.options.viewsRoot,
        });
        server.register(fastifyStatic, {
            root: path.join(process.cwd(), '/public'),
        });

        this.server = server;
    }

    public addGetRoute<T>(path: string, handler: (req: IRequest<void>) => Promise<T>): void {
        this.server.get(path, async (req) => {
            const result = await handler({
                headers: req.headers,
                body: undefined,
                query: req.query as Record<string, string> ?? undefined,
            });

            return result;
        });
    }

    public addPostRoute<T,U>(path: string, handler: (req: IRequest<U>) => Promise<T>): void {
        this.server.post(path, async (req) => {
            const result = await handler({
                headers: req.headers,
                body: req.body as U,
                query: req.query as Record<string, string> ?? undefined,
            });

            return result;
        });
    }

    public addHtmlGetRoute(path: string, template: string, handler: () => Promise<Record<string, unknown>>): void {
        this.server.get(path, async (_req, reply) => {
            const data = await handler();
            reply.view(template, data)
        });
    }

    public async start(): Promise<void> {
        this.server.listen(this.options.port, () => {
            this.logger.info(`Service started on ${this.options.port} port`);
        });
    }
}
