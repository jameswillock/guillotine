import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keycap from '../Keycap/Keycap';
import classes from './Guesses.module.css';

class Guesses extends Component {
  static layout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  render() {
    return Guesses.layout.map((row, index) => {
      const characters = row.map(letter => {
        return <Keycap key={letter} letter={letter} handler={() => this.props.guessClickHandler(letter)} />;
      });

      if (index === Guesses.layout.length - 1) {
        characters.push(<Keycap key="reset" letter="Reset" handler={this.props.resetClickHandler} reset />);
      }
  
      return <div key={index} className={classes.Guesses}>{characters}</div>;
    });
  }
}

Guesses.propTypes = {
  guessClickHandler: PropTypes.func.isRequired,
  resetClickHandler: PropTypes.func.isRequired
};

export default Guesses;
