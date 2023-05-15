import Decimal from 'decimal.js'
import { ITransactionWithIdData, ITransactionsMetrics } from '../types';

export const calculateMetrics = (transactions: ITransactionWithIdData[]): ITransactionsMetrics => {
    let averageBuyPrice = new Decimal('0');
    let averageSellPrice = new Decimal('0');
    let buyQuantity = new Decimal('0');
    let sellQuantity = new Decimal('0');
    let buyCount = 0
    let sellCount = 0
    transactions.forEach((t: ITransactionWithIdData) => {
        if (t.transaction_type === 'buy') {
            averageBuyPrice = Decimal.sum(averageBuyPrice, t.coin_price);
            buyQuantity = Decimal.sum(buyQuantity, t.coin_amount);
            buyCount++;
        } else {
            averageSellPrice = Decimal.sum(averageSellPrice, t.coin_price);
            sellQuantity = Decimal.sum(sellQuantity, t.coin_amount);
            sellCount++;
        }
        t.dollar_amount = formatNumber(Decimal.mul(t.coin_amount, t.coin_price));  
        t.coin_price = formatNumber(new Decimal(t.coin_price));
        t.coin_amount = new Decimal(t.coin_amount).toFixed();
    })
    let totalQuantity = Decimal.sub(buyQuantity, sellQuantity);
    totalQuantity = totalQuantity.isNegative() ? new Decimal('0') : totalQuantity
    averageBuyPrice = Decimal.div(averageBuyPrice, buyCount || 1);
    averageSellPrice = Decimal.div(averageSellPrice, sellCount || 1);
    return {
        total_quantity: totalQuantity.toFixed(),
        average_buy_price: formatNumber(averageBuyPrice),
        average_sell_price: formatNumber(averageSellPrice)
    };
}

export const formatNumber = (num: Decimal, price: boolean = true) => {
    if (num.greaterThanOrEqualTo(1) || num.equals(0)) {
        if (price) {
            return num.toDecimalPlaces(2).toNumber().toLocaleString(undefined, {minimumFractionDigits: 2})
        }
        return num.toNumber().toLocaleString()
    }
    return num.toSignificantDigits(4).toFixed()
}
