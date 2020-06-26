/**
 * Global service
 *
 */
import { dispatchExecuteCall } from '../store/Middlewares/actions';
import {
	SET_ACTIVE_MODULE,
	SET_ACTIVE_LANGUE,
} from '../store/reducers/account.reducer';

export default class AuthenticationService {
	constructor(service_name) {
		this.service_name = service_name;
	}

	login(model) {
		return dispatchExecuteCall(null, this.service_name, 'POST', model);
	}

	setActiveModule(activeModule) {
		return (dispatch) => {
			dispatch({ type: SET_ACTIVE_MODULE, payload: activeModule });
		};
	}

	setActiveLangue(activeLangue) {
		return (dispatch) => {
			dispatch({ type: SET_ACTIVE_LANGUE, payload: activeLangue });
		};
	}
}
