export function createDigitValidator(base: number): (digit: string) => boolean {
    return (digit: string): boolean => {
        if (digit.length !== 1) {
            return false;
        }

        const normalizedDigit = digit.toLowerCase();
        const value = parseInt(normalizedDigit, base);

        return (
            !Number.isNaN(value) &&
            value >= 0 &&
            value < base &&
            value.toString(base) === normalizedDigit
        );
    };
}
