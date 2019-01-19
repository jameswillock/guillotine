import { Reducer } from "redux"
import word from "../../utilities/words"
import { GuessesActionTypes, IGuessesState } from "./types"

const allowedIncorrectGuesses = 7

const initialState: IGuessesState = {
  guesses: new Set(),
  solution: word(),
  status: `${allowedIncorrectGuesses} guesses remaining`
}

const hasWon = (solution: string, guesses: Set<string>) => {
  return Array.from(solution).every((letter) => guesses.has(letter))
}

const hasLost = (solution: string, guesses: Set<string>) => {
  return [...guesses].filter((character) => !solution.includes(character)).length >= allowedIncorrectGuesses
}

const reducer: Reducer<IGuessesState> = (state = initialState, action) => {
  switch (action.type) {
    case GuessesActionTypes.RESET:
      return { ...initialState, solution: word() }
    case GuessesActionTypes.GUESS:
      // Return original state if guess is not new
      if (state.guesses.has(action.payload)) {
        return { ...state }
      }

      // Copy new `guesses` set
      const guesses = new Set(state.guesses).add(action.payload)

      let status: string

      // Determine if game is won or lost
      if (hasWon(state.solution, guesses)) {
        status = "Congratulations, you guessed correctly!"
        return { ...state, guesses, status }
      } else if (hasLost(state.solution, guesses)) {
        status = `You failed. The answer was ${state.solution}.`
        return { ...state, guesses, status }
      }

      // Return state with new guesses
      const incorrectGuessesRemaining = allowedIncorrectGuesses - [...guesses].filter((character) => {
        return !state.solution.includes(character)
      }).length

      status = `${incorrectGuessesRemaining} guesses remaining.`

      return { ...state, guesses, status }
    default:
      return state
  }
}

export default reducer
