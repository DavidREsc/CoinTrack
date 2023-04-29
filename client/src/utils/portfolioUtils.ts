import { getLocalStorageItem } from "./localStorage";
import { IPortfolioData, ITransaction, ICoinMap, IPortfolioStats, IPortfolio, IPortfoliosData } from "../types";
import Decimal from 'decimal.js'
import { calculateProfitMargin, formatValue } from "./calculations";
import { calculateMetrics } from "./calculations";
import Map from "./Map";

export const getLastViewedPortfolioId = (portfolios: IPortfolioData[]) => {
    const portfolioId = getLocalStorageItem('portfolioId')
    let lastViewedPortfolioId: number | undefined
    if (portfolioId) {
        lastViewedPortfolioId = portfolios.find
            (p => p.portfolio_id === +portfolioId)?.portfolio_id
    }
    if (!lastViewedPortfolioId) {
        lastViewedPortfolioId = portfolios.find
            (p => p.portfolio_name === 'Main')!.portfolio_id
    }
    return lastViewedPortfolioId
}

export const getCurrentPortfolioTransactions = (portfolio_id: number, transactions: ITransaction[]) => {
    const curTransactions = transactions.filter(t => {
        return t.portfolio_id === portfolio_id
    })
    return curTransactions
}

export const mergeTransactionsWithCoinData = (transactions: ITransaction[], coinMap: ICoinMap) => {
    transactions.forEach(t => {
        const uuid = t.coin_id
        t.price = coinMap[uuid].price
        t.name = coinMap[uuid].name
        t.iconUrl = coinMap[uuid].iconUrl
        t.change = coinMap[uuid].change
        t.symbol = coinMap[uuid].symbol
    })
}

export const mergeTransactions = (transactions: ITransaction[]) => {
    let mergedTransactions = transactions.reduce((accumulator: ITransaction[], cur) => {
        let uuid = cur.coin_id, found = accumulator.find((elem: ITransaction) => {
            return elem.coin_id === uuid
        });
        if (found) {
            found.profit! = Decimal.sum(found.profit!, cur.profit || '0').toFixed()
            found.holdings! = Decimal.sum(found.holdings!, cur.holdings || '0').toFixed()
            found.coin_amount_c = Decimal.sum(found.coin_amount_c!, cur.coin_amount_c!).toFixed()
            found.initial_holdings! = Decimal.sum(found.initial_holdings!, cur.initial_holdings || '0').toFixed()
        }
        else {
            accumulator.push({...cur})
        }
        return accumulator;
    }, []);
    mergedTransactions.forEach(t => {
        t.profitMargin = calculateProfitMargin(t.holdings || '0', t.initial_holdings || '0')
    })
    return mergedTransactions;
}

// Stores the buy transactions into a 
// hashmap of queues which is used as a lookup to sum the capital gains
export const calculateCapitalGains = (buy_tnx: ITransaction[], sell_tnx: ITransaction[]) => {
    const map = new Map()

    buy_tnx.forEach(t => {
        t.amount_sold = '0'
        map.set(t.coin_id, {amount: t.coin_amount, price: t.coin_price, t})
    })
    let capitalGains = '0'
    sell_tnx.forEach(t => {
        capitalGains = Decimal.sum(capitalGains, map.sell(t.coin_id, {amount: t.coin_amount,
             price: t.coin_price, date: t.transaction_date})).toFixed()
    })
    return capitalGains
}

// Creates a new portfolio object
export const createPortfolioObject = (buyTnx: ITransaction[], sellTnx: ITransaction[], id: number) => {
    const capital_gains = calculateCapitalGains(buyTnx, sellTnx)
    const tnx = buyTnx.concat(sellTnx)
    const {totalProfit, totalHoldings, totalProfitMargin, totalAmountSold} = calculateMetrics(tnx)
    const merged_tnx = mergeTransactions(tnx)
    const stats: IPortfolioStats = {
        total_profit: totalProfit,
        total_holdings: totalHoldings,
        total_profit_margin: totalProfitMargin,
        total_amount_sold: totalAmountSold,
        capital_gains
    }
    const portfolio: IPortfolio = {
        id,
        buy_tnx: buyTnx,
        sell_tnx: sellTnx,
        stats,
        mergedTransactions: merged_tnx
    }  
    return portfolio  
}

export const initNewPortfolioObj = (data: IPortfoliosData, pfl_id: number, coinMap: ICoinMap) => {
    const cur_pfl_buy_tnx = getCurrentPortfolioTransactions(pfl_id, data.buyTransactions)
    const cur_pfl_sell_tnx = getCurrentPortfolioTransactions(pfl_id, data.sellTransactions)
    mergeTransactionsWithCoinData(cur_pfl_buy_tnx, coinMap)
    mergeTransactionsWithCoinData(cur_pfl_sell_tnx, coinMap)
    return createPortfolioObject(cur_pfl_buy_tnx, cur_pfl_sell_tnx, pfl_id)
}

// Handles adding a new transaction to the portfolio object
export const handleAddTnx = (pfl: IPortfolio, tnx: ITransaction, coinMap: ICoinMap) => {
    let new_pfl_tnx;
    mergeTransactionsWithCoinData([tnx], coinMap)
    tnx.transaction_type === 'buy' ? 
        new_pfl_tnx = [...pfl.buy_tnx, ...[tnx]] :
        new_pfl_tnx = [...pfl.sell_tnx, ...[tnx]]
    sortTnx(new_pfl_tnx)
    if (tnx.transaction_type === 'buy') return createPortfolioObject(new_pfl_tnx, pfl.sell_tnx, pfl.id)
    return createPortfolioObject(pfl.buy_tnx, new_pfl_tnx, pfl.id)
}

// Handles deleting all transactions of a particular coin from the portfolio object
export const handleDeleteAsset = (pfl: IPortfolio, coin_id: string) => {
    const new_pfl_buy_tnx = pfl.buy_tnx.filter(t => {
        return t.coin_id !== coin_id
    })
    const new_pfl_sell_tnx = pfl.sell_tnx.filter(t => {
        return t.coin_id !== coin_id
    })
    return createPortfolioObject(new_pfl_buy_tnx, new_pfl_sell_tnx, pfl.id)
}

// Sorts transactions by date earliest to latest
export const sortTnx = (tnx: ITransaction[]) => {
    tnx.sort((a,b) => new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime())
}
