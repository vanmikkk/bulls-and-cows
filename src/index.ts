import { generateSecret } from './generateSecret.js';
import { isValidGuess } from './isValidGuess.js';
import { evaluateGuess } from './evaluateGuess.js';

const startButton = document.querySelector<HTMLButtonElement>('#start-game');
const settingsSection = document.querySelector<HTMLElement>('#settings');
const gameSection = document.querySelector<HTMLElement>('#game');
const gameInfo = document.querySelector<HTMLElement>('#game-info');
const lengthSelect = document.querySelector<HTMLSelectElement>('#length');
const baseSelect = document.querySelector<HTMLSelectElement>('#base');
let secret = '';
const guessInput = document.querySelector<HTMLInputElement>('#guess-input');
const submitButton = document.querySelector<HTMLButtonElement>('#submit-guess');
const feedback = document.querySelector<HTMLElement>('#feedback');

startButton?.addEventListener('click', () => {
    if (!settingsSection || !gameSection || !gameInfo || !lengthSelect || !baseSelect) {
        return;
    }

    const length = Number(lengthSelect.value);
    const base = Number(baseSelect.value);
    secret = generateSecret(length, base);

    settingsSection.hidden = true;
    gameSection.hidden = false;

    gameInfo.textContent = `Длина числа: ${length}. Система счисления: ${base}.`;
});

submitButton?.addEventListener('click', () => {
    if (!guessInput || !feedback) {
        return;
    }

    const guess = guessInput.value.trim();

    if (!isValidGuess(guess, Number(lengthSelect?.value), Number(baseSelect?.value))) {
        feedback.textContent = 'Некорректная комбинация. Проверь длину, цифры и повторы.';
        return;
    }

    const result = evaluateGuess(secret, guess);

    feedback.textContent = `Быки: ${result.bulls}, коровы: ${result.cows}`;
});
