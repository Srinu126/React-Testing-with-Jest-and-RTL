import {render, screen} from '@testing-library/react'
import Options from '../Options'
import {OrderDetailsProvider} from '../../../contexts/OrderDetails'

test("display img for each scoop from the server", async() => {
    render(<Options optionType="scoops" />, {wrapper: OrderDetailsProvider})
    // find images
    const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
});
test("display toppings", async() => {
    render(<Options optionType="toppings" />, {wrapper: OrderDetailsProvider})
    const toppingImages = await screen.findAllByRole("img", {name: /toppings$/i});
    expect(toppingImages).toHaveLength(3);

    const altText = toppingImages.map((element) => element.alt)
    expect(altText).toEqual(['Cherries toppings', 'M&Ms toppings', 'Hot fudge toppings'])
})