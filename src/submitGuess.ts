import { evaluateGuess } from './evaluateGuess';
import type { GameState } from './types';

export function submitGuess(state: GameState, guess: string): GameState {
    if (state.status === 'won') {
        return state;
    }

    const { bulls, cows } = evaluateGuess(state.secret, guess);
    const newHistory = [...state.history, { guess, bulls, cows }];
    const isWon = bulls === state.length;

    return {
        ...state,
        history: newHistory,
        status: isWon ? 'won' : 'playing',
        finishedAt: isWon ? Date.now() : null,
    };
}
