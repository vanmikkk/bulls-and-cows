import { describe, expect, it } from 'vitest';
import { evaluateGuess } from '../src/evaluateGuess';

describe('evaluateGuess', () => {
    it('should count bulls when digits are in the correct positions', () => {
        expect(evaluateGuess('1234', '1234')).toEqual({
            bulls: 4,
            cows: 0,
        });
    });

    it('should count cows when digits are in different positions', () => {
        expect(evaluateGuess('1234', '4321')).toEqual({
            bulls: 0,
            cows: 4,
        });
    });

    it('should count bulls and cows together', () => {
        expect(evaluateGuess('1234', '1243')).toEqual({
            bulls: 2,
            cows: 2,
        });
    });

    it('should return zero bulls and cows when there are no matching digits', () => {
        expect(evaluateGuess('1234', '5678')).toEqual({
            bulls: 0,
            cows: 0,
        });
    });

    it('should handle a leading zero in the secret', () => {
        expect(evaluateGuess('0123', '1023')).toEqual({
            bulls: 2,
            cows: 2,
        });
    });
});
