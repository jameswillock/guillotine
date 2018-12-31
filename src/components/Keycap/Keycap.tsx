import React, { PureComponent, SyntheticEvent } from 'react';
import classes from './Keycap.module.css';

interface Props {
  letter: string,
  reset: boolean,
  handler: (event: React.MouseEvent<HTMLButtonElement>) => void
};

export default class Keycap extends PureComponent<Props> {
  static defaultProps = {
    reset: false
  };

  render() {
    const classNames = [classes.Keycap];
    if (this.props.reset) classNames.push(classes.Reset);

    return (
      <button onClick={this.props.handler} className={classNames.join(' ')}>
        {this.props.letter}
      </button>
    );
  }
}
