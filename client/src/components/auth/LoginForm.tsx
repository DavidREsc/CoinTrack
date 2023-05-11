import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ILoginData } from '../../types'
import SignInBtn from '../buttons/SignInBtn'
import DemoButton from '../buttons/DemoBtn'
import SourceButton from '../buttons/SourceBtn'

const loginSchema = yup.object().shape({
	email: yup.string()
		.email('Invalid email')
		.required('Email is required'),
	password: yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
})

interface LoginFormProps {
	onSubmit: (data: ILoginData) => void
	onDemoLogin: () => void
	onError: string;
	loading: boolean;
	demoLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const {register, handleSubmit, formState: {errors}} = useForm<ILoginData>({
		resolver: yupResolver(loginSchema)
	})
  const {onError, loading, demoLoading, onDemoLogin} = props;

  return (
		<form 
			className='auth-form'
      		onSubmit={handleSubmit(props.onSubmit)}
		>
			<h2>Login</h2>
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
			<div className='auth-submit-btn'>
				<SignInBtn text={'login'} loading={loading} />
				<DemoButton text={'demo'} loading={demoLoading} func={onDemoLogin}/>
				<SourceButton text={'source'}/>
			</div>
		</form>
	)
}

export default LoginForm