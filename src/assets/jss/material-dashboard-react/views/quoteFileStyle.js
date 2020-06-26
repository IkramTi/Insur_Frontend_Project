import {
	containedButton,
	outlinedButton,
} from 'assets/jss/material-dashboard-react.js';
const quoteFileStyle = (theme) => ({
	containedButton: {
		...containedButton,
	},
	outlinedButton: {
		...outlinedButton,
	},
	numQuote: {
		textAlign: 'right',
		color: '#003d58',
		fontSize: '2rem',
		textTransform: 'uppercase',
		fontWeight: 700,
	},
	quoteTitle: {
		marginLeft: '1rem',
		fontSize: '1.6rem',
		fontWeight: 500,
		display: 'flex',
		flex: 1,
	},
	paper: {
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
	},
	date: {
		color: '#003d58',
		marginLeft: 5,
		marginRight: '1.2rem',
		fontWeight: 600,
	},
});

export default quoteFileStyle;
