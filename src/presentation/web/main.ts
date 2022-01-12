import { DIContainer } from '../../infrastructure/di-container';

import { Controller } from './controller';

const di = new DIContainer();
const webService = di.get('WebService');

(async function() {
    const controller = new Controller(webService);

    controller.webServiceStart();
})()
