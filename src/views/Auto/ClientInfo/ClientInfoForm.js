import React from 'react';
import { Field } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

import { renderTextField, renderFieldSelect } from 'components';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import clientInfoStyle from 'assets/jss/material-dashboard-react/views/clientInfoStyle';

const useStyles = makeStyles(clientInfoStyle);

const CorporateContact = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Field
					name="address"
					type="text"
					id="address"
					component={renderTextField}
					label="Address"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={12}>
				<Field
					name="email"
					type="text"
					id="email"
					component={renderTextField}
					label="Email"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="mobilephone"
					type="text"
					id="mobilephone"
					component={renderTextField}
					label="Phone number"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="faxnumber"
					type="text"
					id="faxnumber"
					component={renderTextField}
					label="Fax number"
					className="pr-4"
				/>
			</Grid>
		</Grid>
	);
};

const ClientContact = ({ countries, cities }) => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Field
					name="address"
					type="text"
					id="address"
					component={renderTextField}
					label="Address"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6} className="mt-2">
				<Field
					name="cityid"
					type="text"
					id="cityid"
					component={renderFieldSelect(cities, 'description', 'cityid')}
					label="City"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6} className="mt-2">
				<Field
					name="countryid"
					type="select"
					id="countryid"
					component={renderFieldSelect(countries, 'description', 'countryid')}
					label="Country"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={12}>
				<Field
					name="email"
					type="text"
					id="email"
					component={renderTextField}
					label="Email"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="mobilephone"
					type="text"
					id="mobilephone"
					component={renderTextField}
					label="Mobile phone number"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="homenumber"
					type="text"
					id="homenumber"
					component={renderTextField}
					label="Home phone number"
					className="pr-4"
				/>
			</Grid>
		</Grid>
	);
};

const ClientInfoForm = ({ countries, cities, isCorporate }) => {
	const classes = useStyles();
	const infoHeader = {
		icon: <PermContactCalendarIcon color="primary" fontSize="medium" />,
		title: 'Client Information',
	};

	return (
		<Card className={classes.card} style={{ height: '26rem' }}>
			<CardHeader header={infoHeader} />
			<CardBody>
				{isCorporate ? (
					<CorporateContact />
				) : (
					<ClientContact countries={countries} cities={cities} />
				)}
			</CardBody>
		</Card>
	);
};

export default ClientInfoForm;
