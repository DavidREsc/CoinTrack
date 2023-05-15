"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumber = exports.calculateMetrics = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const calculateMetrics = (transactions) => {
    let averageBuyPrice = new decimal_js_1.default('0');
    let averageSellPrice = new decimal_js_1.default('0');
    let buyQuantity = new decimal_js_1.default('0');
    let sellQuantity = new decimal_js_1.default('0');
    let buyCount = 0;
    let sellCount = 0;
    transactions.forEach((t) => {
        if (t.transaction_type === 'buy') {
            averageBuyPrice = decimal_js_1.default.sum(averageBuyPrice, t.coin_price);
            buyQuantity = decimal_js_1.default.sum(buyQuantity, t.coin_amount);
            buyCount++;
        }
        else {
            averageSellPrice = decimal_js_1.default.sum(averageSellPrice, t.coin_price);
            sellQuantity = decimal_js_1.default.sum(sellQuantity, t.coin_amount);
            sellCount++;
        }
        t.dollar_amount = exports.formatNumber(decimal_js_1.default.mul(t.coin_amount, t.coin_price));
        t.coin_price = exports.formatNumber(new decimal_js_1.default(t.coin_price));
        t.coin_amount = new decimal_js_1.default(t.coin_amount).toFixed();
    });
    let totalQuantity = decimal_js_1.default.sub(buyQuantity, sellQuantity);
    totalQuantity = totalQuantity.isNegative() ? new decimal_js_1.default('0') : totalQuantity;
    averageBuyPrice = decimal_js_1.default.div(averageBuyPrice, buyCount || 1);
    averageSellPrice = decimal_js_1.default.div(averageSellPrice, sellCount || 1);
    return {
        total_quantity: totalQuantity.toFixed(),
        average_buy_price: exports.formatNumber(averageBuyPrice),
        average_sell_price: exports.formatNumber(averageSellPrice)
    };
};
exports.calculateMetrics = calculateMetrics;
const formatNumber = (num, price = true) => {
    if (num.greaterThanOrEqualTo(1) || num.equals(0)) {
        if (price) {
            return num.toDecimalPlaces(2).toNumber().toLocaleString(undefined, { minimumFractionDigits: 2 });
        }
        return num.toNumber().toLocaleString();
    }
    return num.toSignificantDigits(4).toFixed();
};
exports.formatNumber = formatNumber;
