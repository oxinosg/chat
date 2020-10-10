import React from 'react'
import clsx from 'clsx'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'

type IProps = {
  text: string
  loading?: boolean
  success?: boolean
  style: any
  clickHandler: () => void
}

export function LoadingButton({
  text,
  loading,
  clickHandler,
  success,
  style,
}: IProps) {
  const classes = useStyles()

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFailed]: !success,
  })

  return (
    <div
      style={{
        position: 'relative',
      }}>
      <Button
        variant='contained'
        className={buttonClassname}
        disabled={loading}
        onClick={clickHandler}
        style={style}>
        {text}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  )
}
