import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import Cover from 'components/Covers';
import CustomCover from './CustomCover';
import services from 'services';

const { PackService } = services;

const Packs = ({
	isLoadingTarif,
	allCovers,
	tarifAnnuel,
	periods,
	packs,
	selectedProduit,
	classes,
	setCoversState,
	coversState,
	selectedInstallment,
	setSelectedInstallment,
	isModalOpen,
	setIsModalOpen,
	selectedPack,
	setSelectedPack,
	...props
}) => {
	const dispatch = useDispatch();

	const infoHeader = {
		icon: <VerifiedUserIcon color="primary" fontSize="medium" />,
		title: 'Packs',
	};

	const formattedPacks = packs.map((item, key) => {
		return {
			id: item.id,
			title: item.name,
			icon: item.iconmenu === null ? 'drive_eta' : item.icon,
			detailModal: true,
			covers: item.covers.map((item, key) => {
				return {
					id: item.id,
					title: item.refCover.name,
					checked: false,
				};
			}),
		};
	});

	formattedPacks.push({
		title: 'Personnalisé',
		icon: 'tune',
		editModal: true,
		covers: allCovers.map((item, key) => {
			return {
				id: item.id,
				title: item.refCover.name,
				checked: false,
			};
		}),
	});

	const handlePackChange = (cover) => {
		setSelectedPack(cover);
		props.change('pack', cover);
		console.log('props.selectedPeriod', props.selectedPeriod);
		console.log('periods', periods);
		if (props.selectedPeriod) {
			props.change(
				'installment',
				periods.find((period) => period.title === props.selectedPeriod.title),
			);
		}
	};

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const onSelectPack = (cover) => {
		if (cover.title === 'Personnalisé') {
			dispatch(PackService.clearTarifSimul());
			handleModalOpen();
		} else {
			const key = `${cover.id}/${selectedProduit.id}`;
			dispatch(PackService.GetTarifSimulDetail(key));
		}
		handlePackChange(cover);
	};

	return (
		<Card>
			<CardHeader header={infoHeader} />
			<CardBody>
				<Cover
					covers={formattedPacks}
					selectedCover={selectedPack}
					handleCoverChange={handlePackChange}
					handleModalOpen={handleModalOpen}
					onSelectCover={onSelectPack}
				/>
			</CardBody>
			{selectedPack && (
				<CustomCover
					tarifAnnuel={tarifAnnuel}
					isLoadingTarif={isLoadingTarif}
					isOpen={isModalOpen}
					onClose={handleModalClose}
					periods={periods}
					selectedPack={selectedPack}
					selectedProduit={selectedProduit}
					setCoversState={setCoversState}
					coversState={coversState}
					selectedInstallment={selectedInstallment}
					setSelectedInstallment={setSelectedInstallment}
				/>
			)}
		</Card>
	);
};

const form = reduxForm({
	form: 'simulator',
	destroyOnUnmount: false,
})(Packs);

const selector = formValueSelector('simulator');

export default connect((state) => ({
	selectedPack: selector(state, 'pack'),
	selectedPeriod: selector(state, 'installment'),
}))(form);
