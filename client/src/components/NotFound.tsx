import ErrorButtons from "./buttons/ErrorButtons";

const NotFound: React.FC = () => {
    return(
        <div className='not-found-container'>
            <h2>404</h2>
            <h1>Page not found</h1>
            <p>The page you're looking for doesn't exist</p>
            <ErrorButtons />
        </div>
    )
}

export default NotFound;
