export class TimeoutSchedulerService {
    private timeout: NodeJS.Timeout | null = null;

    constructor(
        private readonly interval: number,
    ) {}

    public start(handler: () => Promise<void>): void {
        if (this.timeout !== null) {
            return;
        }

        this.timeout = setTimeout(async () => {
            await handler();
            this.timeout = null;
            this.start(handler);
        }, this.interval);
    }
}
