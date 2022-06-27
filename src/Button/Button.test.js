import {render, screen, fireEvent} from '@testing-library/react';
import Button from './Button';
import {replaceCamelWithSpaces} from './Button'
test("button has correct initial color", () => {
    render(<Button/>)
    const colorButton = screen.getByRole('button', {name: 'Change to Blue'})
    expect(colorButton).toHaveStyle({backgroundColor: 'red'})
    fireEvent.click(colorButton)
    expect(colorButton).toHaveStyle({backgroundColor: 'blue'})
    expect(colorButton.textContent).toBe('Change to Red')
});

test("initial state of button and checkbox", () => {
    render(<Button/>);
    const inputElement = screen.getByRole('checkbox', {name: 'Disable button'})
    expect(inputElement).not.toBeChecked();
    const colorButton = screen.getByRole('button', {name:'Change to Blue'})
    expect(colorButton).toBeEnabled();
});
test("checkbox disables button on first click and enables button on second click", () => {
    render(<Button />)
    const inputElement=screen.getByRole('checkbox', {name: 'Disable button'})
    const colorButton = screen.getByRole('button', {name: 'Change to Blue'})
    fireEvent.click(inputElement)
    expect(colorButton).toBeDisabled();
    fireEvent.click(inputElement)
    expect(colorButton).toBeEnabled()
});
test("button color turns gray when disabled", () => {
    render(<Button />)
    const colorButton = screen.getByRole('button', {name: 'Change to Blue'});
    const inputElement = screen.getByRole('checkbox', {name: 'Disable button'});
    fireEvent.click(inputElement)
    expect(colorButton).toHaveStyle({backgroundColor: 'gray'})
});
describe("spaces before camel-case capital letters", () => {
    test("works for no inner capital letters", () => {
        expect(replaceCamelWithSpaces("Red")).toBe("Red")
    });
    test("works for one inner capital letter", () => {
        expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue")
    });
    test("works for multiple inner capital letters", () => {
        expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red")
    });
});
