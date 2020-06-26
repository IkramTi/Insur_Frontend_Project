import { dispatchExecuteCall } from '../store/Middlewares/actions';
import BaseService from './Base.service';

export default class PeriodService extends BaseService {
	constructor(service_name) {
		super();
		this.service_name = service_name;
	}

	fetchDataByProductId(key) {
		const service_name_by_tag = `${this.service_name}_GetPeriodByProd`;
		return dispatchExecuteCall(
			{ keyflag: true, key },
			service_name_by_tag,
			'GET',
			null,
		);
	}
}
