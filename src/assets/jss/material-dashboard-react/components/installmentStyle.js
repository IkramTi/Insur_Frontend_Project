const installmentStyle = () => ({
	installmentCard: {
		backgroundColor: '#fff',
		borderRadius: '1rem',
		cursor: 'pointer',
		boxShadow: '0 2px 2px 0 rgba(0,0,0,0.1)',
		transform: 'scale(0.95)',
		'&:hover': {
			backgroundColor: '#eee',
			boxShadow: '0 2px 2px 0 rgba(0,0,0,0.2)',
			transform: 'scale(1)',
			transition: 'opacity 300ms',
		},
		'&:hover .installment-header': {
			color: 'rgba(0,0,0,0.54)',
		},
		'&:hover .installment-body': {
			color: 'rgba(0,0,0,0.54)',
		},
	},
	installmentCardSelected: {
		color: '#FFF',
		backgroundColor: '#046ead',
		borderRadius: '1rem',
		cursor: 'pointer',
		boxShadow: '0 2px 2px 0 rgba(0,0,0,0.2)',
	},
	installmentHeader: {
		color: 'rgba(0,0,0,0.54)',
		padding: '1rem',
		fontSize: '1.5rem',
	},
	installmentHeaderSelected: {
		color: '#fff',
		padding: '1rem',
	},
	installmentBody: {
		color: 'rgba(0,0,0,0.54)',
	},
	installmentBodySelected: {
		color: '#fff',
	},
	calendarIcon: {
		width: '100%',
		height: '100%',
	},
});

export default installmentStyle;
