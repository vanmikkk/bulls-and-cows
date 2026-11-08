const memo = new Map<string, number>();

export function countPossibleSecrets(length: number, base: number): number {
    if (length < 1 || base < 2) {
        throw new RangeError('Invalid length or base');
    }

    if (length > base) {
        return 0;
    }

    function count(remaining: number, available: number): number {
        if (remaining === 0) {
            return 1;
        }

        const key = `${remaining}-${available}`;
        const cachedResult = memo.get(key);

        if (cachedResult !== undefined) {
            return cachedResult;
        }

        const result = available * count(remaining - 1, available - 1);

        memo.set(key, result);

        return result;
    }

    return count(length, base);
}
