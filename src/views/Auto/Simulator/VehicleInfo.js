import React from 'react';
import Grid from '@material-ui/core/Grid';
import { renderTextField, renderFieldSelect } from '../../../components';
import { Field } from 'redux-form';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';

function VehicleInfo({ categories, types, motorCapacite }) {
	const infoHeader = {
		icon: <LocalGasStationIcon color="primary" fontSize="medium" />,
		title: 'Vehicle Information',
	};

	return (
		<Card>
			<CardHeader header={infoHeader} />
			<CardBody>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Field
							name="category"
							type="select"
							id="motorcategoryid"
							component={renderFieldSelect(
								categories,
								'description',
								'motorcategoryid',
							)}
							label="Vehicle Catgory"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Field
							name="type"
							type="select"
							id="motortypeid"
							component={renderFieldSelect(types, 'description', 'motortypeid')}
							label="Vehicle Type"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Field
							name="capacity"
							type="select"
							id="motorcapacityid"
							component={renderFieldSelect(
								motorCapacite,
								'description',
								'motorcapacityid',
							)}
							label="Motor Capacity"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6} lg={6}>
						<Field
							name="maxload"
							type="text"
							id="maxload"
							component={renderTextField}
							label="Max Load"
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6} lg={6}>
						<Field
							name="seats"
							type="text"
							id="seats"
							component={renderTextField}
							label="Seat count"
						/>
					</Grid>
				</Grid>
			</CardBody>
		</Card>
	);
}

export default VehicleInfo;
