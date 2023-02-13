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
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: IFetchResponse<T> = await axios.get(url)
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
