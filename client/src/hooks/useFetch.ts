import { useEffect, useState } from "react";
import axios from 'redaxios'
import { IError} from "../types";

interface IFetchResponse<T> {
    data: {
        success: boolean;
        data: T | undefined
    }
}

function useFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | undefined>()
    const [error, setError] = useState<IError>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response: IFetchResponse<T> = await axios.get(url)
                setData(response.data.data)
            } catch (e: any) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    return {data, error, loading}
}

export default useFetch;
