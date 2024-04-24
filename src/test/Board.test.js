import Board from '../components/Board';
import React from 'react';
import {render, fireEvent, getAllByTestId, getByTestId} from '@testing-library/react';

describe("Board Component", () => {

    const squares = Array(9).fill(null)
    const onPlayMock = jest.fn();
    test("should render correctly", () => {
        const {getByTestId} = render(<Board squares={squares} xIsNext={true}/>);
        const statusText = getByTestId("status")
        expect(statusText.textContent).toBe("Next player: X")
    })

    test("calls the onPlay handler when clicked with Modified Array as a parameter ", () => {
        const {getAllByTestId} = render(<Board squares={squares} xIsNext={true} onPlay={onPlayMock}/>);
        const allSquares = getAllByTestId('square')
        const firstSquare = allSquares[0]
        fireEvent.click(firstSquare)
        expect(onPlayMock).toHaveBeenCalledWith(expect.arrayContaining(['X']))
    })

    test("displays the winner properly", () => {
        const updatedSquares = ["X", "X", "X", null, null, null, null, null, null]
        const {getByTestId, getAllByTestId} = render(<Board squares={updatedSquares} XIsNext={true}/>)
        const fifthSquare = getAllByTestId("square")[4]
        const status = getByTestId("status")
        expect(status.textContent).toBe("Winner: X")
    })

    test("should be able to click all the squares", () => {
        const {getAllByTestId} = render(<Board squares={squares} onPlay={onPlayMock}/>);
        const allSquares = getAllByTestId("square")
        for (let i = 0; i < 9; i++) {
            fireEvent.click(allSquares[i]);
        }
        expect(onPlayMock).toHaveBeenCalledTimes(9);
    })

    test("should not allow to mark after winner declaration", () => {
        const updatedSquares = ["X", "X", "X", null, null, null, null, null, null]
        const {getByTestId, getAllByTestId} = render(<Board squares={updatedSquares} XIsNext={true} onPlay={onPlayMock}/>)
        const fifthSquare = getAllByTestId("square")[4]
        fireEvent.click(fifthSquare)
        expect(onPlayMock).toHaveBeenCalledTimes(0);
    })
})
