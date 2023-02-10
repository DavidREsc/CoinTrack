import LoginImg from '../../assets/login.svg'

interface LeftPanelProps {
	onBtnClick: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = (props) => {
  return (
    <div className='panel'>
			<div className='panel-signup'>
				<p>Don't have an account? </p>
				<button 
					className='auth-btn'
					onClick={props.onBtnClick}
				>Sign Up
				</button>
			</div>
			<img 
				src={LoginImg} 
				alt="" 
			/>
		</div>
  )
}

export default LeftPanel;
