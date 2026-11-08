import type { GameRecord } from './types.js';

const STORAGE_KEY = 'bulls-and-cows-records';

export function saveGameRecord(record: GameRecord): void {
    const storedRecords = localStorage.getItem(STORAGE_KEY);
    const records: GameRecord[] = storedRecords ? JSON.parse(storedRecords) : [];

    records.push(record);
    records.sort((a, b) => {
        if (a.attempts !== b.attempts) {
            return a.attempts - b.attempts;
        }

        return a.duration - b.duration;
    });

    const topRecords = records.slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(topRecords));
}
