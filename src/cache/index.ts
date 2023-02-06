import Redis, { RedisOptions } from 'ioredis'
import chalk from 'chalk'

let cache: Redis;
if (process.env.NODE_ENV! === 'production') {
    cache = new Redis(process.env.REDIS_URL!)
} else {
    const options: RedisOptions = {
        port: Number(process.env.REDISPORT),
        host: process.env.REDISHOST
    }
    cache = new Redis(options)
}
cache.on('connect', () => {
    console.log(chalk.magenta.underline("Redis connection established"))
})

export default cache;
