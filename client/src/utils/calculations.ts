import { ITransaction } from "../types"
import Decimal from 'decimal.js'

export const calculateMetrics = (transactions: ITransaction[]) => {
    let totalHoldings = '0'; let totalInitialHoldings = '0'; let totalProfit = '0';
    let totalAmountSold = '0';
    transactions.forEach(t => {
        if (t.transaction_type == 'buy') {
            t.coin_amount_c = subtractAmountSold(t.coin_amount, t.amount_sold)
            t.profit = calculateProfit(t.coin_amount_c, t.price!, t.coin_price)
            t.holdings = calculateHoldings(t.coin_amount_c, t.price!)
            t.initial_holdings = calculateHoldings(t.coin_amount_c, t.coin_price)
        } else {
            t.coin_amount_c = '0'
            t.profit = '0'
            t.holdings = '0'
            t.initial_holdings = '0'
            totalAmountSold = Decimal.sum(totalAmountSold, Decimal.mul(t.coin_amount, t.coin_price)).toFixed() 
        }
       
        totalHoldings = Decimal.sum(totalHoldings, t.holdings).toFixed()
        totalInitialHoldings = Decimal.sum(totalInitialHoldings, t.initial_holdings).toFixed()
        totalProfit = Decimal.sum(totalProfit, t.profit).toFixed()
    })
    const totalProfitMargin = calculateProfitMargin(totalHoldings, totalInitialHoldings)
    return {totalHoldings, totalProfitMargin, totalProfit, totalAmountSold}
}

export const subtractAmountSold = (asset_amount: string, amount_sold: string | undefined) => {
    return Decimal.sub(asset_amount, amount_sold || 0).toFixed()
}

export const calculateProfit = (asset_amount: string,
    price: string, initial_price: string) => {
    const x = Decimal.sub(price, initial_price)
    return Decimal.mul(x, asset_amount).toFixed()
}

export const calculateHoldings = (asset_amount: string, price: string) => {
    return Decimal.mul(asset_amount, price).toFixed()
}

export const calculateProfitMargin = (curHoldings: string, initialHoldings: string) => {
    const x = new Decimal(curHoldings)
    const y = new Decimal(initialHoldings)
    if (x.equals(0)) return '0'

    const a = Decimal.sub(x, y)
    const b = Decimal.div(a, y)
    return Decimal.mul(b, 100).toFixed()
}

export const getAbs = (value: string, decimals: number | undefined = undefined) => {
    if (!value) return '0';
    const x = new Decimal(value)
    if (decimals) {
        return x.absoluteValue().toFixed(decimals)
    }
    return x.absoluteValue().toFixed()
}

export const getNumber = (value: string) => {
    const x = new Decimal(value)
    return x.toNumber()
}

export const formatValue = (value: string | number, price: boolean = true) => {
    if (!value) return '*'
    const x = new Decimal(value)
    if (x.greaterThanOrEqualTo(1) || x.equals(0)) {
        if (price) {
            return x.toDecimalPlaces(2).toNumber().toLocaleString(undefined, {minimumFractionDigits: 2})
        }
        return x.toNumber().toLocaleString()
    }
    return x.toSignificantDigits(4).toFixed()
}

export const lessThan = (value: string, y: string | number | Decimal) => {
    if (!value) return false;
    const x = new Decimal(value)
    return x.lessThan(y)
}
