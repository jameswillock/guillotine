import React, { PureComponent } from 'react';
import Keycap from '../Keycap/Keycap';
import classes from './Guesses.module.css';
import { guessAction, resetAction } from '../../store/guesses/actions'

interface Props {
  guessClickHandler: typeof guessAction
  resetClickHandler: typeof resetAction
}

export default class Guesses extends PureComponent<Props> {
  static readonly layout: Array<Array<string>> = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ]

  resetKeycap = () => <Keycap key="reset" letter="Reset" handler={this.props.resetClickHandler} reset />

  render() {
    return Guesses.layout.map((row, index) => {
      const characters = row.map((letter) => {
        return <Keycap key={letter} letter={letter} handler={() => this.props.guessClickHandler(letter)} />
      })

      if (index === Guesses.layout.length - 1) characters.push(this.resetKeycap())
  
      return <div key={index} className={classes.Guesses}>{characters}</div>
    })
  }
}
