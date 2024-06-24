import { Readable, Writable } from 'stream';
// @ts-expect-error upgrade
import ffmpeg from 'fluent-ffmpeg-7';

export class FFmpegConverterService {
    public async convert(file: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: Uint8Array[] = [];
            const command = ffmpeg(Readable.from(file));

            const stream = new Writable();
            stream._write = (chunk, _, callback) => {
                chunks.push(chunk);
                callback();
            };

            command
                .inputFormat('mp3')
                .audioCodec('libopus')
                .outputFormat('opus')
                .output(stream)
                .on('erro', (err: Error) => {
                    reject(err);
                })
                .on('end', () => {
                    resolve(Buffer.concat(chunks));
                })
                .run();
        });
    }
}
