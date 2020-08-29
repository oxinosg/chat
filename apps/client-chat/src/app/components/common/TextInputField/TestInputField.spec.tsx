import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { TextInputField } from './'

test('hello world', () => {
  const { baseElement } = render(<TextInputField label='User name:' />)
  expect(baseElement).toBeTruthy()
})
