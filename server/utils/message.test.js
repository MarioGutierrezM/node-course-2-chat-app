const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const message = generateMessage('Mario', 'hello');
        expect(message.from).toBe('Mario');
        expect(message.text).toBe('hello');
        expect(typeof message.createdAt).toBe('number');
    });
});