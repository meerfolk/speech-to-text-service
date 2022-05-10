type RecognitionResponse = {
    chunks: RecognitionChunk[];
}

export type RecognitionChunk = {
    alternatives: { text: string }[];
    channelTag: string;
}

export type SuccessRecognitionResponse = {
    done: true;
    id: string;
    createdBy: string;
    createdAt: string;
    modifiedAt: string;
    response: RecognitionResponse;
}

export type NotFinishedRecognitionResponse = {
    done: false;
    id: string;
    createdBy: string;
    createdAt: string;
    modifiedAt: string;
}
