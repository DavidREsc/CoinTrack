import TextField from '@mui/material/TextField'
import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'

export const TextFieldSearch = styled(TextField)({
	"& label": {
		color: "#00bcd4"
	  },
	  "&:hover label": {
		fontWeight: 700
	  },
	  "& label.Mui-focused": {
		color: "#00bcd4"
	  },
	  "& .MuiInput-underline:after": {
		borderBottomColor: "#01579b"
	  },
	  "& .MuiOutlinedInput-root": {
		"& fieldset": {
		  borderColor: "#01579b"
		},
		"&:hover fieldset": {
		  borderColor: "#01579b",
		  borderWidth: 2
		},
		"&.Mui-focused fieldset": {
		  borderColor: "#01579b"
		},
		  input: {color:'black'},
		  fontSize: '1.2rem'
	  },
})

export const TextFieldTransaction = styled(TextField)({
	"& label": {
	  color: "var(--color-primary)",
	  fontSize: '1.1em'
	},
	"&:hover label": {
	  fontWeight: 700
	},
	"& label.Mui-focused": {
	  color: "var(--color-primary)",
	  fontSize: '1.2rem'
	},
	"& .MuiInput-underline:after": {
	  borderBottomColor: "var(--color-primary)"
	},
	"& .MuiOutlinedInput-root": {
	  "& fieldset": {
		borderColor: "var(--color-primary)"
	  },
	  "&:hover fieldset": {
		borderColor: "var(--color-primary)",
		borderWidth: 2
	  },
	  "&.Mui-focused fieldset": {
		borderColor: "var(--color-primary)"
	  },
		input: {color:'var(--color-dark)'},
		fontSize: '1.1rem'
	},
	height: '5.8rem'
});

export const SubmitButton = styled(Button)({
	color: 'hsl(151, 100%, 37%)',
	border: '1px solid 	hsl(145, 100%, 35%)',
	'&:hover': {
		color: 'hsl(151, 100%, 45%)',
		border: '1px solid 	hsl(145, 100%, 45%)',
		backgroundColor: 'rgba(0, 230, 118, 0.1)'
	},
	padding: '1rem'
})

export const ButtonDelete = styled(Button)({
	color: 'var(--color-info-light)',
	border: '1px solid #ff3333',
	backgroundColor: 'rgba(145, 17, 8, 0.7)',
	'&:hover': {
		color: '#CCC',
		border: '1px solid #ff3333',
		backgroundColor: 'rgba(145, 17, 8, 0.7)',

	},
	padding: '0.8rem',
	borderRadius: '30px'
})

export const CancelButton = styled(Button)({
	color: 'var(--color-dark)',
	border: '1px solid #757575',
	backgroundColor: 'rgba(117, 117, 117, 0.1)',
	'&:hover': {
		color: '#bdbdbd',
		border: '1px solid #757575',
		backgroundColor: 'hsl(0, 0%, 15%)',
	},
	padding: '0.8rem',
	borderRadius: '30px'
})