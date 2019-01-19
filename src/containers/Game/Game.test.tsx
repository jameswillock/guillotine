import "jest-dom/extend-expect"
import React from "react"
import { cleanup, render } from "react-testing-library"
import { Game } from "./Game"

afterEach(cleanup)

const props = {
  guessClickHandler: jest.fn(),
  guesses: new Set(),
  resetClickHandler: jest.fn(),
  solution: "WORD",
  status: "status"
}

describe("Game status", () => {
  test("In a newly started game", () => {
    const { getByText } = render(<Game {...props} />)
    expect(getByText("____")).toBeInTheDocument()
  })

  test("In an in progress game", () => {
    const guesses = new Set(["W"])
    const { getByText } = render(<Game {...props} guesses={guesses} />)
    expect(getByText("W___")).toBeInTheDocument()
  })
})

test("Renders the game status", () => {
  const { getByText } = render(<Game {...props} />)
  expect(getByText(props.status)).toBeInTheDocument()
})
