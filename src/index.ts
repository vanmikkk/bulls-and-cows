import { isValidGuess } from './isValidGuess.js';
import { submitGuess } from './submitGuess.js';
import type { GameState } from './types.js';
import { createInitialGameState } from './createInitialGameState.js';
import { createDigitValidator } from './createDigitValidator.js';
import { saveGameRecord } from './saveGameRecord.js';
import { getGameRecords } from './getGameRecords.js';
import { isDuplicateGuess } from './isDuplicateGuess.js';

document.body.innerHTML = `
    <div id="app">
        <h1>Быки и коровы</h1>

        <button id="open-records" type="button">Таблица рекордов</button>

        <dialog id="records-dialog">
            <h2>Таблица рекордов</h2>
            <ol id="records-list"></ol>
            <button id="close-records" type="button">Закрыть</button>
        </dialog>
        <section id="settings">
            <h2>Новая игра</h2>

            <label for="length">Длина секретного числа:</label>
            <select id="length">
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4" selected>4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>

            <label for="base">Система счисления:</label>
            <select id="base">
                <option value="2">Двоичная</option>
                <option value="8">Восьмеричная</option>
                <option value="10" selected>Десятичная</option>
                <option value="16">Шестнадцатеричная</option>
            </select>

            <button id="start-game">Начать игру</button>
        </section>

        <section id="game" hidden>
            <h2>Игра началась!</h2>
            <p id="game-info"></p>

            <label for="guess-input">Твоя догадка:</label>
            <input type="text" id="guess-input" autocomplete="off" maxlength="6" />

            <button id="submit-guess">Проверить</button>

            <p id="feedback"></p>
            <h3>История попыток</h3>
            <ul id="history"></ul>
            <button id="new-game">Новая игра</button>
        </section>
    </div>
`;

function renderGameRecords(): void {
    const recordsList = document.querySelector<HTMLOListElement>('#records-list');

    if (!recordsList) {
        return;
    }

    const records = getGameRecords();

    recordsList.replaceChildren();

    records.forEach((record) => {
        const item = document.createElement('li');
        const durationInSeconds = Math.floor(record.duration / 1000);

        item.textContent = `${record.attempts} попыток — ${durationInSeconds} сек. (${record.length} цифр, система ${record.base})`;

        recordsList.append(item);
    });
}

renderGameRecords();

const startButton = document.querySelector<HTMLButtonElement>('#start-game');
const settingsSection = document.querySelector<HTMLElement>('#settings');
const gameSection = document.querySelector<HTMLElement>('#game');
const gameInfo = document.querySelector<HTMLElement>('#game-info');
const lengthSelect = document.querySelector<HTMLSelectElement>('#length');
const baseSelect = document.querySelector<HTMLSelectElement>('#base');
baseSelect?.addEventListener('change', () => {
    if (!lengthSelect || !baseSelect) {
        return;
    }

    if (Number(baseSelect.value) === 2) {
        lengthSelect.value = '2';
        lengthSelect.disabled = true;
    } else {
        lengthSelect.disabled = false;
    }
});
let gameState: GameState | null = null;
const guessInput = document.querySelector<HTMLInputElement>('#guess-input');
guessInput?.addEventListener('input', () => {
    if (!guessInput || !baseSelect) {
        return;
    }

    const isValidDigit = createDigitValidator(Number(baseSelect.value));
    const filteredValue = [...guessInput.value.toUpperCase()].filter(isValidDigit).join('');

    guessInput.value = filteredValue;
});
const submitButton = document.querySelector<HTMLButtonElement>('#submit-guess');
const feedback = document.querySelector<HTMLElement>('#feedback');
const historyList = document.querySelector<HTMLUListElement>('#history');
const newGameButton = document.querySelector<HTMLButtonElement>('#new-game');
const openRecordsButton = document.querySelector<HTMLButtonElement>('#open-records');
const closeRecordsButton = document.querySelector<HTMLButtonElement>('#close-records');
const recordsDialog = document.querySelector<HTMLDialogElement>('#records-dialog');

openRecordsButton?.addEventListener('click', () => {
    renderGameRecords();
    recordsDialog?.showModal();
});

closeRecordsButton?.addEventListener('click', () => {
    recordsDialog?.close();
});

startButton?.addEventListener('click', () => {
    if (!settingsSection || !gameSection || !gameInfo || !lengthSelect || !baseSelect) {
        return;
    }

    const length = Number(lengthSelect.value);
    const base = Number(baseSelect.value);
    gameState = createInitialGameState(length, base);

    settingsSection.hidden = true;
    gameSection.hidden = false;

    gameInfo.textContent = `Длина числа: ${length}. Система счисления: ${base}.`;
});

submitButton?.addEventListener('click', () => {
    if (!guessInput || !feedback) {
        return;
    }

    const guess = guessInput.value.trim();
    if (gameState && isDuplicateGuess(gameState.history, guess)) {
        feedback.textContent = 'Ты уже пробовал эту комбинацию. Попробуй другую.';
        return;
    }

    if (!isValidGuess(guess, Number(lengthSelect?.value), Number(baseSelect?.value))) {
        feedback.textContent = 'Некорректная комбинация. Проверь длину, цифры и повторы.';
        return;
    }

    if (!gameState) {
        return;
    }

    gameState = submitGuess(gameState, guess);

    const result = gameState.history[gameState.history.length - 1];

    if (!result) {
        return;
    }

    if (gameState.status === 'won') {
        submitButton.disabled = true;
        guessInput.disabled = true;

        const record = {
            attempts: gameState.history.length,
            duration: gameState.finishedAt! - gameState.startedAt,
            length: gameState.length,
            base: gameState.base,
            completedAt: gameState.finishedAt!,
        };

        saveGameRecord(record);
        renderGameRecords();
    }

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
});
