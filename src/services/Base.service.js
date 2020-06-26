/**
 * Global service
 *
 */

import { dispatchExecuteCall } from '../store/Middlewares/actions';

export default class BaseService {
  constructor(name) {
    this.service_name = name;
  }

  fetchData() {
    return dispatchExecuteCall(null, this.service_name, 'GET', null);
  }

  fetchDataById(key) {
    return dispatchExecuteCall(
      { keyflag: true, key },
      this.service_name,
      'GET',
      null,
    );
  }

  updateData(key, model) {
    return dispatchExecuteCall(
      { keyflag: true, key },
      this.service_name,
      'PUT',
      model,
    );
  }

  deleteData(key) {
    return dispatchExecuteCall(
      { keyflag: true, key },
      this.service_name,
      'DELETE',
      null,
    );
  }

  createData(model) {
    return dispatchExecuteCall(null, this.service_name, 'POST', model);
  }

  deleteRow(key) {
    return {
      type: `RECIEVE_${this.service_name}_DELETE`,
      Id: key
    }
  }
}
