import 'bootstrap/dist/css/bootstrap.min.css';
import 'index.css';
import 'assets/css/material-dashboard-react.css?v=1.8.0';

import { getToken, setLocalStorageValue } from './helpers/account.helpers';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/configureStore';

// core components

store.subscribe(() => {
	if (getToken()) {
		setLocalStorageValue('YULZToken', store.getState().userInfo);
		setLocalStorageValue('ActiveModule', store.getState().userInfo.ActiveModule);
		setLocalStorageValue('UserId', store.getState().userInfo.UserId);
		setLocalStorageValue('menuModels', store.getState().userInfo.menuModels);
		setLocalStorageValue('ActiveLangue', store.getState().Langue.ActiveLangue);
		setLocalStorageValue('ActiveProduit', store.getState().Langue.ActiveProduit);
	} else {
		localStorage.removeItem('YULZToken');
		localStorage.removeItem('ActiveModule');
		localStorage.removeItem('UserId');
		localStorage.removeItem('menuModels');
		localStorage.removeItem('ActiveProduit');
		localStorage.removeItem('ActiveLangue');
	}
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
