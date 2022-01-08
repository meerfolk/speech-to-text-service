import { ILoggerService } from '../../domain/interfaces';

export class ConsoleLoggerService implements ILoggerService {
    public info(obj: unknown): void {
        console.log(JSON.stringify(obj));
    }
}
