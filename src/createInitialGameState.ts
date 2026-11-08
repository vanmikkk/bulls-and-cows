import { generateSecret } from './generateSecret';
import type { GameState } from './types';

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
