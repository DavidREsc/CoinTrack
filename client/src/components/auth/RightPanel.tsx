import SignupImg from '../../assets/signup.svg'

interface RightPanelProps {
    onBtnClick: () => void
}

const RightPanel: React.FC<RightPanelProps> = (props) => {
    return (
        <div className='panel'>
			<div className='panel-signup'>
				<p>Already have an account? </p>
				<button 
					className='auth-btn'
					onClick={props.onBtnClick}
				>Login
				</button>
			</div>
			<img 
				src={SignupImg} 
				alt="" 
			/>
		</div>
    )
}

export default RightPanel