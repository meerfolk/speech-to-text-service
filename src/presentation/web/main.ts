import { DIContainer } from '../../infrastructure/di-container';

import { MainController } from './controller';

const di = new DIContainer();
const webService = di.get('WebService');

(async function() {
    const controller = new MainController(webService);

    controller.init();
})()
