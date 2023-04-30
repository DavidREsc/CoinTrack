import cache from "../cache";
import { ICoinsData } from "../types";

export const getCoins = async () => {
    return new Promise<ICoinsData>(async (resolve, reject) => {
        try {
            // Check if coins are cached
            const cachedCoins = await cache.get('coins')
            if (cachedCoins) return resolve(JSON.parse(cachedCoins))
            console.log('Requesting')

            // Request top 3000 coins from Coinranking api
            const response = await fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=2500`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                    "x-rapidapi-key": process.env.API!
                }
            })
            const coinsData = await response.json()
            const data: ICoinsData = {
                stats: coinsData.data.stats,
                coins: coinsData.data.coins,
                length: coinsData.data.coins.length
            }
    
            // Cache coin data
            cache.set('coins', JSON.stringify(data), 'EX', 150)
            resolve (data)
        } catch (e) {
            reject(e)
        }
    })
}
