"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = __importDefault(require("ioredis"));
var chalk_1 = __importDefault(require("chalk"));
var cache;
if (process.env.NODE_ENV === 'production') {
    cache = new ioredis_1.default(process.env.REDIS_URL);
}
else {
    var options = {
        port: Number(process.env.REDISPORT),
        host: process.env.REDISHOST
    };
    cache = new ioredis_1.default(options);
}
cache.on('connect', function () {
    console.log(chalk_1.default.magenta.underline("Redis connection established"));
});
exports.default = cache;
