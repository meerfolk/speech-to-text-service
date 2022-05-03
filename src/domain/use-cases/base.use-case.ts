export abstract class BaseUseCase<T,U=void> {
    public  abstract execute(options: T): Promise<U>;
}
