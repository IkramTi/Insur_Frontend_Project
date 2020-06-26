import React, { useState } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { useSelector, useDispatch, connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from 'components/Card';
import CardBody from 'components/CardBody';

import VehicleInfo from '../VehicleInfo';
import Packs from '../Packs';
import Installments from '../Installments';
import services from 'services';
import useLifecycleMethods from 'helpers/useLifecycleMethods.helpers';

const {
	PackService,
	ReferentielService,
	PeriodService,
	CoverService,
} = services;

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: '0.5rem',
		boxShadow: 'none',
		border: '1px solid #ddd',
	},
	title: {
		color: '#003d58',
		fontSize: '1.5rem',
		fontWeight: 500,
		marginLeft: '1rem',
	},
	titleContainer: {
		alignItems: 'center',
		display: 'flex',
		color: '#003d58',
	},
	secondTitle: {
		marginLeft: '1rem',
		fontWeight: 500,
	},
	installementHeader: {
		color: '#000',
		textAlign: 'center',
		borderRadius: '50%',
		height: '100px',
		width: '100px',
		margin: '0 auto',
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow:
			'0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
		cursor: 'pointer',
	},
	installementHeaderSelected: {
		color: '#FFF',
		backgroundColor: '#3D85C7',
	},
	priceWrapper: {
		textAlign: 'center',
		marginTop: '1rem',
	},
	primary: {
		color: '#3D85C7',
		fontWeight: 500,
		fontSize: '0.9rem',
	},
	checked: {
		color: '#3D85C7 !important',
	},
	radioLabel: {
		marginTop: '2rem',
		marginBottom: '3rem',
		marginLeft: '2rem',
	},
	installmentCard: {
		backgroundColor: '#fff',
		padding: '1rem',
		borderRadius: '1rem',
		cursor: 'pointer',
		boxShadow:
			'0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
		'&:hover': {
			backgroundColor: '#eee',
		},
		'&:hover .installment-header': {
			color: 'rgba(0,0,0,0.54)',
		},
		'&:hover .installment-body': {
			color: 'rgba(0,0,0,0.54)',
		},
	},
	installmentHeader: {
		color: 'rgba(0,0,0,0.54)',
		paddingBottom: '1rem',
		fontSize: '1.5rem',
	},
	installmentBody: {
		color: 'rgba(0,0,0,0.54)',
	},
	installmentCardSelected: {
		color: '#FFF',
		backgroundColor: '#046ead',
		padding: '1rem',
		borderRadius: '1rem',
		cursor: 'pointer',
		boxShadow:
			'0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
	},
	installmentHeaderSelected: {
		color: '#fff',
	},
	installmentBodySelected: {
		color: '#fff',
	},
	calendarIcon: {
		width: '100%',
		height: '100%',
	},
	pageHeader: {
		display: 'flex',
		marginBottom: '0.5rem',
		paddingLeft: '1rem',
	},
	title: {
		fontSize: '1.5rem',
		marginLeft: '1rem',
	},
}));

const Simulation = ({ handleSubmit, ...props }) => {
	const classes = useStyles();
	const [coversState, setCoversState] = useState([]);
	const initialInstallment =
		props.selectedInstallment !== undefined
			? props.selectedInstallment
			: periods && periods[0];
	const [selectedInstallment, setSelectedInstallment] = useState(
		initialInstallment,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const initialPack =
		props.selectedPack !== undefined ? props.selectedPack : packs && packs[0];
	const [selectedPack, setSelectedPack] = useState(initialPack);

	const dispatch = useDispatch();
	const { onDependenciesChange } = useLifecycleMethods({
		isModalOpen,
		periods,
	});
	const { componentDidMount } = useLifecycleMethods();

	const {
		brands,
		models,
		categories,
		types,
		motorCapacite,
		activeLangue,
		selectedProduit,
		packs,
		periods,
		tarifAnnuel,
		covers,
		lobId,
		isLoadingTarif,
	} = useSelector((state) => ({
		brands: state.Referentiel.marqueLibelles,
		models: state.Referentiel.modeleLibelles,
		categories: state.Referentiel.motorCategorieLibelles,
		types: state.Referentiel.motorTypeLibelles,
		motorCapacite: state.Referentiel.motorCapaciteLibelles,
		packs: state.Pack.data,
		periods: state.Pack.periods,
		activeLangue: state.userInfo.ActiveLangue,
		selectedProduit: state.form.product.values.product,
		tarifAnnuel: state.Pack.tarifAnnuel,
		isLoadingTarif: state.Pack.loading,
		covers: state.Cover.data,
		lobId: state.userInfo.ActiveModule.childremenu[0].menuitems[0].fk_ref_lob,
	}));

	componentDidMount(() => {
		const key = `${selectedProduit.id}/${lobId}`;
		dispatch(ReferentielService.fetchDataByLangueId(activeLangue.id));
		dispatch(PackService.fetchDataByPrdIdAndLobId(key));
		dispatch(PeriodService.fetchDataByProductId(selectedProduit.id));
		dispatch(CoverService.fetchDataByProIdAndLobId(key));
	});

	onDependenciesChange(() => {
		setCoversState(
			selectedPack.title === 'Personnalisé'
				? selectedPack.covers
				: props.selectedPeriod
				? props.selectedPeriod.covers
				: selectedPack.covers,
		);
		setSelectedInstallment(periods.length > 0 && periods[0]);
	}, [isModalOpen, periods]);

	const onSubmit = (values) => {
		console.log('values', values);
	};

	const formattedPeriods =
		periods &&
		periods.map((item, key) => {
			return {
				title: item.code,
				subheader: 'DAYS',
				periodicity: item.name,
				icon: 'Calendar',
				payments: [
					{
						label: 'Total',
						amount: item.tariftotal,
					},
				],
				covers: item.covers.map((cover) => {
					return {
						id: cover.refCover.id,
						title: cover.refCover.name,
						checked: false,
						tarif: cover.tarifCover,
					};
				}),
			};
		});

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card
					style={{ backgroundColor: 'rgb(232, 243, 251)' }}
					className="rounded-0"
				>
					<CardBody>
						<VehicleInfo
							brands={brands && brands}
							models={models}
							categories={categories}
							types={types}
							motorCapacite={motorCapacite}
						/>
					</CardBody>
				</Card>
			</form>
			<Card className="mt-2 rounded-0">
				<CardBody>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={12} lg={6}>
							<Packs
								tarifAnnuel={tarifAnnuel}
								periods={formattedPeriods ? formattedPeriods : []}
								packs={packs ? packs : []}
								allCovers={covers ? covers : []}
								isLoadingTarif={isLoadingTarif}
								selectedProduit={selectedProduit}
								classes={classes}
								setCoversState={setCoversState}
								coversState={coversState}
								selectedInstallment={selectedInstallment}
								setSelectedInstallment={setSelectedInstallment}
								isModalOpen={isModalOpen}
								setIsModalOpen={setIsModalOpen}
								selectedPack={selectedPack}
								setSelectedPack={setSelectedPack}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={6}>
							<Installments
								periods={formattedPeriods ? formattedPeriods : []}
								tarifAnnuel={tarifAnnuel}
								isLoadingTarif={isLoadingTarif}
								setCoversState={setCoversState}
								selectedInstallment={selectedInstallment}
								setSelectedInstallment={setSelectedInstallment}
								selectedPack={selectedPack}
							/>
						</Grid>
					</Grid>
				</CardBody>
			</Card>
		</>
	);
};

const form = reduxForm({
	form: 'simulator',
	destroyOnUnmount: false,
})(Simulation);

const selector = formValueSelector('simulator');

export default connect((state) => ({
	selectedPeriod: selector(state, 'installment'),
}))(form);
