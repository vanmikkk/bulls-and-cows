import { describe, expect, it } from 'vitest';
import { isValidGuess } from '../src/isValidGuess';

describe('isValidGuess', () => {
    it('should accept a guess with the correct length and unique digits', () => {
        expect(isValidGuess('1234', 4, 10)).toBe(true);
    });

    it('should reject a guess with an incorrect length', () => {
        expect(isValidGuess('123', 4, 10)).toBe(false);
    });

    it('should reject a guess with digits outside the base', () => {
        expect(isValidGuess('1284', 4, 8)).toBe(false);
    });

    it('should reject a guess with duplicate digits', () => {
        expect(isValidGuess('1224', 4, 10)).toBe(false);
    });

    it('should accept zero as the first digit', () => {
        expect(isValidGuess('0123', 4, 10)).toBe(true);
    });

    it('should accept lowercase hexadecimal digits', () => {
        expect(isValidGuess('a1f3', 4, 16)).toBe(true);
    });

    it('should accept uppercase hexadecimal digits', () => {
        expect(isValidGuess('A1f3', 4, 16)).toBe(true);
    });
});
