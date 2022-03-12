import { NameGenerator } from "../name-generator";

describe('name-generator', () => {
    const nameGenerator = new NameGenerator();

    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(new Date('2022-01-01').getTime());
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should generate name', () => {
        const name = nameGenerator.generate();

        expect(name).toEqual('220101000000');
    });
});

