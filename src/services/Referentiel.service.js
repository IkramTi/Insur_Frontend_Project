import { dispatchExecuteCall } from '../store/Middlewares/actions';
import BaseService from './Base.service';

export default class ReferentielService extends BaseService {
	constructor(service_name) {
		super();
		this.service_name = service_name;
	}

	fetchDataByLangueId(key) {
		const service_name_by_tag = `${this.service_name}`;
		return dispatchExecuteCall(
			{ keyflag: true, key },
			service_name_by_tag,
			'GET',
			null,
		);
	}
}
