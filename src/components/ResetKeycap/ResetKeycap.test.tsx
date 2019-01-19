import "jest-dom/extend-expect"
import React from "react"
import { cleanup, fireEvent, render } from "react-testing-library"
import ResetKeycap from "./ResetKeycap"

afterEach(cleanup)

test("Renders a button with the letter as its text", () => {
  const { getByText } = render(<ResetKeycap handler={() => true} />)
  expect(getByText("Reset")).toBeInTheDocument()
})

test("Fires the clicked event", () => {
  const handler = jest.fn()
  const { getByText } = render(<ResetKeycap handler={handler} />)

  fireEvent.click(getByText("Reset"))
  expect(handler).toHaveBeenCalledTimes(1)
})
