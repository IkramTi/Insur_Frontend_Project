import {
	drawerWidth,
	transition,
	boxShadow,
	defaultFont,
	primaryColor,
	primaryBoxShadow,
	successColor,
	warningColor,
	dangerColor,
	whiteColor,
	blackColor,
	hexToRgb,
} from 'assets/jss/material-dashboard-react.js';

const sidebarStyle = (theme) => ({
	drawerPaper: {
		border: 'none',
		position: 'fixed',
		top: '0',
		bottom: '0',
		left: '0',
		zIndex: '1',
		//boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.2)',
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			position: 'fixed',
			height: '100%',
		},
	},
	background: {
		position: 'absolute',
		zIndex: '1',
		height: '100%',
		width: '100%',
		display: 'block',
		top: '0',
		left: '0',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		'&:after': {
			position: 'absolute',
			zIndex: '3',
			width: '100%',
			height: '100%',
			content: '""',
			display: 'block',
			background: blackColor,
			opacity: '.8',
		},
	},
	list: {
		marginTop: '70px',
		paddingLeft: '0',
		paddingTop: '0',
		paddingBottom: '0',
		marginBottom: '0',
		listStyle: 'none',
		position: 'unset',
	},
	parentContainer: {
		margin: '10px 0px',
	},
	item: {
		position: 'relative',
		display: 'block',
		textDecoration: 'none',
		'&:hover,&:focus,&:visited,&': {
			color: whiteColor,
		},
	},
	collapse: {
		margin: '5px 10px 0 20px',
	},
	itemLink: {
		width: 'auto',
		transition: 'all 300ms linear',
		borderRadius: '3px',
		position: 'relative',
		padding: '5px 5px 5px 5px',
		backgroundColor: 'transparent',
		...defaultFont,
	},
	itemIcon: {
		width: '24px',
		height: '30px',
		fontSize: '24px',
		lineHeight: '30px',
		float: 'left',
		marginRight: '15px',
		textAlign: 'center',
		verticalAlign: 'middle',
		color: whiteColor,
	},
	activeItemIcon: {
		color: whiteColor,
	},
	itemIconRTL: {
		marginRight: '3px',
		marginLeft: '15px',
		float: 'right',
	},
	itemText: {
		...defaultFont,
		margin: '0',
		lineHeight: '30px',
		fontSize: '14px',
		color: whiteColor,
		fontWeight: 300,
	},
	itemTextRTL: {
		textAlign: 'right',
	},
	whiteFont: {
		color: whiteColor,
	},
	purple: {
		backgroundColor: primaryColor[0],
		...primaryBoxShadow,
		'&:hover,&:focus': {
			backgroundColor: primaryColor[0],
			...primaryBoxShadow,
		},
	},
	blue: {
		backgroundColor: '#046ead',
		boxShadow:
			'0 12px 20px -10px rgba(' +
			hexToRgb('#0b88d2') +
			',.28), 0 4px 20px 0 rgba(' +
			hexToRgb(blackColor) +
			',.12), 0 7px 8px -5px rgba(' +
			hexToRgb('#0b88d2') +
			',.2)',
		'&:hover,&:focus': {
			backgroundColor: '#046ead',
			boxShadow:
				'0 12px 20px -10px rgba(' +
				hexToRgb('#046ead') +
				',.28), 0 4px 20px 0 rgba(' +
				hexToRgb(blackColor) +
				',.12), 0 7px 8px -5px rgba(' +
				hexToRgb('#046ead') +
				',.2)',
		},
	},
	green: {
		backgroundColor: successColor[0],
		boxShadow:
			'0 12px 20px -10px rgba(' +
			hexToRgb(successColor[0]) +
			',.28), 0 4px 20px 0 rgba(' +
			hexToRgb(blackColor) +
			',.12), 0 7px 8px -5px rgba(' +
			hexToRgb(successColor[0]) +
			',.2)',
		'&:hover,&:focus': {
			backgroundColor: successColor[0],
			boxShadow:
				'0 12px 20px -10px rgba(' +
				hexToRgb(successColor[0]) +
				',.28), 0 4px 20px 0 rgba(' +
				hexToRgb(blackColor) +
				',.12), 0 7px 8px -5px rgba(' +
				hexToRgb(successColor[0]) +
				',.2)',
		},
	},
	orange: {
		backgroundColor: warningColor[0],
		boxShadow:
			'0 12px 20px -10px rgba(' +
			hexToRgb(warningColor[0]) +
			',.28), 0 4px 20px 0 rgba(' +
			hexToRgb(blackColor) +
			',.12), 0 7px 8px -5px rgba(' +
			hexToRgb(warningColor[0]) +
			',.2)',
		'&:hover,&:focus': {
			backgroundColor: warningColor[0],
			boxShadow:
				'0 12px 20px -10px rgba(' +
				hexToRgb(warningColor[0]) +
				',.28), 0 4px 20px 0 rgba(' +
				hexToRgb(blackColor) +
				',.12), 0 7px 8px -5px rgba(' +
				hexToRgb(warningColor[0]) +
				',.2)',
		},
	},
	red: {
		backgroundColor: dangerColor[0],
		boxShadow:
			'0 12px 20px -10px rgba(' +
			hexToRgb(dangerColor[0]) +
			',.28), 0 4px 20px 0 rgba(' +
			hexToRgb(blackColor) +
			',.12), 0 7px 8px -5px rgba(' +
			hexToRgb(dangerColor[0]) +
			',.2)',
		'&:hover,&:focus': {
			backgroundColor: dangerColor[0],
			boxShadow:
				'0 12px 20px -10px rgba(' +
				hexToRgb(dangerColor[0]) +
				',.28), 0 4px 20px 0 rgba(' +
				hexToRgb(blackColor) +
				',.12), 0 7px 8px -5px rgba(' +
				hexToRgb(dangerColor[0]) +
				',.2)',
		},
	},
	sidebarWrapper: {
		position: 'relative',
		height: 'calc(100vh - 0px)',
		overflow: 'auto',
		width: '260px',
		zIndex: '4',
		overflowScrolling: 'touch',
	},
	activePro: {
		[theme.breakpoints.up('md')]: {
			position: 'absolute',
			width: '100%',
			bottom: '13px',
		},
	},
});

export default sidebarStyle;
