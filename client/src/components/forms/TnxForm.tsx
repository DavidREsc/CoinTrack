import {BiArrowBack} from 'react-icons/bi'
import {MdClose} from 'react-icons/md'
import { ICoin } from '../../types';
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as yup from 'yup'
import { blue } from '@mui/material/colors';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from './DateInput';
import InputAdornment from '@mui/material/InputAdornment';
import {BsCurrencyDollar} from 'react-icons/bs'
import { TextFieldTransaction } from '../../styles/MaterialUi.styled';
import SubmitBtn from '../buttons/SubmitBtn';
import { TnxData } from '../../types';

interface TnxFormProps {
    selected: ICoin;
		loading: boolean;
		onSubmitTnx: (data: TnxData) => void;
		handleClose: () => void
		handleBack: () => void
}

const tnxSchema = yup.object().shape({
  coin_amount: yup.number()
    .required('Quantity is required')
    .positive('Quantity must be greater than 0')
    .typeError('Quantity is required'),
  coin_price: yup.number()
    .required('Price is required')
    .positive('Price must be greater than 0')
    .typeError('Price is required')
})


const TnxForm: React.FC<TnxFormProps> = ({selected, loading, onSubmitTnx, handleClose, handleBack}) => {
    const {handleSubmit, control} = useForm<TnxData>({
        resolver: yupResolver(tnxSchema)
    })
		const curDate = new Date()

    return (
      <form className='form' onSubmit={handleSubmit(onSubmitTnx)}>
        <div className='form-top'>
            <button onClick={handleBack} type='button'><BiArrowBack /></button>
            <h2>Add Transaction</h2>
            <button onClick={handleClose} type='button'><MdClose /></button>
        </div>
        <div className='selected'>
            <img src={selected.iconUrl}/>
            <p>{selected.name}</p>
        </div>
				<div className='tnx-type-input'>
					<Controller
            name={'transaction_type'}
            control={control}
            defaultValue="buy"
            render={({field: {onChange, value}}) => (
              <RadioGroup value={value} onChange={onChange} style={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
                <FormControlLabel
                  value={'buy'}
                  label={'Buy'}
                  control={<Radio sx={{color: blue[800]}}/>}
                />
                <FormControlLabel
                  value={'sell'}
                  label={'Sell'}
                  control={<Radio sx={{color: blue[800]}}/>}
                />
              </RadioGroup>
            )}
            />
				</div>
				<div className='tnx-date-input'>
					<label>Date</label>
          <Controller
            control={control}
            name="transaction_date"
            defaultValue={curDate}
            render={({ field: { onChange, value, ref } }) => (
              <ReactDatePicker
                onChange={onChange}
                selected={value}
								customInput={<DateInput onClick={onChange} value={value}/>}
              />
            )}
          />
				</div>
							
				<div>
				<Controller 
            control={control}
            name='coin_amount'
            defaultValue=""
            render={({ field: {onChange, value}, fieldState: {error} }) => (
              <TextFieldTransaction
                inputRef={input => input && input.focus()}
                type='number'
                placeholder='0.00'
                fullWidth
                error={!!error}
                label='Quantity'
                variant='outlined'
                autoComplete='off'
                onChange={onChange}
                value={value}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller 
            control={control}
            name='coin_price'
            defaultValue={selected.price}
            render={({ field: {onChange, value}, fieldState: {error} }) => (
              <TextFieldTransaction
                type='number'
                placeholder='0.00'
                fullWidth
                error={!!error}
                label='Price per coin'
                variant='outlined'
                autoComplete='off'
                onChange={onChange}
                value={value}
                helperText={error ? error.message : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsCurrencyDollar />
                      </InputAdornment>
                  ),
                }}
              />
            )}
          />
				</div>
				<div className='tnx-submit'>
          <SubmitBtn text='Submit Transaction' loading={loading}/>
        </div>
      </form>
    )
}

export default TnxForm;
