import { useEffect } from 'react';
import {createContext, useContext, useState, useMemo} from 'react';
import { pricePerItem } from '../constants';

// format number as currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount)
}

const OrderDetails = createContext();

export function useOrderDetails() {
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider'
        );
    }
    return context;
}
function calculateSubTotal(optionType, optionCounts) {
    let optionCount = 0;
    for(const count of optionCounts[optionType].values()) {
        optionCount+=count;
    }
    return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map(),
    });
    const zeroCurrency = formatCurrency(0)
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    })
    useEffect(() => {
        const scoopsSubtotal = calculateSubTotal("scoops", optionCounts);
        const toppingsSubTotal = calculateSubTotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubTotal;
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubTotal),
            grandTotal: formatCurrency(grandTotal)
        })

    }, [optionCounts])
    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = {...optionCounts}
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));
            setOptionCounts(newOptionCounts)
        }
        // getter: object containing option counts for scoops and toppings, subtotals and totals
        // setter:update option counts
        return [{...optionCounts, totals},updateItemCount]
    },[optionCounts, totals])
    return <OrderDetails.Provider value={value} {...props} />
}