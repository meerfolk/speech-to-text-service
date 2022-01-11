export class Controller {
    public static GET_DEFAULT_EP_SYMBOL = Symbol('/');

    private readonly routes = {
        [Controller.GET_DEFAULT_EP_SYMBOL]: this.baseGet.bind(this),
    };

    private baseGet(): { message: string } {
        return {
            message: 'OK',
        };
    }

    public getRoutes(): typeof this.routes {
        return this.routes;
    }
}
