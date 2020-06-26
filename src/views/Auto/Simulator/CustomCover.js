import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';

import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import CoverCard from 'components/Covers/CoverCard';
import Installments from './Installments';
import services from 'services';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
		color: '#000',
		backgroundColor: 'white',
	},
	title: {
		//color: 'rgba(0,0,0,0.54)',
		fontSize: '1.4rem',
	},
}));

const { PackService } = services;

const CustomCover = ({
	tarifAnnuel,
	isLoadingTarif,
	selectedPack,
	periods,
	isOpen,
	onClose,
	selectedProduit,
	setCoversState,
	coversState,
	selectedInstallment,
	setSelectedInstallment,
	...props
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [disabled, setDisabled] = useState(true);
	console.log('selectedPack', selectedPack);
	const initialCovers =
		coversState.length !== 0 ? coversState : selectedPack.covers;

	const handleChange = (id) => (event) => {
		const newCoversState = initialCovers.map((cover) => {
			if (cover.id === id) return { ...cover, checked: event.target.checked };
			else return cover;
		});
		setCoversState(newCoversState);
		setDisabled(false);
	};

	const calculateTarif = () => {
		const actifCovers = coversState.filter(
			(cover, key) => cover.checked === true,
		);
		const coversId = actifCovers.map((cover) => {
			return cover.id;
		});
		const obj = {
			coversId: coversId,
			productId: selectedProduit.id,
		};
		const model = Object.keys(obj)
			.map((key) => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
			})
			.join('&');
		dispatch(PackService.GetTarifSimulPerso(obj));
		setDisabled(true);
	};

	return (
		<Dialog
			fullScreen
			open={isOpen}
			onClose={onClose}
			TransitionComponent={Transition}
		>
			<AppBar className={classes.appBar}>
				<Toolbar style={{ justifyContent: 'space-between' }}>
					<Box display="flex" justifyContent="center" alignItems="center">
						<IconButton
							edge="start"
							color="inherit"
							onClick={onClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography className={classes.title}>{selectedPack.title}</Typography>
					</Box>
				</Toolbar>
			</AppBar>
			<Grid container>
				<Grid item xs={12} md={3} className="p-3">
					<CoverCard cover={selectedPack} customCover />
				</Grid>
				<Grid item xs={12} md={9} className="p-3">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Installments
								tarifAnnuel={tarifAnnuel}
								isLoadingTarif={isLoadingTarif}
								periods={periods.length > 0 ? periods : []}
								setCoversState={setCoversState}
								selectedPack={selectedPack}
								isOpen={isOpen}
								selectedInstallment={selectedInstallment}
								setSelectedInstallment={setSelectedInstallment}
							/>
						</Grid>
						<Grid item xs={12}>
							{initialCovers &&
								initialCovers.map((cover) => (
									<>
										<Grid container className="p-1">
											<Grid item xs={8} className="text-left">
												<Typography style={{ padding: 9 }} color="textSecondary">
													{cover.title}
												</Typography>
											</Grid>
											<Grid item xs={2}>
												<span style={{ fontWeight: 500, color: '#046ead' }}>
													{cover.tarif}
												</span>
											</Grid>
											<Grid item xs={2} className="text-right">
												{selectedPack.editModal && (
													<Switch
														checked={cover.checked}
														onChange={handleChange(cover.id)}
														value={cover.id}
														color="primary"
														inputProps={{ 'aria-label': 'primary checkbox' }}
													/>
												)}
											</Grid>
										</Grid>
										<Divider />
									</>
								))}
						</Grid>
					</Grid>
					<div className="text-right">
						{selectedPack.editModal && (
							<Button
								onClick={calculateTarif}
								disabled={disabled}
								variant="outlined"
								color="primary"
								className="m-4"
							>
								<AttachMoneyIcon />
								Calculer
							</Button>
						)}
						<Button
							onClick={onClose}
							variant="contained"
							color="primary"
							className="m-4"
						>
							Valider
						</Button>
					</div>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default CustomCover;
