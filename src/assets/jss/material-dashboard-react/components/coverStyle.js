const coverStyle = (theme) => ({
	coverCard: {
		transform: 'scale(0.98)',
		transition: '0.3s ease-in-out',
		'&:hover': {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			cursor: 'pointer',
			boxShadow: '0 2px 2px 0 rgba(0,0,0,0.1)',
			transform: 'scale(1)',
			transition: 'opacity 300ms',
		},
		'&:hover .image': {
			transform: 'scale(1)',
		},
	},
	image: {
		transform: 'scale(0.8)',
		transition: '0.3s ease-in-out',
		fontSize: '7rem',
	},
	coverCardSelected: {
		border: '1px solid #046ead',
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.grey[700]
				: theme.palette.grey[200],
		fontSize: '1.2vw',
		textAlign: 'center',
		fontWeight: 400,
		padding: '0.8rem',
	},
	cardHeaderSelected: {
		backgroundColor: '#046ead',
		color: '#fff',
	},
});

export default coverStyle;
