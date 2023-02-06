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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinHistory = exports.getCoin = exports.getCoins = void 0;
var asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
var cache_1 = __importDefault(require("../cache"));
exports.getCoins = (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cachedCoins, apiRequests, i, data, response, i, responseJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cache_1.default.get('cois')];
            case 1:
                cachedCoins = _a.sent();
                if (cachedCoins) {
                    return [2 /*return*/, res.status(200).json({
                            status: "success",
                            data: JSON.parse(cachedCoins)
                        })];
                }
                apiRequests = [];
                for (i = 0; i < 10; i++) {
                    // Push request promises to array
                    apiRequests.push(fetch("https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=100&offset=".concat(i * 100), {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                            "x-rapidapi-key": process.env.API
                        }
                    }));
                }
                data = {
                    stats: [],
                    coins: []
                };
                return [4 /*yield*/, Promise.all(apiRequests)];
            case 2:
                response = _a.sent();
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < response.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, response[i].json()];
            case 4:
                responseJson = _a.sent();
                data.coins = __spreadArray(__spreadArray([], data.coins, true), responseJson.data.coins, true);
                if (i == 0)
                    data.stats = responseJson.data.stats;
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                // Cache coin data
                cache_1.default.set('coins', JSON.stringify(data), 'EX', 180);
                res.status(200).json({
                    status: "success",
                    data: data
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getCoin = (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var coinId, response, coinData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coinId = req.params.id;
                return [4 /*yield*/, fetch("https://coinranking1.p.rapidapi.com/coin/".concat(coinId, "?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=24h"), {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                            "x-rapidapi-key": process.env.API
                        }
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                coinData = _a.sent();
                res.status(200).json({
                    status: "success",
                    data: coinData
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getCoinHistory = (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, period, response, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, id = _a.id, period = _a.period;
                return [4 /*yield*/, fetch("https://coinranking1.p.rapidapi.com/coin/".concat(id, "/history?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=").concat(period), {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                            "x-rapidapi-key": process.env.API
                        }
                    })];
            case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _b.sent();
                res.status(200).json({
                    success: true,
                    data: data
                });
                return [2 /*return*/];
        }
    });
}); });
