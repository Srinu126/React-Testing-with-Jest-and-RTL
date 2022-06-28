import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import Form from './Form'
import userEvent from '@testing-library/user-event'

test("initial status of checkbox and button", () => {
    render(<Form/>)
    const submitButton = screen.getByRole("button", {name: 'Submit Order'})
    const checkbox = screen.getByRole("checkbox", {name: 'I agree to terms and conditions'})
    expect(checkbox).not.toBeChecked();
    expect(submitButton).toBeDisabled();
})
test("Disabling the button on checking the checkbox",() => {
    render(<Form/>)
    const submitButton = screen.getByRole("button", {name:'Submit Order'});
    const checkbox = screen.getByRole("checkbox", {name: "I agree to terms and conditions"});
    userEvent.click(checkbox)
    expect(submitButton).toBeEnabled();
    userEvent.click(checkbox)
    expect(submitButton).toBeDisabled()
})
test("popover response to hover", async() => {
    //popover starts out hidden
    render(<Form />)
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    //popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    //popover disappers when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>screen.queryByText(/no ice cream will actually be delivered/i));
})