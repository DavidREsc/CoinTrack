import { useEffect} from "react"
import Pagination from "./Pagination"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useCoinsContext } from "../../contexts/CoinsProvider"
import CoinTable from "./CoinTable"
import '../../styles/browse.css'

const Browse: React.FC = () => {
    const {coins} = useCoinsContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const handlePage = (page: number) => {
        window.scrollTo(0,0)
        setSearchParams({page: (page+1).toString()})
    }
    const handleCoinSelect = (uuid: string) => {
        navigate(`/dashboard/browse/${uuid}`)
    }

    return (<>
        {searchParams.get('page') &&
        <div className='browse-container'>
            <h1>Browse</h1>
            <CoinTable 
                coins={coins.coins} 
                page={+searchParams.get('page')! - 1} 
                interval={100}
                onCoinSelect={handleCoinSelect}
            />
            <Pagination 
                onPageChange={handlePage} 
                page={+searchParams.get('page')! - 1} 
                data={coins.coins} range={5} 
                interval={100}
            />
        </div>}
        </>
    )
}

export default Browse