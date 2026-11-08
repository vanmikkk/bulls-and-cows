import { generateSecret } from './generateSecret.js';
import type { GameState } from './types.js';

export function createInitialGameState(length: number, base: number): GameState {
    return {
        secret: generateSecret(length, base),
        length,
        base,
        history: [],
        status: 'playing',
        startedAt: Date.now(),
        finishedAt: null,
    };
}
