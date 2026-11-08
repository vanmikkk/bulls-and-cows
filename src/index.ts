const startButton = document.querySelector<HTMLButtonElement>('#start-game');
const settingsSection = document.querySelector<HTMLElement>('#settings');
const gameSection = document.querySelector<HTMLElement>('#game');
const gameInfo = document.querySelector<HTMLElement>('#game-info');
const lengthSelect = document.querySelector<HTMLSelectElement>('#length');
const baseSelect = document.querySelector<HTMLSelectElement>('#base');

startButton?.addEventListener('click', () => {
    if (!settingsSection || !gameSection || !gameInfo || !lengthSelect || !baseSelect) {
        return;
    }

    const length = Number(lengthSelect.value);
    const base = Number(baseSelect.value);

    settingsSection.hidden = true;
    gameSection.hidden = false;

    gameInfo.textContent = `Длина числа: ${length}. Система счисления: ${base}.`;
});
