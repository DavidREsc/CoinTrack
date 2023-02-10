import { useEffect, useState } from "react";
import axios from 'redaxios'
import { IError} from "../types";

interface IFetchResponse {
    data: {
        success: boolean;
        data: unknown
    }
}

const useFetch = (url: string) => {
    const [data, setData] = useState<unknown>(null)
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response: IFetchResponse = await axios.get(url)
                setData(response.data.data)
            } catch (error) {
                setError((error as IError).data.error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    return {data, error, loading}
}

export default useFetch;
