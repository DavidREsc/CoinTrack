import { getLocalStorageItem } from "./localStorage";
import { IPortfolioData, ITransaction, ICoinMap, IPortfolioStats, IPortfolio, IPortfoliosData } from "../types";
import Decimal from 'decimal.js'
import { calculateProfitMargin, formatValue } from "./calculations";
import { calculateMetrics } from "./calculations";

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
            found.profit! = Decimal.sum(found.profit!, cur.profit!).toFixed()
            found.holdings! = Decimal.sum(found.holdings!, cur.holdings!).toFixed()
            found.coin_amount = Decimal.sum(found.coin_amount!, cur.coin_amount!).toFixed()
            found.initial_holdings! = Decimal.sum(found.initial_holdings!, cur.initial_holdings!).toFixed()
        }
        else accumulator.push({...cur})
        return accumulator;
    }, []);
    mergedTransactions.forEach(t => {
        t.profitMargin = calculateProfitMargin(t.holdings!, t.initial_holdings!)
    })
    
    return mergedTransactions;
}

export const createPortfolioObject = (portfolio_id: number, buy_tnx: ITransaction[], sell_tnx: ITransaction[],
    mergedTransactions: ITransaction[], total_profit: string, total_holdings: string,
    total_profit_margin: string, total_amount_sold: string) => {

    const stats: IPortfolioStats = {
        total_profit,
        total_holdings: formatValue(total_holdings),
        total_profit_margin,
        total_amount_sold: formatValue(total_amount_sold)
    }
    const portfolio: IPortfolio = {
        id: portfolio_id,
        buy_tnx,
        sell_tnx,
        stats,
        mergedTransactions
    }  
    return portfolio  
}

export const initNewPortfolioObj = (data: IPortfoliosData, pfl_id: number, coinMap: ICoinMap) => {
    const cur_pfl_buy_tnx = getCurrentPortfolioTransactions(pfl_id, data.buyTransactions)
    const cur_pfl_sell_tnx = getCurrentPortfolioTransactions(pfl_id, data.sellTransactions)
    mergeTransactionsWithCoinData(cur_pfl_buy_tnx, coinMap)
    const {totalProfit, totalHoldings, totalProfitMargin, totalAmountSold} = calculateMetrics(cur_pfl_buy_tnx)
    const merged_tnx = mergeTransactions(cur_pfl_buy_tnx)
    const newPortfolio = createPortfolioObject(pfl_id, cur_pfl_buy_tnx, cur_pfl_sell_tnx,
        merged_tnx, totalProfit, totalHoldings, totalProfitMargin, totalAmountSold)

    return newPortfolio
}

export const updatePortfolioObj = (pfl: IPortfolio, tnx: ITransaction, coinMap: ICoinMap) => {
    let new_pfl_tnx;
    if (tnx.transaction_type === 'buy') {
        mergeTransactionsWithCoinData([tnx], coinMap)
        new_pfl_tnx = [...pfl.buy_tnx, ...[tnx]]
        const {totalProfit, totalHoldings, totalProfitMargin, totalAmountSold} = 
            calculateMetrics(new_pfl_tnx)
        const merged_tnx = mergeTransactions(new_pfl_tnx)
        return createPortfolioObject(pfl.id, new_pfl_tnx, pfl.sell_tnx,
            merged_tnx, totalProfit, totalHoldings, totalProfitMargin, totalAmountSold)
    }
    else new_pfl_tnx = [...pfl.sell_tnx, ...[tnx]]
    return createPortfolioObject(pfl.id, pfl.buy_tnx, new_pfl_tnx,
        pfl.mergedTransactions, pfl.stats.total_profit, pfl.stats.total_holdings,
        pfl.stats.total_profit_margin, pfl.stats.total_amount_sold)
}

export const updatePflObjDeleteAsset = (pfl: IPortfolio, coin_id: string) => {
    const new_pfl_buy_tnx = pfl.buy_tnx.filter(t => {
        return t.coin_id !== coin_id
    })
    const new_pfl_sell_tnx = pfl.sell_tnx.filter(t => {
        return t.coin_id !== coin_id
    })
    const {totalProfit, totalHoldings, totalProfitMargin, totalAmountSold} = 
    calculateMetrics(new_pfl_buy_tnx)
    const merged_tnx = mergeTransactions(new_pfl_buy_tnx)
    return createPortfolioObject(pfl.id, new_pfl_buy_tnx, new_pfl_sell_tnx,
        merged_tnx, totalProfit, totalHoldings, totalProfitMargin, totalAmountSold)
}
