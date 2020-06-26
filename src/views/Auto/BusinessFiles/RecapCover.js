import React, { useState } from 'react';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

// @material-ui/icons
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

// core components
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import recapCoverStyle from 'assets/jss/material-dashboard-react/components/recapCoverStyle';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(recapCoverStyle);

const RecapCover = ({ handleEdit, header, pack, edit }) => {
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
				{pack.covers &&
					pack.covers.map((cover) => {
						return (
							<Grid container className="text-center mb-4">
								<Grid item xs={4}>
									<span>{cover.title}</span>
								</Grid>
								<Grid item xs={4}>
									<span>{cover.tarif}</span>
								</Grid>
								<Grid item xs={4}>
									<CheckIcon className={classes.checkIcon} />
								</Grid>
							</Grid>
						);
					})}
				<Grid container>
					<Grid item xs={6} className="text-left">
						<Typography style={{ color: '#3D85C7', fontSize: '1.5rem' }}>
							{pack.payment.label}
						</Typography>
					</Grid>
					<Grid item xs={6} className="text-right">
						<Typography style={{ fontSize: '1.5rem' }}>
							{pack.payment.amount}
						</Typography>
					</Grid>
				</Grid>
			</CardBody>
		</Card>
	);
};

RecapCover.propTypes = {};

export default RecapCover;

{
	/*const covers = [
	{ id: 1, label: 'Cover 1' },
	{ id: 2, label: 'Cover 2' },
	{ id: 3, label: 'Cover 3' },
	{ id: 4, label: 'Cover 4' },
	{ id: 5, label: 'Cover 5' },
];*/
}
