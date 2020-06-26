import {
	blackColor,
	whiteColor,
	hexToRgb,
} from 'assets/jss/material-dashboard-react';

const cardStyle = {
	card: {
		border: '0',
		//marginBottom: '30px',
		//marginTop: '30px',
		borderRadius: '6px',
		color: 'rgba(' + hexToRgb(blackColor) + ', 0.87)',
		background: whiteColor,
		width: '100%',
		border: '1px solid #ddd',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		minWidth: '0',
		wordWrap: 'break-word',
		fontSize: '.875rem',
	},
	cardHeader: {
		display: 'flex',
		padding: '0.5rem 1.25rem',
		marginBottom: '0',
		borderBottom: '1px solid #ddd',
		background: 'transparent',
		zIndex: '3 !important',
		fontWeight: 500,
		alignItems: 'center',
		'&:first-child': {
			borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
		},
	},
	labelHeader: {
		verticalAlign: 'bottom',
		marginLeft: '1.2rem',
		display: 'flex',
		flex: 1,
		color: 'rgba(0,0,0,0.87)',
		fontSize: '1rem',
	},
	cardBody: {
		padding: '1rem',
	},
};

export default cardStyle;
