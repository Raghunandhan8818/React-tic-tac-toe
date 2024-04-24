import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from '../components/Square';

describe('Square Component', () => {
    it('renders with the correct value', () => {
        const { getByTestId } = render(<Square value="X" />);
        const squareButton = getByTestId('square');
        expect(squareButton.textContent).toBe("X");
    });

    it('calls the onClick handler when clicked', () => {
        const onClickMock = jest.fn();
        const { getByTestId } = render(<Square value="X" onSquareClick={onClickMock} />);
        const squareButton = getByTestId('square');
        fireEvent.click(squareButton);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
