# Bulls and Cows — Design

## 1. Project Overview

Bulls and Cows is a browser-based logic game.
The player tries to guess a secret sequence of unique digits.
After each guess, the game provides feedback:

- Bulls — correct digits in the correct positions.
- Cows — correct digits in the wrong positions.

## 2. Architecture

The application is divided into two main parts:

### Game Logic

Responsible for:

- Generating the secret code.
- Validating player guesses.
- Evaluating guesses.
- Counting possible secret combinations.
- Managing game state and history.

### User Interface

Responsible for:

- Displaying game settings.
- Accepting player input.
- Showing feedback after each guess.
- Displaying game history and current status.

## 3. Technologies

- TypeScript
- HTML
- CSS
- Vitest
- ESLint
- Prettier
