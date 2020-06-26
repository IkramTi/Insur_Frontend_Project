/**
 * Cover Reducer
 */

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
	const name = '/Rest/Cover';
	const packName = '/Rest/Pack';

	switch (action.type) {
		case `REQUEST_${name}_GetCoversByPack_GET`:

		case `FAILED_${name}_GetCoversByPack_GET`:

		case `RECIEVE_${name}_GetCoversByPack_GET`:
			return GetAll(state, data);

		case `REQUEST_${name}_GetAllCoverByProIdAndLobId_GET`:

		case `FAILED_${name}_GetAllCoverByProIdAndLobId_GET`:

		case `RECIEVE_${name}_GetAllCoverByProIdAndLobId_GET`:
			return GetAll(state, data);

		default:
			return state;
	}
}
