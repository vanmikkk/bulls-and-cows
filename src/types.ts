export interface GuessResult {
    guess: string;
    bulls: number;
    cows: number;
}

export interface GameState {
    secret: string;
    length: number;
    base: number;
    history: GuessResult[];
    status: 'playing' | 'won';
    startedAt: number;
    finishedAt: number | null;
}

export interface GameRecord {
    attempts: number;
    duration: number;
    length: number;
    base: number;
    completedAt: number;
}
