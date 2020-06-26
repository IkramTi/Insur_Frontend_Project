import { dispatchExecuteCall } from '../store/Middlewares/actions';
import BaseService from './Base.service';

export default class PackService extends BaseService {
	constructor(service_name) {
		super();
		this.service_name = service_name;
	}

	fetchDataByPrdIdAndLobId(key) {
		const service_name_by_tag = `${this.service_name}_GetByPrdIdAndLobId`;
		return dispatchExecuteCall(
			{ keyflag: true, key },
			service_name_by_tag,
			'GET',
			null,
		);
	}

	GetTarifSimul(key) {
		const service_name_by_tag = `${this.service_name}_GetTarifSimul`;
		return dispatchExecuteCall(
			{ keyflag: true, key },
			service_name_by_tag,
			'GET',
			null,
		);
	}

	GetTarifSimulDetail(key) {
		const service_name_by_tag = `${this.service_name}_GetTarifSimulDetail`;
		return dispatchExecuteCall(
			{ keyflag: true, key },
			service_name_by_tag,
			'GET',
			null,
		);
	}

	GetTarifSimulPerso(model) {
		const service_name_by_tag = `${this.service_name}_GetTarifSimulPerso`;
		return dispatchExecuteCall(null, service_name_by_tag, 'POST', model);
	}

	clearTarifSimul() {
		return {
			type: `${this.service_name}_ClearTarifSimul`,
		};
	}
}
