import React from 'react'
import classes from './ResetKeycap.module.css'

interface ResetKeycapProps {
  handler: (event: React.MouseEvent) => any
}

export default (props: ResetKeycapProps) => {
  return (
    <button onClick={props.handler} className={classes.ResetKeycap}>Reset</button>
  )
}
