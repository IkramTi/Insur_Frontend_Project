/**
 * Higher Order Reducer for CRUD
 * @param {*} name
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
	const newData = state.data.filter((opt) =>
		payload.id !== undefined ? opt.id !== payload.id : opt.id !== payload.data.id,
	);
	return Object.assign({}, state, {
		data: newData,
		...successValue,
	});
}

export default function CreateCrudReducer(name) {
	const initialState = {
		data: [],
		item: null,
		loading: false,
		success: false,
		error: false,
	};
	const reducer = function CrudReducer(state = initialState, action) {
		const { data } = action;

		switch (action.type) {
			case `REQUEST_${name}_GET`:
			case `REQUEST_${name}_POST`:
			case `REQUEST_${name}_DELETE`:
			case `REQUEST_${name}_PUT`:
				return Object.assign({}, state, {
					loading: true,
					success: false,
					error: false,
				});

			case `FAILED_${name}_GET`:
			case `FAILED_${name}_POST`:
			case `FAILED_${name}_DELETE`:
			case `FAILED_${name}_PUT`:
				return Object.assign({}, state, {
					loading: false,
					success: false,
					error: true,
				});

			case `RECIEVE_${name}_GET`:
				return GetAll(state, data);

			case `RECIEVE_${name}_POST`:
				return CreateObject(state, data);

			case `RECIEVE_${name}_DELETE`:
				return DeleteObject(state, action);

			case `RECIEVE_${name}_PUT`:
				return UpdateObject(state, data);

			default:
				return state;
		}
	};
	return reducer;
}
