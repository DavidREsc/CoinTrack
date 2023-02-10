import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ISignupData } from '../../types'

const loginSchema = yup.object().shape({
	email: yup.string()
		.email('Invalid email')
		.required('Email is required'),
	password: yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters'),
    confirm_password: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match')
})

interface SignupFormProps {
	onSubmit: (data: ISignupData) => void
	onError: string;
}

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const {register, handleSubmit, formState: {errors}} = useForm<ISignupData>({
		resolver: yupResolver(loginSchema)
	})
  const {onError} = props;

  return (
		<form 
			className='auth-form signup'
      		onSubmit={handleSubmit(props.onSubmit)}
		>
			<h2>Signup</h2>
			<p>{onError}</p>
			<div className='auth-input-container'>
				<label htmlFor='email-input'>Email</label>
				<input
					className='auth-input'
					id='email-input'
					{...register('email')}
					autoComplete='off'
				/>
				<p>{errors.email?.message}</p>
			</div>
			<div className='auth-input-container'>
			<label htmlFor='password-input'>Password</label>
				<input
					className='auth-input'
					id='password-input'
					{...register('password', {required: true})}
					autoComplete='off'
					type='password'
				/>
				<p>{errors.password?.message}</p>	
			</div>
            <div className='auth-input-container'>
			<label htmlFor='confirm-password-input'>Confirm Password</label>
				<input
					className='auth-input'
					id='confirm-password-input'
					{...register('confirm_password', {required: true})}
					autoComplete='off'
					type='password'
				/>
				<p>{errors.confirm_password?.message}</p>	
			</div>
            
			<input 
				className='auth-submit-btn'
				type='submit'
			/>
		</form>
	)
}

export default SignupForm