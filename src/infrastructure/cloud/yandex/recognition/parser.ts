import { SuccessRecognitionResponse } from './recognition-response.type';

export class RecognitionParser {
    public parse(data: SuccessRecognitionResponse): string {
        const texts = data.response.chunks.reduce<string[]>(
            (texts, chunk) => {
                if (chunk.channelTag === '1' && chunk.alternatives[0]) {
                    const text = chunk.alternatives[0].text;

                    texts.push(text);
                }

                return texts;
            },
            [],
        );

        return texts.join(' ');
    }
}
