/**
 * ***********************
 * CUSTOM API MIDDELWARE *
 * ***********************
 * 1.A centralized solution, i.e, in one module
 * 2.Can handle various http methods: GET, POST, DELETE, and PUT
 * 3.Can handle setting custom headers
 * 4.Supports custom error handling, e.g to be sent to some external logging
 * sevice, or for handling authorisation errors
 * 5.Allows fo onSuccess and onFailure callbacks
 * 6.Supports labels for handling loading states
 *
 * Let's setup the middleware
 */

import { freezeUI, unfreezeUI } from '../../helpers/freezeUI.helpers';
import { getToken, getUserId } from '../../helpers/account.helpers';

import Swal from 'sweetalert2';
import { apiActionCreator } from './actions';
import axios from 'axios';

const API_URL =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost'
		: window.globalConfig.REACT_APP_API_URL;
const API_PORT =
	process.env.NODE_ENV !== 'production'
		? '5000'
		: window.globalConfig.REACT_APP_API_PORT;
const API_PATH = '';
const API_SEQUENCE = 0;

const apiMiddelware = (dispatch, options, serviceName, method, model) => {
	const service = serviceName.replace('_', '/');
	const url = `${API_URL}:${API_PORT}/${API_PATH}`;
	const actionType = `${serviceName}_${method}`;
	const params = options
		? options.keyflag
			? '/' + options.key
			: '/' + btoa(JSON.stringify(options.model))
		: '';
	const model_Is_String = model instanceof String || typeof model === 'string';
	const data = model_Is_String ? model : { ...model };
	const data_Is_String = data instanceof String && typeof data === 'string';

	let args = {};
	args = data ? (data_Is_String ? data : { ...args, data }) : args;

	//Make request API
	dispatch(apiActionCreator('REQUEST_' + actionType, API_SEQUENCE));
	freezeUI();

	// axios default config
	axios.defaults.baseURL = url || '';

	axios.defaults.headers.common['Authorization'] =
		getToken() === null ? null : `${getToken()}`;

	let axiosCall = null;
	const responseType = options ? options.responseType : null;

	if (model instanceof FormData) {
		axiosCall = axios.post(`${service}${params}`, model, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	} else {
		axios.defaults.headers.common['Content-Type'] = 'application/json';
		axiosCall = axios.request({
			url: `${service}${params}`,
			method,
			responseType: responseType,
			...args,
		});
	}

	return new Promise((resolve, reject) => {
		axiosCall
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					return response;
				} else {
					const Message = `bad HTTP  status ${response ? response.status : '400'}`;
					return { Message };
				}
			})
			.then((checkedResponse) => {
				if (checkedResponse.data.error) {
					const { error } = checkedResponse.data;
					showMessage(error);
					dispatch(
						apiActionCreator('FAILED_' + actionType, API_SEQUENCE, null, error),
					);
					return reject(error);
				}

				if (checkedResponse.data instanceof Blob) {
					const disposition = checkedResponse.request.getResponseHeader(
						'Content-Disposition',
					);
					if (disposition) {
						let fileName = '';
						const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
						const matches = fileNameRegex.exec(disposition);
						if (matches !== null && matches[1]) {
							fileName = matches[1].replace(/['"]/g, '');
						}
						const blob = new Blob([checkedResponse.data]);
						const downloadUrl = window.URL.createObjectURL(blob);
						const link = document.createElement('a');
						link.href = downloadUrl;
						link.setAttribute('download', fileName);
						document.body.appendChild(link);
						link.click();

						dispatch(apiActionCreator('RECIEVE_' + actionType, API_SEQUENCE));
					} else {
						const { data } = checkedResponse;
						return fileReader(data)
							.then((file) => JSON.parse(file))
							.then(({ Message }) => {
								dispatch(
									apiActionCreator('FAILED_' + actionType, API_SEQUENCE, null, Message),
								);

								return reject(Message);
							});
					}
				} else {
					dispatch(
						apiActionCreator(
							'RECIEVE_' + actionType,
							API_SEQUENCE,
							checkedResponse.data,
						),
					);
				}

				resolve(checkedResponse.data);
			})
			.catch((error) => {
				if (error.response) {
					//const errorMessage = getMessageByStatus(error.response);
					const errorMessage = error.response.data.Message
						? error.response.data.Message
						: error.response.data;
					//showMessage(errorMessage, 'error');
					showErrorMessage(errorMessage);
					dispatch(
						apiActionCreator(
							'FAILED_' + actionType,
							API_SEQUENCE,
							null,
							errorMessage,
						),
					);
					reject(errorMessage);
				} else {
					showMessage(
						'Network error: Please check your connection and try again.',
						'error',
					);
				}
			})
			.finally(() => {
				unfreezeUI();
			});
	});
};

function showMessage(title = '', type = 'success') {
	Swal.fire({
		type,
		title,
	});
}

function showErrorMessage(text) {
	Swal.fire({
		icon: 'error',
		text: text,
	});
}

function getMessageByStatus(error) {
	const { status } = error;
	switch (status) {
		case 401:
			return 'You are not authorized!';
		default:
			return "Erreur s'est produite";
	}
}

function fileReader(file) {
	const fileReader = new FileReader();

	return new Promise((resolve, reject) => {
		fileReader.onerror = () => {
			fileReader.abort();
			reject(new Error('Problem parsing file'));
		};

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.readAsText(file);
	});
}

export default apiMiddelware;
