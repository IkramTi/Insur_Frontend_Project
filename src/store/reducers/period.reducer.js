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

const initialState = {
	data: [],
	item: {},
	loading: false,
	success: false,
	error: false,
};

export default function reducer(state = initialState, action) {
	const { data } = action;
	const name = '/Rest/Period';

	switch (action.type) {
		case `REQUEST_${name}_GetPeriodByProd_GET`:

		case `FAILED_${name}_GetPeriodByProd_GET`:

		case `RECIEVE_${name}_GetPeriodByProd_GET`:
			return GetAll(state, data);

		default:
			return state;
	}
}
