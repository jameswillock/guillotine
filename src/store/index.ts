import { combineReducers } from 'redux'
import guessesReducer from './guesses/reducer'
import { GuessesState } from './guesses/types'

export interface ApplicationState {
  guesses: GuessesState
}

export const rootReducer = combineReducers<ApplicationState>({
  guesses: guessesReducer
})
