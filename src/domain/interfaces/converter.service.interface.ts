export interface IConverterService {
    convert: (file: Buffer) => Promise<Buffer>;
}
