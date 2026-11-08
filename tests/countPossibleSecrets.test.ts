import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from '../src/countPossibleSecrets';

describe('countPossibleSecrets', () => {
    it('should count all possible secrets for base 10 and length 4', () => {
        expect(countPossibleSecrets(4, 10)).toBe(5040);
    });

    it('should count possible secrets when length equals base', () => {
        expect(countPossibleSecrets(3, 3)).toBe(6);
    });

    it('should count possible secrets when length is 1', () => {
        expect(countPossibleSecrets(1, 10)).toBe(10);
    });

    it('should count possible secrets when zero is included', () => {
        expect(countPossibleSecrets(2, 3)).toBe(6);
    });

    it('should return 0 when length is greater than base', () => {
        expect(countPossibleSecrets(4, 3)).toBe(0);
    });

    it('should throw RangeError when base is less than 2', () => {
        expect(() => countPossibleSecrets(2, 1)).toThrow(RangeError);
    });

    it('should throw RangeError when length is less than 1', () => {
        expect(() => countPossibleSecrets(0, 10)).toThrow(RangeError);
    });

    it('returns the same result when called repeatedly with the same parameters', () => {
        expect(countPossibleSecrets(4, 10)).toBe(5040);
        expect(countPossibleSecrets(4, 10)).toBe(5040);
    });
});
