import { ButtonSource } from "../../styles/MaterialUi.styled";

interface SourceButtonProps {
    text: string;
}

const SourceButton: React.FC<SourceButtonProps> = ({ text}) => {
    return (
        <ButtonSource variant='outlined' fullWidth type='button' 
            onClick={() => window.open('https://github.com/DavidREsc/CoinTrack', '_blank')}>
            {text} 
        </ButtonSource>
    )
}

export default SourceButton;
