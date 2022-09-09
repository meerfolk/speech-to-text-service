import { DIContainer } from '../../infrastructure/di-container';

const di = new DIContainer();
const recognitionService = di.get('RecognitionService');
const schedulerService = di.get('SchedulerService');

schedulerService.start(() => recognitionService.pullNewRecognition());
