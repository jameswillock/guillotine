import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Guesses from "../../components/Guesses/Guesses"
import { IApplicationState } from "../../store"
import { guessAction, resetAction } from "../../store/guesses/actions"
import { IGuessesState } from "../../store/guesses/types"
import classes from "./Game.module.css"

interface IDispatchProps {
  resetClickHandler: typeof resetAction
  guessClickHandler: typeof guessAction
}

type Props = IGuessesState & IDispatchProps

export class Game extends PureComponent<Props> {
  public render() {
    return (
      <div className={classes.Game}>
        <div className={classes.Solution}>
          {this.displaySolution()}
        </div>
        <div className={classes.Info}>
          {this.props.status}
        </div>
        <div>
          <Guesses
            guessClickHandler={this.props.guessClickHandler}
            resetClickHandler={this.props.resetClickHandler}
          />
        </div>
      </div>
    )
  }

  private displaySolution = () => Array.from(this.props.solution).map((character) =>
    this.props.guesses.has(character) ? character : "_"
  ).join("")
}

const mapStateToProps = ({ guesses }: IApplicationState) => ({
  guesses: guesses.guesses,
  solution: guesses.solution,
  status: guesses.status
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  guessClickHandler: (letter: string) => dispatch(guessAction(letter)),
  resetClickHandler: () => dispatch(resetAction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
