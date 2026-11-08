import { beforeEach, describe, expect, it } from 'vitest';

import { getGameRecords } from '../src/getGameRecords';

import type { GameRecord } from '../src/types';

const STORAGE_KEY = 'bulls-and-cows-records';

describe('getGameRecords', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('returns an empty array when there are no saved records', () => {
        expect(getGameRecords()).toEqual([]);
    });

    it('returns saved game records', () => {
        const records: GameRecord[] = [
            {
                attempts: 3,
                duration: 90000,
                length: 4,
                base: 10,
                completedAt: 1000,
            },
        ];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

        expect(getGameRecords()).toEqual(records);
    });
});
