import { action } from 'typesafe-actions'
import { GuessesActionTypes } from './types'

export const guessAction = (letter: string) => action(GuessesActionTypes.GUESS, letter)
export const resetAction = () => action(GuessesActionTypes.RESET)
