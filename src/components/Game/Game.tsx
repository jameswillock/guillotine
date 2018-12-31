import React, { PureComponent } from 'react';
import word from '../../utilities/words';
import Guesses from '../Guesses/Guesses';
import classes from './Game.module.css';
import Typed from 'typed.js';

interface State {
  guesses: Set<string>,
  solution: string,
  status: Status
}

enum Status {
  InProgress,
  Failed,
  Suceeded
}

export default class Game extends PureComponent<{}, State> {
  static allowedIncorrectGuesses = 7;

  typed?: Typed;
  statusElement?: any;

  state = {
    guesses: new Set(),
    solution: word(),
    status: Status.InProgress, 
  };

  setStatusRef = (element: HTMLSpanElement) => {
    this.statusElement = element;
  };

  setupTyped = () => {
    if (!this.statusElement) return;

    return new Typed(this.statusElement, {
      strings: [this.displayStatus()]
    });
  };

  componentWillUnmount() {
    if (this.typed) this.typed.destroy();
  }

  componentDidMount() {
    this.typed = this.setupTyped();
  }

  componentDidUpdate(_: {}, prevState: State) {
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

  status = ()  => {
    if (this.hasFailed()) return Status.Failed;
    if (this.hasSucceeded()) return Status.Suceeded;
    return Status.InProgress;
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

  guessClickHandler = (letter: string) => {
    if (this.state.status !== Status.InProgress) return;

    this.setState(prevState => {
      const guesses = new Set(prevState.guesses).add(letter);
      return { guesses: guesses };
    });
  };

  resetClickHandler = () => {
    this.setState({
      guesses: new Set(),
      solution: word(),
      status: Status.InProgress
    });
  };

  displaySolution = () => {
    return Array.from(this.state.solution).map(character => 
      this.state.guesses.has(character) ? character : '_'
    ).join('');
  };

  displayStatus = () => {
    switch (this.state.status) {
      case Status.Suceeded:
        return "Congratulations, you guessed correctly!";
      case Status.Failed:
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

  guessesRemaining = () => {
    return Game.allowedIncorrectGuesses - this.incorrectGuesses().length;
  }

  render() {
    return (
      <div className={classes.Game}>
        <div className={classes.Solution}>
          {this.displaySolution()}
        </div>
        <div className={classes.Info}>
          <span ref={this.setStatusRef}></span>
        </div>
        <div>
          <Guesses guessClickHandler={this.guessClickHandler}
            resetClickHandler={this.resetClickHandler} />
        </div>
      </div>
    );
  }
}
