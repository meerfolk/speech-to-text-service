export abstract class BaseUseCase<T> {
    public  abstract execute(options: T): Promise<void>;
}
