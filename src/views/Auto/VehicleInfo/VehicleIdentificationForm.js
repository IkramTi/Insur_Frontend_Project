import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
	renderTextField,
	renderFieldSelect,
	renderDatePickerField,
} from 'components';
import { Field } from 'redux-form';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';

function VehicleIdentification({ brands, models }) {
	const identificationHeader = {
		icon: <DirectionsCarIcon color="primary" fontSize="medium" />,
		title: 'Vehicle Identification',
	};

	return (
		<Card>
			<CardHeader header={identificationHeader} />
			<CardBody>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Field
							name="brandid"
							type="select"
							id="brandid"
							component={renderFieldSelect(brands, 'description', 'brandid')}
							label="Brand"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Field
							name="model"
							type="select"
							id="model"
							component={renderFieldSelect(models, 'description', 'modelid')}
							label="Model"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Field
							name="year"
							type="text"
							id="year"
							component={renderDatePickerField}
							label="Date of make"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6} lg={6}>
						<Field
							name="number"
							type="text"
							id="number"
							component={renderTextField}
							label="Registration number"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6} lg={6}>
						<Field
							name="value"
							type="text"
							id="value"
							component={renderTextField}
							label="Vehicle Value"
						/>
					</Grid>
				</Grid>
			</CardBody>
		</Card>
	);
}

export default VehicleIdentification;
