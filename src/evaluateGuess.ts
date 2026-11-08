export function evaluateGuess(secret: string, guess: string): { bulls: number; cows: number } {
    const normalizedSecret = secret.toLowerCase();
    const normalizedGuess = guess.toLowerCase();
    const secretDigits = [...normalizedSecret];
    const guessDigits = [...normalizedGuess];

    const bulls = guessDigits
        .map((digit, index) => (digit === secretDigits[index] ? 1 : 0))
        .reduce<number>((sum, bull) => sum + bull, 0);

    const cows = guessDigits
        .filter((digit, index) => digit !== secretDigits[index])
        .filter((digit) => secretDigits.includes(digit)).length;

    return { bulls, cows };
}
