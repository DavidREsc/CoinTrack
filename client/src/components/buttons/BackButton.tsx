import { ButtonBack } from "../../styles/MaterialUi.styled";
import {BiArrowBack} from "react-icons/bi"

interface BackButtonProps {
    func: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({func}) => {
    return (
        <ButtonBack onClick={func}>
            <span className='back-button-icon'>
                <BiArrowBack />
            </span>
            Back
        </ButtonBack>
    )
}

export default BackButton;
