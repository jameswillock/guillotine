import React from "react"
import classes from "./ResetKeycap.module.css"

interface IResetKeycapProps {
  handler: (event: React.MouseEvent) => any
}

export default React.memo((props: IResetKeycapProps) => {
  return (
    <button onClick={props.handler} className={classes.ResetKeycap}>Reset</button>
  )
})
