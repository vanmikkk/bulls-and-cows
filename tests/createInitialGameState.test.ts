import { describe, expect, it, vi } from 'vitest';
import { createInitialGameState } from '../src/createInitialGameState';

describe('createInitialGameState', () => {
    it('should create a game with the provided settings', () => {
        const state = createInitialGameState(4, 10);

        expect(state.length).toBe(4);
        expect(state.base).toBe(10);
        expect(state.secret).toHaveLength(4);
    });

    it('should generate a secret with unique digits', () => {
        const state = createInitialGameState(4, 10);

        expect(new Set(state.secret).size).toBe(4);
    });

    it('should initialize an empty history', () => {
        const state = createInitialGameState(4, 10);

        expect(state.history).toEqual([]);
    });

    it('should initialize the game with playing status', () => {
        const state = createInitialGameState(4, 10);

        expect(state.status).toBe('playing');
    });

    it('should record the start time', () => {
        vi.spyOn(Date, 'now').mockReturnValue(123456);

        const state = createInitialGameState(4, 10);

        expect(state.startedAt).toBe(123456);
        expect(state.finishedAt).toBeNull();

        vi.restoreAllMocks();
    });
});
