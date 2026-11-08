import { describe, expect, it } from 'vitest';
import { isDuplicateGuess } from '../src/isDuplicateGuess';
import type { GuessResult } from '../src/types';

describe('isDuplicateGuess', () => {
    const history: GuessResult[] = [
        { guess: 'ABCD', bulls: 2, cows: 2 },
        { guess: '1234', bulls: 1, cows: 1 },
    ];

    it('should detect an identical guess', () => {
        expect(isDuplicateGuess(history, 'ABCD')).toBe(true);
    });

    it('should detect a guess regardless of letter case', () => {
        expect(isDuplicateGuess(history, 'abcd')).toBe(true);
    });

    it('should return false for a new guess', () => {
        expect(isDuplicateGuess(history, '5678')).toBe(false);
    });

    it('should return false for an empty history', () => {
        expect(isDuplicateGuess([], 'ABCD')).toBe(false);
    });
});
