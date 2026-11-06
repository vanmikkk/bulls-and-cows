import { describe, expect, it } from 'vitest';
import { generateSecret } from '../src/generateSecret';

describe('generateSecret', () => {
    it('should generate a secret with the requested length', () => {
        const secret = generateSecret(4, 10);

        expect(secret).toHaveLength(4);
    });

    it('should generate a secret with unique digits', () => {
        const secret = generateSecret(4, 10);

        expect(new Set(secret).size).toBe(4);
    });

    it('should generate only digits allowed by the base', () => {
        const secret = generateSecret(2, 2);

        expect([...secret].every((digit) => '01'.includes(digit))).toBe(true);
    });

    it('should allow zero as the first digit', () => {
        const random = () => 0;
        const secret = generateSecret(3, 10, random);

        expect(secret[0]).toBe('0');
    });

    it('should throw RangeError when length is greater than base', () => {
        expect(() => generateSecret(11, 10)).toThrow(RangeError);
    });

    it('should throw RangeError when base is less than 2', () => {
        expect(() => generateSecret(2, 1)).toThrow(RangeError);
    });

    it('should throw RangeError when length is less than 1', () => {
        expect(() => generateSecret(0, 10)).toThrow(RangeError);
    });
});
