import { DIContainer } from '../../infrastructure/di-container';

const di = new DIContainer();
const webService = di.get('WebService');

(async function() {
    await webService.init();
})()
