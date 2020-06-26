import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import EventNoteIcon from '@material-ui/icons/EventNote';

import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import Installment from 'components/Installment';

const Installments = ({
	tarifAnnuel,
	isLoadingTarif,
	periods,
	setCoversState,
	selectedPack,
	isOpen,
	selectedInstallment,
	setSelectedInstallment,
	...props
}) => {
	const installmentsHeader = {
		icon: <EventNoteIcon color="primary" fontSize="medium" />,
		title: 'Fleet Installment',
	};

	const handleInstallementChange = (installment) => {
		setSelectedInstallment(installment);
		props.change('installment', installment);
		console.log('selectedPack', selectedPack);
		let newCovers = selectedPack.covers.map((oldCover) => {
			const result = installment.covers.filter(
				(newCover) => newCover.id === oldCover.id,
			);
			if (result.length > 0) {
				console.log('result[0]', result[0]);
				oldCover = result[0];
			}
			return oldCover;
		});
		console.log('newCovers', newCovers);
		setCoversState(newCovers);
	};

	return (
		<Card>
			<CardHeader header={installmentsHeader} />
			<CardBody>
				<Installment
					installments={periods}
					selectedInstallment={
						props.selectedInstallment
							? props.selectedInstallment
							: selectedInstallment
					}
					handleInstallementChange={handleInstallementChange}
					isLoading={isLoadingTarif}
				/>
			</CardBody>
		</Card>
	);
};
const form = reduxForm({
	form: 'simulator',
	destroyOnUnmount: false,
})(Installments);

const selector = formValueSelector('simulator');

export default connect((state) => ({
	selectedInstallment: selector(state, 'installment'),
}))(form);
