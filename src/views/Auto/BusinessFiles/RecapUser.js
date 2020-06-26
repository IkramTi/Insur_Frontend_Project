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

// core components
import recapVehicleStyle from 'assets/jss/material-dashboard-react/components/recapVehicleStyle';

const useStyles = makeStyles(recapVehicleStyle);

const RecapUser = ({ handleEdit, header, client, edit }) => {
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
					<Grid item xs={4}>
						<Typography>{client.address}</Typography>
						<Typography>{client.mobilephone}</Typography>
						<Typography>{client.email}</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography className={classes.primaryLabel}>
							{client.isCorporate ? 'Nature business' : 'Birthday date'}
						</Typography>
						<Typography>
							{client.isCorporate ? client.natureBusiness : client.datebirth}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography className={classes.primaryLabel}>ID Type</Typography>
						<Typography>{client.idType}</Typography>
						<br />
						<Typography className={classes.primaryLabel}>Card number</Typography>
						<Typography>{client.idcard}</Typography>
					</Grid>
				</Grid>
			</CardBody>
		</Card>
	);
};

RecapUser.propTypes = {};

export default RecapUser;
