import { IWebService, FastifyWebService } from '../../infrastructure/web';

const webService: IWebService = new FastifyWebService({ port: 3000 });

(async function() {
    await webService.init();
})()
