"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinHistory = exports.getCoin = exports.getCoins = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const cache_1 = __importDefault(require("../cache"));
exports.getCoins = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if coins are cached
    let cachedCoins = yield cache_1.default.get('coins');
    if (cachedCoins) {
        return res.status(200).json({
            status: "success",
            data: JSON.parse(cachedCoins)
        });
    }
    // Request top 1000 coins from Coinranking api
    let apiRequests = [];
    for (let i = 0; i < 1; i++) {
        // Push request promises to array
        apiRequests.push(fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=3000`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                "x-rapidapi-key": process.env.API
            }
        }));
    }
    let data = {
        stats: [],
        length: 0,
        coins: [],
    };
    // Await api request concurrently and push data to data object
    const response = yield Promise.all(apiRequests);
    for (let i = 0; i < response.length; i++) {
        const responseJson = yield response[i].json();
        data.coins = [...data.coins, ...responseJson.data.coins];
        data.length += responseJson.data.coins.length;
        if (i == 0)
            data.stats = responseJson.data.stats;
    }
    // Cache coin data
    cache_1.default.set('coins', JSON.stringify(data), 'EX', 180);
    res.status(200).json({
        success: true,
        data
    });
}));
exports.getCoin = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const coinId = req.params.id;
    const response = yield fetch(`https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=24h`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key": process.env.API
        }
    });
    const coinData = yield response.json();
    res.status(200).json({
        success: true,
        data: coinData
    });
}));
exports.getCoinHistory = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, period } = req.params;
    const response = yield fetch(`https://coinranking1.p.rapidapi.com/coin/${id}/history?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=${period}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key": process.env.API
        }
    });
    const data = yield response.json();
    res.status(200).json({
        success: true,
        data
    });
}));
