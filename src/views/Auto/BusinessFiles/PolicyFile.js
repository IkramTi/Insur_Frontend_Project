import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import SecurityIcon from '@material-ui/icons/Security';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PrintIcon from '@material-ui/icons/Print';
import Paper from '@material-ui/core/Paper';

import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import RecapUser from './RecapUser';
import RecapVehicle from './RecapVehicle';
import RecapCoverMono from './RecapCoverMono';
import quoteFileStyle from 'assets/jss/views/quoteFileStyle';

const useStyles = makeStyles(quoteFileStyle);

function PolicyFileMono({ ...props }) {
	const classes = useStyles();

	const userHeader = {
		title: 'USER NAME',
		icon: <PersonIcon />,
	};

	const vehicleHeader = {
		title: 'Vehicle',
		icon: <DriveEtaIcon />,
	};

	const coverHeader = {
		title: 'Liability Cover',
		icon: <SecurityIcon />,
	};

	return (
		<Paper className={classes.paper}>
			<CardHeader className="p-1 text-right d-inline-block">
				<Button variant="contained" className={classes.containedButton}>
					PRINT
					<PrintIcon className="pl-2" />
				</Button>
			</CardHeader>
			<CardHeader className="d-flex p-3">
				<Grid container className="align-items-center">
					<Grid item xs={4}>
						<span className={classes.quoteTitle}>Policy</span>
					</Grid>
					<Grid item xs={4}>
						<span>From :</span>
						<span className={classes.date}>01-01-2020</span>
						<span>To :</span>
						<span className={classes.date}>31-01-2020</span>
					</Grid>
					<Grid item xs={4} className="text-right">
						<span className={classes.numQuote}>POLICY12345</span>
					</Grid>
				</Grid>
			</CardHeader>
			<CardBody>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<RecapUser header={userHeader} edit={false} />
						<RecapVehicle header={vehicleHeader} edit={false} />
					</Grid>
					<Grid item xs={6}>
						<RecapCoverMono header={coverHeader} edit={false} />
					</Grid>
				</Grid>
			</CardBody>
		</Paper>
	);
}

export default PolicyFileMono;
