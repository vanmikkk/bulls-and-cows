# Bulls and Cows — Design

## 1. Project Overview

Bulls and Cows is a browser-based logic game.

The player tries to guess a secret sequence of unique digits. The secret can use binary, octal, decimal, or hexadecimal digits.

After each valid guess, the game provides feedback:

- **Bulls** — correct digits in the correct positions.
- **Cows** — correct digits in the wrong positions.

The game ends when all digits are guessed correctly.

## 2. Architecture

The application is divided into two main parts.

### 2.1. Game Logic

The game logic is implemented in independent TypeScript modules located in `src/`.

| Module                      | Responsibility                                                           |
| --------------------------- | ------------------------------------------------------------------------ |
| `generateSecret.ts`         | Generates a secret sequence of unique digits.                            |
| `evaluateGuess.ts`          | Calculates bulls and cows for a guess.                                   |
| `createDigitValidator.ts`   | Creates a validator for digits in a given number system.                 |
| `isValidGuess.ts`           | Validates the length, digits, and uniqueness of a guess.                 |
| `isDuplicateGuess.ts`       | Checks whether a guess has already been submitted, ignoring letter case. |
| `countPossibleSecrets.ts`   | Counts possible secret sequences using recursion and memoization.        |
| `createInitialGameState.ts` | Creates the initial game state.                                          |
| `submitGuess.ts`            | Creates an updated game state after a guess.                             |
| `saveGameRecord.ts`         | Saves and sorts game records in local storage.                           |
| `getGameRecords.ts`         | Retrieves saved game records.                                            |

### 2.2. User Interface

The user interface is implemented in `src/index.ts`.

It is responsible for:

- Displaying game settings.
- Accepting and filtering player input.
- Starting and restarting games.
- Displaying feedback after each guess.
- Showing the history of attempts.
- Displaying the leaderboard in a modal dialog.
- Saving a record when the player wins.

The application uses DOM APIs to create and update interface elements.

## 3. Data Structures

### 3.1. GameState

The game state contains:

- `secret` — the secret digit sequence.
- `length` — the secret sequence length.
- `base` — the selected number system.
- `history` — an array of previous guesses and their results.
- `status` — either `playing` or `won`.
- `startedAt` — game start timestamp.
- `finishedAt` — game completion timestamp or `null`.

### 3.2. GuessResult

Each history entry contains:

- `guess` — the submitted guess.
- `bulls` — the number of correct digits in correct positions.
- `cows` — the number of correct digits in incorrect positions.

### 3.3. GameRecord

A saved game record contains:

- `attempts` — number of guesses.
- `duration` — game duration in milliseconds.
- `length` — secret sequence length.
- `base` — selected number system.
- `completedAt` — completion timestamp.

## 4. Algorithms and Complexity

### 4.1. Secret Generation

The `generateSecret` function creates an array of available digits and repeatedly selects a random digit. The selected digit is removed from the available array using `splice`, preventing duplicates.

The random function can be injected as an optional parameter, which makes the algorithm deterministic in tests.

- Time complexity: **O(base × length)**, because removing an element from an array may require shifting the remaining elements.
- Space complexity: **O(base)**, for the available digits and generated secret.

### 4.2. Guess Evaluation

The `evaluateGuess` function normalizes both sequences to lowercase and converts them into arrays.

It calculates bulls by mapping each guess digit to a match indicator and reducing the indicators to a total.

It calculates cows by filtering out bulls and checking whether the remaining digits occur in the secret.

- Time complexity: **O(length²)**, because `includes` is called inside a filter.
- Space complexity: **O(length)**, for the digit arrays and intermediate arrays.

### 4.3. Guess Validation

The `isValidGuess` function checks:

1. The guess has the required length.
2. Every digit is valid for the selected number system.
3. All digits are unique.

It uses `every` and `Set` to perform these checks.

- Time complexity: **O(length)**.
- Space complexity: **O(length)**, for the digit array and the set.

### 4.4. Digit Validator

The `createDigitValidator` function returns a predicate that validates a single digit for a given number system.

It normalizes the character to lowercase, parses it using the selected base, and checks that the value is within the allowed range.

- Time complexity: **O(1)** for a single digit.
- Space complexity: **O(1)**.

### 4.5. Counting Possible Secrets

The `countPossibleSecrets` function uses recursion and memoization.

At each step, it multiplies the number of available digits by the number of possible sequences for the remaining positions. The base case returns `1` when no more digits need to be selected.

Memoization stores calculated results in a `Map`, avoiding repeated calculations.

- Time complexity: **O(length)**, because there are at most `length + 1` distinct recursive states.
- Space complexity: **O(length)**, for the memoization map and recursion stack.

## 5. State Management

The game state is updated immutably.

The `submitGuess` function creates a new history array using the spread operator and returns a new state object instead of modifying the previous state.

Once the game is won, additional guesses are rejected.

This approach makes state transitions predictable and easier to test.

## 6. Clean Code Principles

The project follows several Clean Code principles:

- **Single Responsibility Principle:** each game logic module has one clearly defined responsibility.
- **Meaningful Names:** functions and variables use descriptive names, such as `generateSecret`, `isValidGuess`, and `availableDigits`.
- **Small Functions:** game logic is separated into focused functions instead of being placed in one large module.
- **Immutability:** game state and history are updated by creating new objects and arrays.
- **Pure Functions:** functions such as `evaluateGuess`, `isValidGuess`, and `countPossibleSecrets` do not modify external state.
- **Testability:** random number generation can be injected into `generateSecret`, and game logic is tested independently using Vitest.

## 7. Technologies

- TypeScript
- HTML
- CSS
- Vitest
- ESLint
- Prettier
- Husky
- localStorage
