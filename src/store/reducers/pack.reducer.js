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
		data: payload,
		...successValue,
	});
}

function GetTarif(state, payload) {
	return Object.assign({}, state, {
		tarifAnnuel: payload,
		...successValue,
	});
}

function clearTarif(state) {
	return Object.assign({}, state, {
		periods: [],
	});
}

function UpdateTarif(state, payload) {
	return Object.assign({}, state, {
		periods: payload.periods,
		...successValue,
	});
}

function GetPackCovers(state, payload) {
	return Object.assign({}, state, {
		periods: payload.periods,
		...successValue,
	});
}

const initialState = {
	data: [],
	periods: [],
	loading: false,
	success: false,
	error: false,
};

export default function reducer(state = initialState, action) {
	const { data } = action;
	const name = '/Rest/Pack';

	switch (action.type) {
		case `REQUEST_${name}_GetByPrdIdAndLobId_GET`:

		case `FAILED_${name}_GetByPrdIdAndLobId_GET`:

		case `RECIEVE_${name}_GetByPrdIdAndLobId_GET`:
			return GetAll(state, data);

		case `REQUEST_${name}_GetTarifSimul_GET`:
			return Object.assign({}, state, {
				loading: true,
				success: false,
				error: false,
			});

		case `FAILED_${name}_GetTarifSimul_GET`:
			return Object.assign({}, state, {
				loading: false,
				success: false,
				error: true,
			});
		case `RECIEVE_${name}_GetTarifSimul_GET`:
			return GetTarif(state, data);

		case `${name}_ClearTarifSimul`:
			return clearTarif(state);

		case `REQUEST_${name}_GetTarifSimulPerso_POST`:
			return Object.assign({}, state, {
				loading: true,
				success: false,
				error: false,
			});
		case `FAILED_${name}_GetTarifSimulPerso_POST`:
			return Object.assign({}, state, {
				loading: false,
				success: false,
				error: true,
			});
		case `RECIEVE_${name}_GetTarifSimulPerso_POST`:
			return UpdateTarif(state, data);

		case `REQUEST_${name}_GetTarifSimulDetail_GET`:
			return Object.assign({}, state, {
				loading: true,
				success: false,
				error: false,
			});

		case `FAILED_${name}_GetTarifSimulDetail_GET`:
			return Object.assign({}, state, {
				loading: false,
				success: false,
				error: true,
			});
		case `RECIEVE_${name}_GetTarifSimulDetail_GET`:
			return GetPackCovers(state, data);

		default:
			return state;
	}
}
