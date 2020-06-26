import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Admin from 'layouts/Admin.js';
import Login from 'views/Login/Login.js';
import Home from 'views/Home/index.js';
import Langue from 'views/Langue/index.js';
import PrivateRoute from 'Security/PrivateRoute';

const hist = createBrowserHistory();

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#046ead',
		},
	},
});

export default function ActeSinistre() {
	const { access_token } = useSelector((state) => ({
		access_token: state.userInfo.access_token,
	}));

	React.useEffect(() => {
		window.addEventListener('focus', () => {
			console.log('focused');
		});
		window.addEventListener('blur', () => {
			console.log('Blured');
		});
		return () => {
			window.removeEventListener('focus', () => {
				console.log('focused');
			});
			window.removeEventListener('blur', () => {
				console.log('Blured');
			});
		};
	});
	return (
		<ThemeProvider theme={theme}>
			<Router history={hist}>
				<Switch>
					<Route exact path="/login" render={(props) => <Login {...props} />} />
					<PrivateRoute
						token={access_token}
						exact
						path="/langue"
						component={Langue}
					/>
					<PrivateRoute token={access_token} exact path="/home" component={Home} />
					<PrivateRoute token={access_token} path="/" component={Admin} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
}
