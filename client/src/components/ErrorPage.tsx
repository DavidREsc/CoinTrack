import {BiErrorAlt} from 'react-icons/bi'
import ErrorButtons from './buttons/ErrorButtons';
import { IError } from '../types';

interface ErrorPageProps {
    error: IError;
    code: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({error, code}) => {
    console.log(error)
    return (
        <div className='error-page'>
            <div>
                <span><BiErrorAlt /></span>
                <h1>{error.status}</h1>
            </div>
            <p>{error.data.error}</p>
            <ErrorButtons />
        </div>
    )
}

export default ErrorPage;
