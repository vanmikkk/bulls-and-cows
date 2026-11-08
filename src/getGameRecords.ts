import type { GameRecord } from './types.js';

const STORAGE_KEY = 'bulls-and-cows-records';

export function getGameRecords(): GameRecord[] {
    const storedRecords = localStorage.getItem(STORAGE_KEY);

    return storedRecords ? (JSON.parse(storedRecords) as GameRecord[]) : [];
}
