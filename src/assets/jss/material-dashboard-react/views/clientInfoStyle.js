const clientInfoStyle = (theme) => ({
	paper: {
		marginTop: theme.spacing(1),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			padding: theme.spacing(3),
		},
	},
	headerTitle: {
		fontWeight: 500,
		fontSize: '1rem',
		color: 'rgba(0,0,0,0.87)',
		marginLeft: '1rem',
	},
	button: {
		textAlign: 'right',
	},
});

export default clientInfoStyle;
