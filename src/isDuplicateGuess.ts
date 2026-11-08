import type { GuessResult } from './types.js';

export function isDuplicateGuess(history: GuessResult[], guess: string): boolean {
    const normalizedGuess = guess.toLowerCase();

    return history.some((attempt) => attempt.guess.toLowerCase() === normalizedGuess);
}
