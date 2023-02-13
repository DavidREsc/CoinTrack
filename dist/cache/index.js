"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const chalk_1 = __importDefault(require("chalk"));
let cache;
if (process.env.NODE_ENV === 'production') {
    cache = new ioredis_1.default(process.env.REDIS_URL);
}
else {
    const options = {
        port: Number(process.env.REDISPORT),
        host: process.env.REDISHOST
    };
    cache = new ioredis_1.default(options);
}
cache.on('connect', () => {
    console.log(chalk_1.default.magenta.underline("Redis connection established"));
});
exports.default = cache;
