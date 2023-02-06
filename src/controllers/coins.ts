import { RequestHandler} from "express";
import asyncHandler from "../middleware/asyncHandler";
import cache from "../cache";

interface ICoinsData {
    stats: string[]
    coins: string[]
}

export const getCoins: RequestHandler = asyncHandler(async (req, res, next) => {

    // Check if coins are cached
    let cachedCoins = await cache.get('cois')
    if (cachedCoins) {
        return res.status(200).json({
            status: "success",
            data: JSON.parse(cachedCoins)
        })
    }
    // Request top 1000 coins from Coinranking api
    let apiRequests = []
    for (let i = 0; i < 10; i++) {
        // Push request promises to array
        apiRequests.push(fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=100&offset=${i*100}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                "x-rapidapi-key": process.env.API!
            }
        }))
    }

    let data: ICoinsData = {
        stats: [],
        coins: []
    }

    // Await api request concurrently and push data to data object
    const response = await Promise.all(apiRequests)
    for (let i = 0; i < response.length; i++) {
        const responseJson = await response[i].json()
        data.coins = [...data.coins, ...responseJson.data.coins]
        if (i == 0) data.stats = responseJson.data.stats
    }

    // Cache coin data
    cache.set('coins', JSON.stringify(data), 'EX', 180)

    res.status(200).json({
        status: "success",
        data
    })
})

export const getCoin: RequestHandler = asyncHandler(async (req, res, next) => {
    const coinId = req.params.id;

    const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=24h`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key": process.env.API!
        }
    })
    const coinData = await response.json()
    res.status(200).json({
        status: "success",
        data: coinData
    })
})

export const getCoinHistory: RequestHandler = asyncHandler(async (req, res, next) => {
    const {id, period} = req.params

    const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${id}/history?referenceCurrencyUuid=_4s0A3Uuu5ML&timePeriod=${period}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key": process.env.API!
        }
    });

    const data = await response.json()
    res.status(200).json({
        success: true,
        data
    });
})
