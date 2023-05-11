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
exports.getCoins = void 0;
const cache_1 = __importDefault(require("../cache"));
const getCoins = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check if coins are cached
            console.log("cache");
            const cachedCoins = yield cache_1.default.get('coins');
            if (cachedCoins)
                return resolve(JSON.parse(cachedCoins));
            console.log('Requesting');
            // Request top 3000 coins from Coinranking api
            const response = yield fetch(`https://api.coinranking.com/v2/coins?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=2000`, {
                "method": "GET",
                "headers": {
                    "x-access-token": process.env.API
                }
            });
            console.log(response);
            const coinsData = yield response.json();
            console.log("here");
            const data = {
                stats: coinsData.data.stats,
                coins: coinsData.data.coins,
                length: coinsData.data.coins.length
            };
            // Cache coin data
            cache_1.default.set('coins', JSON.stringify(data), 'EX', 150);
            resolve(data);
        }
        catch (e) {
            reject(e);
        }
    }));
});
exports.getCoins = getCoins;
