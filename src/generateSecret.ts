export function generateSecret(
    length: number,
    base: number,
    random: () => number = Math.random
): string {
    if (length < 1 || base < 2 || length > base) {
        throw new RangeError('Invalid length or base');
    }

    const availableDigits = Array.from({ length: base }, (_, index) => index.toString(base));

    const secret: string[] = [];

    for (let i = 0; i < length; i += 1) {
        const randomIndex = Math.floor(random() * availableDigits.length);
        const digit = availableDigits.splice(randomIndex, 1)[0];

        if (digit === undefined) {
            throw new Error('Failed to select a digit');
        }

        secret.push(digit);
    }

    return secret.join('');
}
