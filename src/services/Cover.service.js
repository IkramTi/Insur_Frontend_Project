import { dispatchExecuteCall } from '../store/Middlewares/actions';
import BaseService from './Base.service';

export default class CoverService extends BaseService {
	constructor(service_name) {
		super();
		this.service_name = service_name;
	}

	fetchDataByProIdAndLobId(key) {
		const service_name_by_tag = `${this.service_name}_GetAllCoverByProIdAndLobId`;
		return dispatchExecuteCall(
			{ keyflag: true, key },
			service_name_by_tag,
			'GET',
			null,
		);
	}

	fetchDataByPackId(key) {
		const service_name_by_tag = `${this.service_name}_GetCoversByPack`;
		return dispatchExecuteCall(
			{ keyflag: true, key },
			service_name_by_tag,
			'GET',
			null,
		);
	}
}
