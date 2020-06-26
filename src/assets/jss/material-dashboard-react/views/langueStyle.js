const langueStyle = (theme) => ({
	root: {
		overflow: 'initial',
	},
	cardTitle: {
		fontWeight: 400,
		color: '#fff',
	},
	textfield: {
		width: '90%',
	},
	tableIcon: {
		margin: '0px 10px',
		cursor: 'pointer',
		color: '#046ead',
	},
	selectLabel: {
		marginTop: '16px',
	},
	title1: {
		fontSize: '1rem',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontWeight: 400,
		lineHeight: 1.5,
		color: 'rgba(0, 0, 0, 0.54)',
	},
	title2: {
		color: '#5183a4',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontWeight: 500,
		lineHeight: 1.5,
		marginLeft: '0.5rem',
	},
	titleWrapper: {
		display: 'block',
		textAlign: 'center',
	},
	cardHeader: {
		display: 'flex',
		padding: '0.5rem 1.25rem',
		marginBottom: '0',
		borderBottom: '1px solid #ddd',
		background: 'transparent',
		zIndex: '3 !important',
		color: '#003d58',
		fontWeight: 500,
		alignItems: 'center',
		'&:first-child': {
			borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
		},
	},
	labelHeader: {
		verticalAlign: 'bottom',
		marginLeft: '1rem',
		display: 'flex',
		flex: 1,
		fontSize: '1.2rem',
		fontWeight: 400,
	},
	cardFooter: {
		borderTop: '2px solid #eee',
		backgroundColor: '#fafafa',
		padding: '0.5rem',
		textAlign: 'right',
	},
	paper: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			width: 800,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
});

export default langueStyle;
