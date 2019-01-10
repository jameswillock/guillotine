import React from 'react';
import Guesses from './Guesses';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('It renders Keycaps for each character', () => {
  const { getByText } = render(
    <Guesses guessClickHandler={() => true}
      resetClickHandler={() => true} />
  );

  const letters = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U',
    'I', 'O', 'P', 'A', 'S', 'D', 'F',
    'G', 'H', 'J', 'K', 'L', 'Z', 'X',
    'C', 'V', 'B', 'N', 'M'
  ];
  
  letters.forEach(letter => expect(getByText(letter)).toBeInTheDocument());

  expect(getByText('Reset')).toBeInTheDocument();
});
