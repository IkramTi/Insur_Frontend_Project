import { dispatchExecuteCall } from '../store/Middlewares/actions';
import BaseService from './Base.service';

export default class VilleService extends BaseService {
	constructor(service_name) {
		super();
		this.service_name = service_name;
	}

	fetchDataByCountryId(key) {
		const service_name_by_tag = `${this.service_name}_GetByPaysId`;
		return dispatchExecuteCall(
			{ keyflag: true, key },
			service_name_by_tag,
			'GET',
			null,
		);
	}
}
