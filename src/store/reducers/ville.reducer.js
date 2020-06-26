/**
 * Pays Libelles Reducer
 */

import { getUpdatedList } from '../../helpers/state.helpers';

const successValue = {
	loading: false,
	success: true,
	error: false,
};

function GetAll(state, payload) {
	return Object.assign({}, state, {
		data: payload,
		...successValue,
	});
}

function CreateObject(state, payload) {
	return Object.assign({}, state, {
		data: [payload, ...state.data],
		item: payload,
		...successValue,
	});
}

function UpdateObject(state, payload) {
	return Object.assign({}, state, {
		data: getUpdatedList(state.data, payload),
		item: payload,
		...successValue,
	});
}

function DeleteObject(state, payload) {
	const newData = state.data.filter((opt) => opt.id !== payload.id);
	return Object.assign({}, state, {
		data: newData,
		...successValue,
	});
}

const initialState = {
	data: [],
	item: {},
	loading: false,
	success: false,
	error: false,
};

export default function reducer(state = initialState, action) {
	const { data } = action;
	const name = '/Rest/Ville';

	switch (action.type) {
		case `REQUEST_${name}_GET`:
		case `REQUEST_${name}_GetByPaysId_GET`:
		case `REQUEST_${name}_POST`:
		case `REQUEST_${name}_DELETE`:
		case `REQUEST_${name}_PUT`:
			return Object.assign({}, state, {
				loading: true,
				success: false,
				error: false,
			});

		case `FAILED_${name}_GET`:
		case `FAILED_${name}_GetByPaysId_GET`:
		case `FAILED_${name}_POST`:
		case `FAILED_${name}_DELETE`:
		case `FAILED_${name}_PUT`:
			return Object.assign({}, state, {
				loading: false,
				success: false,
				error: true,
			});

		case `RECIEVE_${name}_GET`:
		case `RECIEVE_${name}_GetByPaysId_GET`:
			return GetAll(state, data);

		case `RECIEVE_${name}_POST`:
			return CreateObject(state, data);

		case `RECIEVE_${name}_DELETE`:
			return DeleteObject(state, data);

		case `RECIEVE_${name}_PUT`:
			return UpdateObject(state, data);

		default:
			return state;
	}
}
