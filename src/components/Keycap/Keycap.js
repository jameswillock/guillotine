import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Keycap.module.css';

class Keycap extends Component {
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

Keycap.propTypes = {
  letter: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
};

export default Keycap;
