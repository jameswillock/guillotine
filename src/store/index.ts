import { combineReducers } from "redux"
import guessesReducer from "./guesses/reducer"
import { IGuessesState } from "./guesses/types"

export interface IApplicationState {
  guesses: IGuessesState
}

export const rootReducer = combineReducers<IApplicationState>({
  guesses: guessesReducer
})
