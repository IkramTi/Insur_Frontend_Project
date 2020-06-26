import { drawerWidth } from 'assets/jss/material-dashboard-react.js';

const appStyle = (theme) => ({
	wrapper: {
		position: 'relative',
		top: '0',
		height: '100vh',
		backgroundColor: '#eee',
	},
	fullWidth: {
		width: '100% !important',
	},
	mainPanel: {
		width: `calc(100% - ${drawerWidth}px)`,
		overflow: 'auto',
		position: 'relative',
		float: 'right',
		transition: 'transform 225ms cubic-bezier(0.1, 0.5, 0.2, 1) 0ms',
		maxHeight: '100%',
		overflowScrolling: 'touch',
	},
	content: {
		marginTop: '35px',
		padding: '20px 0px',
		minHeight: 'calc(100vh)',
	},
	map: {
		marginTop: '70px',
	},
});

export default appStyle;
