import React, { useState } from 'react';
import { Field } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AssignmentIcon from '@material-ui/icons/Assignment';

import {
	renderTextField,
	renderFieldSelect,
	renderDatePickerField,
} from 'components';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import clientInfoStyle from 'assets/jss/material-dashboard-react/views/clientInfoStyle';

const useStyles = makeStyles(clientInfoStyle);

const ClientIdentity = ({ idTypes }) => {
	return (
		<>
			<Grid item xs={6}>
				<Field
					name="civility"
					type="select"
					id="civility"
					component={renderFieldSelect([])}
					label="Civility"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6} />
			<Grid item xs={6}>
				<Field
					name="firstname"
					type="text"
					id="firstname"
					component={renderTextField}
					label="First Name"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="lastname"
					type="text"
					id="lastname"
					component={renderTextField}
					label="Last Name"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="datebirth"
					type="text"
					id="datebirth"
					component={renderDatePickerField}
					label="Date of birth"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6} />
			<Grid item xs={6}>
				<Field
					name="idcard"
					type="text"
					id="idcard"
					component={renderTextField}
					label="ID Card number"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="typeId"
					type="text"
					id="typeId"
					component={renderFieldSelect(idTypes, 'description', 'typeId')}
					label="ID Type"
					className="pr-4"
				/>
			</Grid>
		</>
	);
};

const CorporateIdentity = ({ natureBusiness, idTypes }) => {
	return (
		<>
			<Grid item xs={6}>
				<Field
					name="companyname"
					type="text"
					id="companyname"
					component={renderTextField}
					label="Company Name"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="natureBusinessID"
					type="select"
					id="natureBusinessID"
					component={renderFieldSelect(
						natureBusiness,
						'description',
						'natureBusinessID',
					)}
					label="Nature of business"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="idcard"
					type="text"
					id="idcard"
					component={renderTextField}
					label="ID Card number"
					className="pr-4"
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					name="typeId"
					type="text"
					id="typeId"
					component={renderFieldSelect(idTypes, 'description', 'typeId')}
					label="ID Type"
					className="pr-4"
				/>
			</Grid>
		</>
	);
};

const ClientIdentityForm = ({
	idTypes,
	natureBusiness,
	isCorporate,
	handleCorporateSwitch,
}) => {
	const identityHeader = {
		icon: <AssignmentIcon color="primary" fontSize="medium" />,
		title: 'Client Identification',
	};

	return (
		<Card style={{ height: '26rem' }}>
			<CardHeader header={identityHeader}>
				<Button variant="contained" size="small" color="primary">
					Existing Client
				</Button>
			</CardHeader>
			<CardBody>
				<Grid container>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Switch
									checked={isCorporate}
									onChange={handleCorporateSwitch}
									value={'isCorporate'}
									color="primary"
								/>
							}
							label="Corporate Entity"
						/>
					</Grid>
					{isCorporate ? (
						<CorporateIdentity idTypes={idTypes} natureBusiness={natureBusiness} />
					) : (
						<ClientIdentity idTypes={idTypes} />
					)}
				</Grid>
			</CardBody>
		</Card>
	);
};

export default ClientIdentityForm;
