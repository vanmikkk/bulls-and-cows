export function isValidGuess(guess: string, length: number, base: number): boolean {
    if (guess.length !== length) {
        return false;
    }

    const isValidDigit = (digit: string): boolean => {
        const value = parseInt(digit, base);

        return !Number.isNaN(value) && value >= 0 && value < base && value.toString(base) === digit;
    };

    const digits = [...guess];

    return digits.every(isValidDigit) && new Set(digits).size === length;
}
