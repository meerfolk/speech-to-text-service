import Fastify, {
  FastifyInstance,
  FastifyRequest,
  RawRequestDefaultExpression,
} from "fastify";
import poinOfView from "point-of-view";
import mustache from "mustache";
// @ts-expect-error problem with @fastify/static
import fastifyStatic from "fastify-static";

import { ILoggerService } from "../../domain/interfaces";
import { IWebService, IRequest, IResponse } from "../../presentation/web";

import { IWebServiceOptions } from "./interfaces";

export class FastifyWebService implements IWebService {
  private readonly server: FastifyInstance;

  constructor(
    private readonly options: IWebServiceOptions,
    private readonly logger: ILoggerService
  ) {
    const server = Fastify({
      logger: true,
    });
    server.addContentTypeParser(
      "application/octet-stream",
      async function (_req: FastifyRequest, req: RawRequestDefaultExpression) {
        const result = await new Promise((resolve, reject) => {
          const chunks: Array<Buffer> = [];
          req.on("data", (chunk: Buffer) => chunks.push(chunk));
          req.on("end", () => {
            const fullBuffer = Buffer.concat(chunks);
            resolve(fullBuffer);
          });
          req.on("error", (error: unknown) => {
            reject(error);
          });
        });

        return result;
      }
    );
    server.register(poinOfView, {
      engine: {
        mustache,
      },
      root: this.options.viewsRoot,
    });
    server.register(fastifyStatic, {
      root: this.options.static,
      prefix: "/public",
    });

    this.server = server;
  }

  public addGetRoute<T>(
    path: string,
    handler: (req: IRequest<void>, res: IResponse) => Promise<T>
  ): void {
    this.server.get(this.generatePath(path), async (req, rep) => {
      const result = await handler(
        {
          headers: req.headers,
          body: undefined,
          query: (req.query as Record<string, string>) ?? undefined,
        },
        {
          setStatus: (status: number) => rep.status(status),
        }
      );

      return result;
    });
  }

  public addPostRoute<T, U>(
    path: string,
    handler: (req: IRequest<U>) => Promise<T>
  ): void {
    this.server.post(this.generatePath(path), async (req) => {
      const result = await handler({
        headers: req.headers,
        body: req.body as U,
        query: (req.query as Record<string, string>) ?? undefined,
      });

      return result;
    });
  }

  public addHtmlGetRoute(
    path: string,
    template: string,
    handler: () => Promise<Record<string, unknown>>
  ): void {
    this.server.get(this.generatePath(path), async (_req, reply) => {
      const data = await handler();
      return reply.view(template, data);
    });
  }

  public async start(): Promise<void> {
    this.server.listen(
      {
        port: this.options.port,
        host: this.options.host,
      },
      () => {
        this.logger.info(`Service started on ${this.options.port} port`);
      }
    );
  }

  private generatePath(pathName: string): string {
    return `${this.options.basePath}${
      pathName.startsWith("/") ? "" : "/"
    }${pathName}`;
  }
}
