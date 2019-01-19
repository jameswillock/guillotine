import React from 'react'
import classes from './Keycap.module.css'

interface KeycapProps {
  letter: string
  handler: (event: React.MouseEvent) => any
}

export default React.memo((props: KeycapProps) => {
  return (
    <button onClick={props.handler} className={classes.Keycap}>{props.letter}</button>
  )
})
