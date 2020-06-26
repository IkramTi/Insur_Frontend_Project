/**
 * Reducers : 1-Referentiel
 *            2-Production
 */

import baseReducer from './base.reducer';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import userInfo from './account.reducer';
import ville from './ville.reducer';
import referentiel from './referentiel.reducer';
import pack from './pack.reducer';
import period from './period.reducer';
import cover from './cover.reducer';

export default combineReducers({
	form,
	userInfo,
	Pays: baseReducer('/Rest/Pays'),
	Ville: ville,
	Langue: baseReducer('/Rest/Lang'),
	Referentiel: referentiel,
	Product: baseReducer('/Rest/Product'),
	Pack: pack,
	Period: period,
	Cover: cover,
});
