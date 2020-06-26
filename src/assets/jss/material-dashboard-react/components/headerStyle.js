import {
	container,
	defaultFont,
	primaryColor,
	defaultBoxShadow,
	infoColor,
	successColor,
	warningColor,
	dangerColor,
	whiteColor,
	grayColor,
} from 'assets/jss/material-dashboard-react.js';

const headerStyle = () => ({
	appBar: {
		backgroundColor: '#fff',
		boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.2)',
		borderBottom: '0',
		position: 'absolute',
		width: '100%',
		zIndex: '1029',
		color: grayColor[7],
		border: '0',
		borderRadius: '3px',
		transition: 'all 150ms ease 0s',
		minHeight: '50px',
		display: 'block',
	},
	container: {
		...container,
		minHeight: '50px',
	},
	flex: {
		flex: 1,
	},
	title: {
		...defaultFont,
		letterSpacing: 'unset',
		lineHeight: '30px',
		fontSize: '18px',
		borderRadius: '3px',
		textTransform: 'none',
		color: 'inherit',
		margin: '0',
		'&:hover,&:focus': {
			background: 'transparent',
		},
	},
	appResponsive: {
		top: '8px',
	},
	primary: {
		backgroundColor: primaryColor[0],
		color: whiteColor,
		...defaultBoxShadow,
	},
	info: {
		backgroundColor: infoColor[0],
		color: whiteColor,
		...defaultBoxShadow,
	},
	success: {
		backgroundColor: successColor[0],
		color: whiteColor,
		...defaultBoxShadow,
	},
	warning: {
		backgroundColor: warningColor[0],
		color: whiteColor,
		...defaultBoxShadow,
	},
	danger: {
		backgroundColor: dangerColor[0],
		color: whiteColor,
		...defaultBoxShadow,
	},
	fab: {
		marginRight: '2rem',
		backgroundColor: '#FFF',
	},
	logoImage: {
		width: '100px',
		display: 'inline-block',
		//maxHeight: "30px",
		marginLeft: '10px',
		marginRight: '15px',
	},
	img: {
		width: '170px',
		height: '60px',
		top: '0',
		position: 'absolute',
		verticalAlign: 'middle',
		border: '0',
	},
	logo: {
		position: 'relative',
		padding: '16px 0px',
		zIndex: '4',
		width: '260px',
	},
});

export default headerStyle;
