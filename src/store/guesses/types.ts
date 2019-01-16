export enum GuessesActionTypes {
  GUESS = "GUESS",
  RESET = "RESET",
  OTHER = "OTHER"
}

export interface GuessesState {
  readonly guesses: ReadonlySet<string>
  readonly solution: string
  readonly status: string
}

