/**
 * Security: Account Reducer
 * @param state
 * @param action
 */

import { getLocalStorageValue } from '../../helpers/account.helpers';

export const REQUEST_LOGIN = 'REQUEST_Authentication_POST';
export const FAILED_LOGIN = 'FAILED_Authentication_POST';
export const RECIEVE_LOGIN = 'RECIEVE_Authentication_POST';
export const CHANGE_MODULE = 'CHANGE_MODULE';
export const DO_LOGOUT = 'DO_LOGOUT';
export const SET_ACTIVE_MODULE = 'SET_ACTIVE_MODULE';
export const SET_ACTIVE_LANGUE = 'SET_ACTIVE_LANGUE';

const initialState = {
	isFetching: false,
	Key: null,
	menuModels: [],
	applicationRoles: [],
	UserId: null,
	UserName: null,
	UsersProfil: [],
	ActiveModule: 0,
	connection: null,
	access_token: null,
};

function initStateByLocalStorage(initState) {
	let newInitState = initState;
	const YULZToken = getLocalStorageValue('YULZToken');
	const YULZActiveModule = getLocalStorageValue('ActiveModule');

	if (YULZToken) newInitState = { ...newInitState, ...YULZToken };
	if (YULZActiveModule)
		newInitState = { ...newInitState, ActiveModule: YULZActiveModule };
	return newInitState;
}

function Account(state = initStateByLocalStorage(initialState), action) {
	switch (action.type) {
		case REQUEST_LOGIN:
			return Object.assign({}, state, {
				isFetching: true,
			});

		case FAILED_LOGIN:
			return Object.assign({}, state, {
				isFetching: false,
			});

		case RECIEVE_LOGIN:
			return Object.assign({}, state, {
				isFetching: false,
				...action.data.Token,
				UserId: action.data.UserId,
				UserName: action.data.username,
				connection: action.data.connection,
				access_token: action.data.token,
				menuModels: action.data.model.modules,
			});

		case DO_LOGOUT:
			return initialState;

		case SET_ACTIVE_MODULE:
			return Object.assign({}, state, {
				ActiveModule: action.payload ? action.payload : [],
			});

		case SET_ACTIVE_LANGUE:
			return Object.assign({}, state, {
				ActiveLangue: action.payload ? action.payload : [],
			});

		default:
			return state;
	}
}

export default Account;
