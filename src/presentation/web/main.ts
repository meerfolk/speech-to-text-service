import { DIContainer } from '../../infrastructure/di-container';

import { MainController } from './controller';

const di = new DIContainer();
const webService = di.get('WebService');
const recognitionService = di.get('RecognitionService');

(async function() {
    const controller = new MainController(webService, recognitionService);

    controller.init();
})()
