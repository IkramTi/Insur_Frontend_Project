import React from 'react';
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import PaymentIcon from '@material-ui/icons/Payment';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import PersonIcon from '@material-ui/icons/Person';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DescriptionIcon from '@material-ui/icons/Description';

import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CardBody from 'components/CardBody';
import RecapUser from './RecapUser';
import RecapVehicle from './RecapVehicle';
import RecapCover from './RecapCover';
import PaymentInfo from 'components/PaymentInfo';
import quoteFileStyle from 'assets/jss/material-dashboard-react/views/quoteFileStyle';
import { FormModal } from 'components';

const useStyles = makeStyles(quoteFileStyle);

function QuoteFile(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const { simulator, referentiel, clientInfo } = useSelector((state) => ({
		simulator: state.form.simulator.values,
		referentiel: state.Referentiel,
		clientInfo: state.form.clientInfo.values,
	}));

	const userHeader = {
		title:
			clientInfo &&
			(clientInfo.isCorporate
				? clientInfo.companyname
				: (clientInfo.lastname || clientInfo.firstname) &&
				  clientInfo.lastname + ' ' + clientInfo.firstname),
		icon: <PersonIcon color="primary" />,
	};

	const client = {
		isCorporate: clientInfo && clientInfo.isCorporate && clientInfo.isCorporate,
		address:
			(clientInfo && clientInfo.address) ||
			(clientInfo.cityid &&
				clientInfo.address +
					' ' +
					referentiel.refVilleLibelles.find(
						(city) => city.cityid === clientInfo.cityid,
					).description),
		mobilephone:
			clientInfo &&
			clientInfo.mobilephone &&
			clientInfo.mobilephone + '/' + clientInfo.isCorporate &&
			clientInfo.faxnumber,
		email: clientInfo && clientInfo.email && clientInfo.email,
		datebirth:
			clientInfo &&
			!clientInfo.isCorporate &&
			clientInfo.datebirth &&
			moment(clientInfo.datebirth).format('DD/MM/YYYY'),
		natureBusiness:
			clientInfo.natureBusinessID &&
			referentiel.natureBusinessLibelles.find(
				(natureBusiness) =>
					natureBusiness.natureBusinessID === clientInfo.natureBusinessID,
			).description,
		idType:
			clientInfo &&
			clientInfo.typeId &&
			referentiel.idTypeLibelles.find(
				(typeId) => typeId.typeId === clientInfo.typeId,
			).description,
		idcard: clientInfo && clientInfo.idcard && clientInfo.idcard,
	};

	const vehicleHeader = {
		title: 'Vehicle',
		icon: <DriveEtaIcon color="primary" />,
	};

	const vehicle = {
		brand:
			simulator &&
			simulator.brandid &&
			referentiel.marqueLibelles.find(
				(brand) => brand.brandid === simulator.brandid,
			).description,
		type:
			simulator &&
			simulator.type &&
			referentiel.motorTypeLibelles.find(
				(type) => type.motortypeid === simulator.type,
			).description,
		seats: simulator && simulator.seats && simulator.seats,
		capacity:
			simulator &&
			simulator.capacity &&
			referentiel.motorCapaciteLibelles.find(
				(capacity) => capacity.motorcapacityid == simulator.capacity,
			).description,
		year:
			simulator && simulator.year && moment(simulator.year).format('DD/MM/YYYY'),
		maxLoad: simulator && simulator.maxload && simulator.maxload,
		category:
			simulator &&
			simulator.category &&
			referentiel.motorCategorieLibelles.find(
				(category) => category.motorcategoryid === simulator.category,
			).description,
		value: simulator && simulator.value && simulator.value,
	};

	const pack = {
		covers: simulator && simulator.installment.covers,
		payment:
			simulator && simulator.installment ? simulator.installment.payments[0] : [],
	};

	const coverHeader = {
		title: simulator && simulator.pack && simulator.pack.title,
		icon: (
			<Icon color="primary">
				{simulator && simulator.pack && simulator.pack.icon}
			</Icon>
		),
	};

	const onSubmit = () => {
		props.history.push('/admin/policy-mono');
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<Card>
			<CardHeader className="p-1 px-4 text-right d-flex">
				<DescriptionIcon color="primary" fontSize="large" />
				<span className={classes.quoteTitle}>Quote</span>
				<Button variant="outlined" className="mr-2">
					<span style={{ fontSize: '0.8rem' }}>PRINT</span>
					<PrintIcon className="pl-2" fontSize="medium" />
				</Button>
				<Button variant="contained" color="primary" onClick={handleClickOpen}>
					<span style={{ fontSize: '0.8rem' }}>TRANSFORM</span>
					<PrintIcon className="pl-2" fontSize="medium" />
				</Button>
			</CardHeader>
			<CardBody className="rounded-0">
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<RecapUser header={userHeader} client={client} edit={false} />
						<RecapVehicle header={vehicleHeader} vehicle={vehicle} edit={false} />
					</Grid>
					<Grid item xs={6}>
						<RecapCover header={coverHeader} pack={pack} edit={false} />
					</Grid>
				</Grid>
			</CardBody>
			<FormModal
				open={open}
				setOpen={setOpen}
				title="Payment Method"
				TitleIcon={<PaymentIcon />}
				maxWidth="md"
				actionType="Validate"
				ActionIcon={<SaveIcon />}
				onSubmit={onSubmit}
				handleSubmit={props.handleSubmit}
			>
				<PaymentInfo />
			</FormModal>
		</Card>
	);
}

export default reduxForm({ form: 'payment-info', destroyOnUnmount: false })(
	QuoteFile,
);
