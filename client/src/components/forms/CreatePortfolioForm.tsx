import { PflData } from "../../types";

import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextFieldTransaction } from "../../styles/MaterialUi.styled"
import SubmitBtn from "../buttons/SubmitBtn"

interface CreatePortfolioFormProps {
    func: (data: PflData) => void;
    loading: boolean;
}

const pflSchema = yup.object().shape({
    portfolio_name: yup.string()
        .required('Portfolio name is required')
        .max(32, 'Name must be 32 characters or less')
})

const CreatePortfolioForm: React.FC<CreatePortfolioFormProps> = ({func, loading}) => {
    const {handleSubmit, control} = useForm<PflData>({
        resolver: yupResolver(pflSchema)
    })
    return (
        <form className='form' onSubmit={handleSubmit(func)}>

            <Controller 
                control={control}
                name='portfolio_name'
                defaultValue=""
                render={({ field: {onChange, value}, fieldState: {error} }) => (
                    <TextFieldTransaction
                        inputRef={input => input && input.focus()}
                        type='string'
                        fullWidth
                        error={!!error}
                        label='Portfolio Name'
                        variant='outlined'
                        autoComplete='off'
                        onChange={onChange}
                        value={value}
                        helperText={error ? error.message : null}
                        autoFocus
                    />
                )}
            />
            <SubmitBtn 
                text='Create Porfolio'
                loading={loading}
            />
        </form>
    )
}

export default CreatePortfolioForm
