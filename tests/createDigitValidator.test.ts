import { describe, expect, it } from 'vitest';
import { createDigitValidator } from '../src/createDigitValidator';

describe('createDigitValidator', () => {
    it('should accept a digit within the base', () => {
        const isValidDigit = createDigitValidator(10);

        expect(isValidDigit('7')).toBe(true);
    });

    it('should reject a digit outside the base', () => {
        const isValidDigit = createDigitValidator(8);

        expect(isValidDigit('8')).toBe(false);
    });

    it('should accept zero', () => {
        const isValidDigit = createDigitValidator(10);

        expect(isValidDigit('0')).toBe(true);
    });

    it('should accept lowercase hexadecimal letters', () => {
        const isValidDigit = createDigitValidator(16);

        expect(isValidDigit('a')).toBe(true);
        expect(isValidDigit('f')).toBe(true);
    });

    it('should reject uppercase hexadecimal letters', () => {
        const isValidDigit = createDigitValidator(16);

        expect(isValidDigit('A')).toBe(false);
    });

    it('should reject more than one character', () => {
        const isValidDigit = createDigitValidator(10);

        expect(isValidDigit('12')).toBe(false);
    });

    it('should reject invalid characters', () => {
        const isValidDigit = createDigitValidator(10);

        expect(isValidDigit('x')).toBe(false);
    });
});
