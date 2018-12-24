import React, { Component } from 'react';
import word from '../utilities/words';
import Guesses from './Guesses';
import statuses from '../utilities/statuses';
import classes from './Game.module.css';
import Typed from 'typed.js';

class Game extends Component {
  static allowedIncorrectGuesses = 7;

  state = {
    guesses: new Set(),
    solution: word(),
    status: statuses.IN_PROGRESS, 
  };

  setupTyped = () => new Typed(this.statusElement, {
    strings: [this.displayStatus()]
  });

  componentWillUnmount() {
    if (this.typed) this.typed.destroy();
  }

  componentDidMount() {
    this.typed = this.setupTyped();
  }

  componentDidUpdate(_, prevState) {
    if (this.typed) this.typed.destroy();

    this.typed = this.setupTyped();

    const guessesIntersection = new Set(
      [...this.state.guesses].filter(character =>
        !prevState.guesses.has(character)
      )
    );

    if (guessesIntersection.size > 0) {
      this.setState({ status: this.status() });
    }
  };

  status = () => {
    if (this.hasFailed()) return statuses.FAILED;
    if (this.hasSucceeded()) return statuses.SUCCEEDED;
    return statuses.IN_PROGRESS;
  }

  hasSucceeded = () => {
    return Array.from(this.state.solution).every(letter =>
      this.state.guesses.has(letter)
    );
  };

  hasFailed = () => {
    if (this.hasSucceeded()) return false;
    return this.incorrectGuesses().length >= Game.allowedIncorrectGuesses;
  };

  guessClickHandler = (letter) => {
    if (this.state.status !== statuses.IN_PROGRESS) return;

    this.setState(prevState => {
      const guesses = new Set(prevState.guesses).add(letter);
      return { guesses: guesses };
    });
  };

  resetClickHandler = () => {
    this.setState({
      guesses: new Set(),
      solution: word(),
      status: statuses.IN_PROGRESS
    });
  };

  displaySolution = () => {
    return Array.from(this.state.solution).map(character => 
      this.state.guesses.has(character) ? character : '_'
    ).join('');
  };

  displayStatus = () => {
    switch (this.state.status) {
      case statuses.SUCCEEDED:
        return "Congratulations, you guessed correctly!";
      case statuses.FAILED:
        return `You failed. The answer was <strong>${this.state.solution}</strong>.`;
      default:
        return `<strong>${this.guessesRemaining()}</strong> guesses remaining.`;
    }
  };

  incorrectGuesses = () => {
    return [...this.state.guesses].filter(character =>
      !this.state.solution.includes(character)
    );
  };

  guessesRemaining = () => Game.allowedIncorrectGuesses - this.incorrectGuesses().length;

  render() {
    return (
      <div className={classes.Game}>
        <div className={classes.Solution}>
          {this.displaySolution()}
        </div>
        <div className={classes.Info}>
          <span ref={(element) => { this.statusElement = element; }}></span>
        </div>
        <div className={classes.Keyboard}>
          <Guesses guessClickHandler={this.guessClickHandler}
            resetClickHandler={this.resetClickHandler}
            guessed={this.state.guesses} />
        </div>
      </div>
    );
  }
}

export default Game;
