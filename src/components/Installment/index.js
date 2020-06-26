import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// @material-ui/icons
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

// core components
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import installmentStyle from 'assets/jss/material-dashboard-react/components/installmentStyle';

const useStyles = makeStyles(installmentStyle);

const Installment = ({
	isLoading,
	installments,
	handleInstallementChange,
	selectedInstallment,
}) => {
	const classes = useStyles();

	const installmentClasses = (installmentSelected) =>
		classNames({
			[classes.installmentCard]: !installmentSelected,
			[classes.installmentCardSelected]: installmentSelected,
		});

	const installmentHeaderClasses = (installmentSelected) =>
		classNames({
			[classes.installmentHeader]: true,
			[classes.installmentHeaderSelected]: installmentSelected,
		});

	const installmentBodyClasses = (installmentSelected) =>
		classNames({
			[classes.installmentBody]: true,
			[classes.installmentBodySelected]: installmentSelected,
		});

	const handleChange = (installment) => {
		handleInstallementChange(installment);
	};

	return (
		<Container maxWidth="md" component="main">
			<Grid container spacing={6}>
				{installments.map((installment) => {
					const installmentSelected = selectedInstallment
						? selectedInstallment.title === installment.title
						: false;
					return (
						<Grid item xs={4} key={installment.id}>
							<Card
								onClick={() => handleChange(installment)}
								className={installmentClasses(installmentSelected)}
							>
								<CardHeader
									className={classNames(
										installmentHeaderClasses(installmentSelected),
										'installment-header',
									)}
								>
									<Grid container spacing={2}>
										<Grid item xs={4}>
											{installmentSelected ? (
												<EventAvailableIcon className={classes.calendarIcon} />
											) : (
												<CalendarTodayIcon className={classes.calendarIcon} />
											)}
										</Grid>
										<Grid item xs={8}>
											<Typography variant="h4">{installment.title}</Typography>
											<Typography variant="h6">{installment.subheader}</Typography>
										</Grid>
									</Grid>
								</CardHeader>
								<CardBody
									className={classNames(
										installmentBodyClasses(installmentSelected),
										'installment-body',
									)}
								>
									{installment.payments &&
										installment.payments.map((payment) => {
											return (
												<React.Fragment id={payment.id}>
													<Typography variant="body2">{payment.label}</Typography>
													<Typography style={{ fontWeight: 'bold' }}>
														{isLoading ? (
															<Spinner name="line-scale-pulse-out" noFadeIn color="coral" />
														) : payment.amount !== 0 ? (
															payment.amount + ' AOA'
														) : (
															'-----'
														)}
													</Typography>
													<br />
												</React.Fragment>
											);
										})}
								</CardBody>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};

Installment.propTypes = {
	installments: PropTypes.array.isRequired,
};

export default Installment;
