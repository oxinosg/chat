import React from 'react'
import InputBase, {
  InputBaseProps
} from '@material-ui/core/InputBase'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import useStyles from './styles'

interface  IProps  extends InputBaseProps {}

export const TextInputField = (props: IProps
) => {
  const classes = useStyles()

  return (
    <FormControl className={props.className}>
      <InputLabel
        shrink
        htmlFor='custom-input'
        className={classes.label}
        classes={{ focused: classes.focusedLabel }}>
        {props.label}
      </InputLabel>
      <InputBase
        {...props}
        classes={{
          root: classes.root,
          input: classes.input,
        }}
      />
    </FormControl>
  )
}
