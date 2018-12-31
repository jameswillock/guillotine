import React, { PureComponent, ReactElement } from 'react';
import Keycap from '../Keycap/Keycap';
import classes from './Guesses.module.css';

interface Props {
  guessClickHandler: (letter: string) => void
  resetClickHandler: () => void
};

export default class Guesses extends PureComponent<Props> {
  static readonly layout: Array<Array<string>> = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  resetKeycap = () => <Keycap key="reset" letter="Reset" handler={this.props.resetClickHandler} reset />;

  render() {
    return Guesses.layout.map((row: Array<string>, index: number) => {
      const characters = row.map((letter: string) => {
        return <Keycap key={letter} letter={letter} handler={() => this.props.guessClickHandler(letter)} />;
      });

      if (index === Guesses.layout.length - 1) characters.push(this.resetKeycap());
  
      return <div key={index} className={classes.Guesses}>{characters}</div>;
    });
  }
}
