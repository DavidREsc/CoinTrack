import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import useFetch from "../../hooks/useFetch";
import { IAssetTxn, IAssetTxnResponse } from "../../types";
import Decimal from "decimal.js";
import { formatValue } from "../../utils/calculations";
import TransactionsHeader from "./TransactionsHeader";
import '../../styles/transactions.css'
import TransactionsMetrics from "./TransactionsMetrics";
import TransactionsTable from "./TransactionsTable";
import { useCoinsContext } from "../../contexts/CoinsProvider";
import BackButton from "../buttons/BackButton";

const TransactionsContainer: React.FC = () => {
    const {coin_id, portfolio_id} = useParams()
    const {coinMap} = useCoinsContext()
    const {data, loading, error} = useFetch<IAssetTxnResponse>(`/api/v1/transactions/${coin_id}/${portfolio_id}`)
    const [balance, setBalance] = useState<string>()
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            const curPrice = coinMap[coin_id!].price;
            const balance = formatValue(Decimal.mul(curPrice, data.metrics.total_quantity).toString());
            setBalance(balance);
        }
    }, [data, coinMap])

    // Navigate back to portfolio
    const handleBackNav = () => navigate('/dashboard/portfolio')

    // Delete Transaction
    const deleteTransaction = () => {
        alert('Delete Transaction')
    }

    // Edit transaction
    const editTransaction = () => {
        alert("Edit Transaction")
    }

    return (
        loading ? <LoadingPage /> : error ? <ErrorPage error={error} code={400}/>
        : 
        <main>
            <TransactionsHeader coin_id={coin_id!}/>
            <BackButton func={handleBackNav}/>
            <TransactionsMetrics metrics={data!.metrics} coin_id={coin_id!} balance={balance!}/>
            <TransactionsTable 
                transactions={data!.transactions} 
                coin_id={coin_id!} 
                onDeleteTxn={deleteTransaction} 
                onEditTxn={editTransaction}
            />
        </main>
    )
}

export default TransactionsContainer;
