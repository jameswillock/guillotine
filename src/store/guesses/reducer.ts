import { Reducer } from 'redux';
import { GuessesState, GuessesActionTypes } from './types'
import word from '../../utilities/words'

const allowedIncorrectGuesses = 7;

const initialState: GuessesState = {
  guesses: new Set(),
  solution: word(),
  status: `${allowedIncorrectGuesses} guesses remaining`
}

const hasWon = (solution: string, guesses: Set<string>) => {
  return Array.from(solution).every(letter => guesses.has(letter))
}

const hasLost = (solution: string, guesses: Set<string>) => {
  return [...guesses].filter(character => !solution.includes(character)).length >= allowedIncorrectGuesses
}

const reducer: Reducer<GuessesState> = (state = initialState, action) => {
  switch (action.type) {
    case GuessesActionTypes.RESET:
      return { ...initialState, solution: word() }
    case GuessesActionTypes.GUESS:   
      // Return original state if guess is not new
      if (state.guesses.has(action.payload)) return { ...state }

      // Copy new `guesses` set
      const guesses = new Set(state.guesses).add(action.payload)
      
      // Determine if game is won or lost
      if (hasWon(state.solution, guesses)) {
        const status = "Congratulations, you guessed correctly!"
        return { ...state, guesses: guesses, status: status }
      } else if (hasLost(state.solution, guesses)) {
        const status = `You failed. The answer was ${state.solution}.`
        return { ...state, guesses: guesses, status: status }
      }

      // Return state with new guesses
      const incorrectGuessesRemaining = allowedIncorrectGuesses - [...guesses].filter(character => {
        return !state.solution.includes(character)
      }).length

      const status = `${incorrectGuessesRemaining} guesses remaining.`

      return { ...state, guesses: guesses, status: status }
    default:
      return state
  }
}

export default reducer
