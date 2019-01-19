export enum GuessesActionTypes {
  GUESS = "GUESS",
  RESET = "RESET",
  OTHER = "OTHER"
}

export interface IGuessesState {
  readonly guesses: ReadonlySet<string>
  readonly solution: string
  readonly status: string
}
