import { describe, expect, it, vi } from 'vitest';
import { createInitialGameState } from '../src/createInitialGameState';
import { submitGuess } from '../src/submitGuess';

describe('submitGuess', () => {
    it('should add the guess and its result to history', () => {
        const state = createInitialGameState(4, 10);
        const stateWithKnownSecret = { ...state, secret: '1234' };

        const newState = submitGuess(stateWithKnownSecret, '1235');

        expect(newState.history).toHaveLength(1);
        expect(newState.history[0]).toEqual({
            guess: '1235',
            bulls: 3,
            cows: 0,
        });
    });

    it('should mark the game as won when all digits are bulls', () => {
        const state = createInitialGameState(4, 10);
        const stateWithKnownSecret = { ...state, secret: '1234' };

        const newState = submitGuess(stateWithKnownSecret, '1234');

        expect(newState.status).toBe('won');
    });

    it('should record the finish time when the player wins', () => {
        vi.spyOn(Date, 'now').mockReturnValue(123456);

        const state = createInitialGameState(4, 10);
        const stateWithKnownSecret = { ...state, secret: '1234' };

        const newState = submitGuess(stateWithKnownSecret, '1234');

        expect(newState.finishedAt).toBe(123456);

        vi.restoreAllMocks();
    });

    it('should not modify the previous state or its history', () => {
        const state = createInitialGameState(4, 10);
        const stateWithKnownSecret = { ...state, secret: '1234' };
        const originalHistory = stateWithKnownSecret.history;

        const newState = submitGuess(stateWithKnownSecret, '1235');

        expect(stateWithKnownSecret.history).toBe(originalHistory);
        expect(stateWithKnownSecret.history).toHaveLength(0);
        expect(newState.history).not.toBe(originalHistory);
    });

    it('should keep the game status as playing after an incorrect guess', () => {
        const state = createInitialGameState(4, 10);
        const stateWithKnownSecret = { ...state, secret: '1234' };

        const newState = submitGuess(stateWithKnownSecret, '5678');

        expect(newState.status).toBe('playing');
        expect(newState.finishedAt).toBeNull();
    });

    it('should not accept guesses after the game is won', () => {
        const state = createInitialGameState(4, 10);
        const stateWithKnownSecret = { ...state, secret: '1234' };
        const wonState = submitGuess(stateWithKnownSecret, '1234');

        const newState = submitGuess(wonState, '5678');

        expect(newState).toBe(wonState);
        expect(newState.history).toHaveLength(1);
    });
});
