export interface IConfigurationService {
    get: <T>(path: string) => T;
}
