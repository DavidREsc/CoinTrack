import {BiErrorAlt} from 'react-icons/bi'
import ErrorButtons from './buttons/ErrorButtons';

interface ErrorPageProps {
    error: string;
    code: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({error, code}) => {
    return (
        <div className='error-page'>
            <div>
                <span><BiErrorAlt /></span>
                <h1>{code}</h1>
            </div>
            <p>{error}</p>
            <ErrorButtons />
        </div>
    )
}

export default ErrorPage;
