import { isValidGuess } from './isValidGuess.js';
import { evaluateGuess } from './evaluateGuess.js';
import { submitGuess } from './submitGuess.js';
import type { GameState } from './types.js';
import { createInitialGameState } from './createInitialGameState.js';

const startButton = document.querySelector<HTMLButtonElement>('#start-game');
const settingsSection = document.querySelector<HTMLElement>('#settings');
const gameSection = document.querySelector<HTMLElement>('#game');
const gameInfo = document.querySelector<HTMLElement>('#game-info');
const lengthSelect = document.querySelector<HTMLSelectElement>('#length');
const baseSelect = document.querySelector<HTMLSelectElement>('#base');
let secret = '';
let gameState: GameState | null = null;
const guessInput = document.querySelector<HTMLInputElement>('#guess-input');
const submitButton = document.querySelector<HTMLButtonElement>('#submit-guess');
const feedback = document.querySelector<HTMLElement>('#feedback');
const historyList = document.querySelector<HTMLUListElement>('#history');
const newGameButton = document.querySelector<HTMLButtonElement>('#new-game');

startButton?.addEventListener('click', () => {
    if (!settingsSection || !gameSection || !gameInfo || !lengthSelect || !baseSelect) {
        return;
    }

    const length = Number(lengthSelect.value);
    const base = Number(baseSelect.value);
    gameState = createInitialGameState(length, base);
    secret = gameState.secret;

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

    if (!gameState) {
        return;
    }

    gameState = submitGuess(gameState, guess);
    if (gameState.status === 'won') {
        feedback.textContent += ' — Победа! Ты угадал секретное число!';
        submitButton.disabled = true;
        guessInput.disabled = true;
    }

    const result = evaluateGuess(secret, guess);

    feedback.textContent = `Быки: ${result.bulls}, коровы: ${result.cows}`;

    if (result.bulls === Number(lengthSelect?.value)) {
        feedback.textContent += ' — Победа! Ты угадал секретное число!';
    }

    if (historyList) {
        const historyItem = document.createElement('li');
        historyItem.textContent = `${guess} — Быки: ${result.bulls}, коровы: ${result.cows}`;
        historyList.append(historyItem);
    }
});

newGameButton?.addEventListener('click', () => {
    settingsSection!.hidden = false;
    gameSection!.hidden = true;

    guessInput!.value = '';
    guessInput!.disabled = false;
    submitButton!.disabled = false;

    feedback!.textContent = '';
    historyList!.replaceChildren();

    gameState = null;
    secret = '';
});
