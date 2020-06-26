/**
 * Middleware action creators
 */

import apiMiddelware from './apiMiddleware';

export function apiActionCreator(type, apisequence, data, error = null) {
  return {
    type,
    apisequence,
    data,
    error,
    receivedAt: Date.now()
  };
}

export function dispatchExecuteCall(options, serviceName, method, model) {
  return dispatch => {
    return apiMiddelware(
      dispatch,
      options,
      serviceName,
      method,
      model
    );
  };
}