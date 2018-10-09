const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const message = generateMessage('Mario', 'hello');
        expect(message.from).toBe('Mario');
        expect(message.text).toBe('hello');
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const message = generateLocationMessage('Mario', 21.928489799999998, -102.3382132);
        expect(message.from).toBe('Mario');
        expect(message.url).toBe('https://www.google.com/maps?q=21.928489799999998,-102.3382132');
        expect(typeof message.createdAt).toBe('number');
    });
});