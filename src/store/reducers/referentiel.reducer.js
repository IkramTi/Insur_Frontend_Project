/**
 * Pays Libelles Reducer
 */

const successValue = {
	loading: false,
	success: true,
	error: false,
};

function GetAll(state, payload) {
	return Object.assign({}, state, {
		...payload,
		...successValue,
	});
}

const initialState = {
	marqueLibelles: [],
	modeleLibelles: [],
	motorCategorieLibelles: [],
	motorTypeLibelles: [],
	motorCapaciteLibelles: [],
	refPaysLibelles: [],
	natureBusinessLibelles: [],
	idTypeLibelles: [],
	refVilleLibelles: [],
	item: {},
	loading: false,
	success: false,
	error: false,
};

export default function reducer(state = initialState, action) {
	const { data } = action;
	const name = '/Rest/Referentiel';

	switch (action.type) {
		case `REQUEST_${name}_GET`:

		case `FAILED_${name}_GET`:

		case `RECIEVE_${name}_GET`:
			return GetAll(state, data);

		default:
			return state;
	}
}
