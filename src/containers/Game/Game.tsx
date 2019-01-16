import React, { PureComponent } from 'react'
import Guesses from '../../components/Guesses/Guesses'
import classes from './Game.module.css'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { guessAction, resetAction } from '../../store/guesses/actions'
import { ApplicationState } from '../../store'
import { GuessesState } from '../../store/guesses/types'

interface DispatchProps {
  resetClickHandler: typeof resetAction
  guessClickHandler: typeof guessAction
}

type Props = GuessesState & DispatchProps

class Game extends PureComponent<Props> {
  displaySolution = () => Array.from(this.props.solution).map(character => 
    this.props.guesses.has(character) ? character : '_'
  ).join('')

  render() {
    return (
      <div className={classes.Game}>
        <div className={classes.Solution}>
          {this.displaySolution()}
        </div>
        <div className={classes.Info}>
          {this.props.status}
        </div>
        <div>
          <Guesses guessClickHandler={this.props.guessClickHandler}
            resetClickHandler={this.props.resetClickHandler} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ guesses }: ApplicationState) => ({
  guesses: guesses.guesses, 
  solution: guesses.solution,
  status: guesses.status
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetClickHandler: () => dispatch(resetAction()),
  guessClickHandler: (letter: string) => dispatch(guessAction(letter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
