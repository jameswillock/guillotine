import React from "react"
import { guessAction, resetAction } from "../../store/guesses/actions"
import Keycap from "../Keycap/Keycap"
import ResetKeycap from "../ResetKeycap/ResetKeycap"
import classes from "./Guesses.module.css"

interface IGuessesProps {
  guessClickHandler: typeof guessAction
  resetClickHandler: typeof resetAction
}

export default React.memo((props: IGuessesProps) => {
  const layout: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ]

  const keycaps = layout.map((row, index) => {
    const characters = row.map((letter) => {
      return <Keycap key={letter} letter={letter} handler={() => props.guessClickHandler(letter)} />
    })

    // Append reset button to end of last row
    if (index === layout.length - 1) {
      characters.push(<ResetKeycap key="reset" handler={props.resetClickHandler} />)
    }

    return <div key={index} className={classes.Guesses}>{characters}</div>
  })

  return <>{keycaps}</>
})
