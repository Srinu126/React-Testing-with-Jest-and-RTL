import axios from 'axios';
import { useEffect, useState } from 'react'
import ScoopOptions from './ScoopOptions';
import ToppingOptions from './ToppingOptions';
import Row from 'react-bootstrap/Row';
export default function Options({optionType}) {
    const [items, setItems] = useState([])
    // optionType is "scoops" or "toppings"
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then(response => setItems(response.data))
        .catch(error => console.log(error))
    },[optionType])

    const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions

    const optionItems = items.map((item) => {
        return <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    })

    return <Row>{optionItems}</Row>
}