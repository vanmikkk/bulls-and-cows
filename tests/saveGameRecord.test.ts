import { beforeEach, describe, expect, it } from 'vitest';

import { saveGameRecord } from '../src/saveGameRecord';

import type { GameRecord } from '../src/types';

const STORAGE_KEY = 'bulls-and-cows-records';

describe('saveGameRecord', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('saves a game record to localStorage', () => {
        const record: GameRecord = {
            attempts: 5,
            duration: 120000,
            length: 4,
            base: 10,
            completedAt: 1000,
        };

        saveGameRecord(record);

        const storedRecords = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

        expect(storedRecords).toEqual([record]);
    });

    it('preserves previously saved records', () => {
        const firstRecord: GameRecord = {
            attempts: 5,
            duration: 120000,
            length: 4,
            base: 10,
            completedAt: 1000,
        };

        const secondRecord: GameRecord = {
            attempts: 3,
            duration: 90000,
            length: 3,
            base: 8,
            completedAt: 2000,
        };

        saveGameRecord(firstRecord);
        saveGameRecord(secondRecord);

        const storedRecords = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

        expect(storedRecords).toEqual([secondRecord, firstRecord]);
    });
    it('sorts records by attempts and duration', () => {
        const records: GameRecord[] = [
            {
                attempts: 5,
                duration: 60000,
                length: 4,
                base: 10,
                completedAt: 1000,
            },
            {
                attempts: 3,
                duration: 90000,
                length: 4,
                base: 10,
                completedAt: 2000,
            },
            {
                attempts: 3,
                duration: 50000,
                length: 4,
                base: 10,
                completedAt: 3000,
            },
        ];

        records.forEach(saveGameRecord);

        const storedRecords = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

        expect(storedRecords.map((record: GameRecord) => record.attempts)).toEqual([3, 3, 5]);
        expect(storedRecords.map((record: GameRecord) => record.duration)).toEqual([
            50000, 90000, 60000,
        ]);
    });
    it('keeps only the top 10 records', () => {
        for (let i = 15; i >= 1; i -= 1) {
            saveGameRecord({
                attempts: i,
                duration: 60000,
                length: 4,
                base: 10,
                completedAt: i * 1000,
            });
        }

        const storedRecords = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

        expect(storedRecords).toHaveLength(10);
        expect(storedRecords[0].attempts).toBe(1);
        expect(storedRecords[9].attempts).toBe(10);
    });
});
