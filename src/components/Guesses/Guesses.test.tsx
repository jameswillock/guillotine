import React from 'react'
import Guesses from './Guesses'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup);

test('It renders Keycaps for each character', () => {
  const guessAction = jest.fn()
  const resetAction = jest.fn()

  const { getByText } = render(
    <Guesses guessClickHandler={() => guessAction('A')}
      resetClickHandler={() => resetAction()} />
  )

  const letters = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U',
    'I', 'O', 'P', 'A', 'S', 'D', 'F',
    'G', 'H', 'J', 'K', 'L', 'Z', 'X',
    'C', 'V', 'B', 'N', 'M'
  ]

  letters.forEach(letter => expect(getByText(letter)).toBeInTheDocument())

  expect(getByText('Reset')).toBeInTheDocument()
});
