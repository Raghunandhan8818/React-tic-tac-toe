import Game from '../components/Game';
import {fireEvent, render} from "@testing-library/react";

describe("Game Component", () => {


    test("Renders correctly", () => {
        const {getByTestId, getAllByTestId} = render(<Game />);
        const squares = getAllByTestId("square")
        const gameInfos = getAllByTestId("game-info-li")
        const reset = gameInfos[0];
        expect(reset.textContent).toBe("Reset")
        expect(squares).toHaveLength(9)
    })

    test("resets the game after some moves", ()=>{
        const {getByTestId, getAllByTestId} = render(<Game />);
        const firstSquare = getAllByTestId("square")[0]
        fireEvent.click(firstSquare)
        const secondSquare = getAllByTestId("square")[1]
        fireEvent.click(secondSquare)
        expect(firstSquare.textContent).toBe("X")
        expect(secondSquare.textContent).toBe("O")
        const resetButton = getAllByTestId("game-info-li")[0]
        fireEvent.click(resetButton)
        expect(firstSquare.textContent).toBe("")
        expect(secondSquare.textContent).toBe("")
    })


    test("resets to move 1 when clicked second button", () => {
        const {getByTestId, getAllByTestId} = render(<Game />);
        const firstSquare = getAllByTestId("square")[0]
        fireEvent.click(firstSquare)
        const secondSquare = getAllByTestId("square")[1]
        fireEvent.click(secondSquare)
        const moveOneButton = getAllByTestId("game-info-li")[1]
        fireEvent.click(moveOneButton)
        expect(secondSquare.textContent).toBe("")
        expect(firstSquare.textContent).toBe("X")

    })
})

