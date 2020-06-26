import React from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import VehicleIdentificationForm from './VehicleIdentificationForm';
import VehicleInfoForm from './VehicleInfoForm';

const VehicleInfo = ({ brands, models, categories, types, motorCapacite }) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<VehicleIdentificationForm brands={brands && brands} models={models} />
			</Grid>
			<Grid item xs={6}>
				<VehicleInfoForm
					categories={categories}
					types={types}
					motorCapacite={motorCapacite}
				/>
			</Grid>
		</Grid>
	);
};

const formed = reduxForm({
	form: 'vehicle-info',
})(VehicleInfo);

export default withRouter(formed);
