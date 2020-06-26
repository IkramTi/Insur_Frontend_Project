import React, { useState } from 'react';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

// @material-ui/icons
import EditIcon from '@material-ui/icons/Edit';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

// core components
import recapVehicleStyle from 'assets/jss/material-dashboard-react/components/recapVehicleStyle';
//import brand from 'assets/img/Peugeot-logo.png';

const useStyles = makeStyles(recapVehicleStyle);

const RecapVehicle = ({ handleEdit, header, vehicle, edit }) => {
	const classes = useStyles();

	return (
		<Card className="mt-2">
			<CardHeader header={header}>
				{edit && (
					<IconButton className={classes.iconButton} onClick={handleEdit}>
						<EditIcon />
					</IconButton>
				)}
			</CardHeader>
			<CardBody>
				<Grid container>
					<Grid items xs={4}>
						<Grid container>
							<Grid item xs={4}>
								{/*<img src={brand} className={classes.image} />*/}
							</Grid>
							<Grid item xs={8}>
								<Typography>{vehicle.brand && vehicle.brand}</Typography>
								<Typography>{vehicle.type && vehicle.type}</Typography>
								<Typography>{vehicle.seats && vehicle.seats} Places</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid items xs={4}>
						<Typography className={classes.primaryLabel}>Capacity</Typography>
						<Typography>{vehicle.capacity && vehicle.capacity}</Typography>
						<br />
						<Typography className={classes.primaryLabel}>Date of make</Typography>
						<Typography>{vehicle.year && vehicle.year}</Typography>
						<br />
						<Typography className={classes.primaryLabel}>Max load</Typography>
						<Typography>{vehicle.maxLoad && vehicle.maxLoad}</Typography>
					</Grid>
					<Grid items xs={4}>
						<Typography className={classes.primaryLabel}>Category</Typography>
						<Typography>{vehicle.category && vehicle.category}</Typography>
						<br />
						<Typography className={classes.primaryLabel}>Value</Typography>
						<Typography>{vehicle.value && vehicle.value} F CFA</Typography>
					</Grid>
				</Grid>
			</CardBody>
		</Card>
	);
};

RecapVehicle.propTypes = {};

export default RecapVehicle;
