import nock from 'nock';
import { mock } from 'jest-mock-extended';

import { ILoggerService } from '../../../domain/interfaces';

import { HttpRequestService } from '../http-request.service';

describe('http request service', () => {
    const host = 'https://test.com';
    const logger = mock<ILoggerService>();
    const service = new HttpRequestService(logger);
    const request = nock(host);

    it('post', async () => {
        const endpoint = '/post';
        const response = '';

        request.post(endpoint)
            .once()
            .reply(200, response);

        const result = await service.post(`${host}${endpoint}`);
        expect(result).toEqual({});
    });
});

