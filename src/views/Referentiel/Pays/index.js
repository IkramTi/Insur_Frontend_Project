import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/langueStyle.js';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { reduxForm } from 'redux-form';
import { Tooltip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import FlagIcon from '@material-ui/icons/Flag';
import Button from '@material-ui/core/Button';
import { DataGrid } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import services from 'services';
import SaveForm from './SaveForm';
import useLifecycleMethods from 'helpers/useLifecycleMethods.helpers';

const { PaysService, VilleService } = services;
const useStyles = makeStyles(styles);

function Pays({ handleSubmit, initialize, reset }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [edit, setEdit] = React.useState(false);
	const [selectedRow, setSelectedRow] = React.useState(null);
	const [cityToEdit, setCityToEdit] = React.useState(null);
	const [flag, setFlag] = React.useState('');
	const [title, setTitle] = React.useState('');
	const [icon, setIcon] = React.useState(null);

	const dispatch = useDispatch();
	const { Pays, Ville } = useSelector((state) => ({
		Pays: state.Pays.data,
		Ville: state.Ville.data,
	}));

	const { componentDidMount, onDependenciesChange } = useLifecycleMethods({
		Pays,
		selectedRow,
	});

	componentDidMount(() => {
		dispatch(PaysService.fetchData());
	});

	onDependenciesChange(() => {
		if (Pays.length > 0) {
			setSelectedRow(Pays[0]);
			dispatch(VilleService.fetchDataByCountryId(Pays[0].id));
		}
	}, [Pays]);

	onDependenciesChange(() => {
		if (edit) {
			if (flag === 'pays') {
				initialize(selectedRow);
			}
			if (flag === 'ville') {
				initialize(cityToEdit);
			}
		} else {
			initialize({});
		}
	}, [open]);

	const toggle = (open, edit, row, flag) => {
		if (flag === 'pays') {
			setTitle('Pays');
			setIcon(FlagIcon);
			setSelectedRow(row);
		}
		if (flag === 'ville') {
			setTitle('Ville');
			setIcon(LocationCityIcon);
			setCityToEdit(row);
		}
		setOpen(open);
		setEdit(edit);
		setFlag(flag);
	};

	const removeRow = (row, flag) => {
		Swal.fire({
			title: 'Vous êtes sûre?',
			text: 'Vous ne pourrez pas revenir en arrière!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#046ead',
			cancelButtonColor: '#facea8',
			confirmButtonText: 'Oui',
		}).then((result) => {
			if (result.value) {
				if (flag === 'pays') {
					dispatch(PaysService.deleteData(row.id)).then(() => {
						Swal.fire(
							'Supprimé!',
							'La suppression a été effectuée avec succès',
							'success',
						);
					});
				}
				if (flag === 'ville') {
					dispatch(VilleService.deleteData(row.id)).then(() => {
						Swal.fire(
							'Supprimé!',
							'La suppression a été effectuée avec succès',
							'success',
						);
					});
				}
			}
		});
	};

	const onSubmit = (values) => {
		if (flag === 'pays') {
			if (edit) {
				dispatch(PaysService.updateData(selectedRow.id, values)).then(() => {
					Swal.fire({
						title: 'Succès',
						text: 'Modification effectuée avec succès',
						icon: 'success',
					});
				});
			} else {
				dispatch(PaysService.createData(values)).then(() => {
					Swal.fire({
						title: 'Succès',
						text: 'Ajout effectuée avec succès',
						icon: 'success',
					});
					reset('PaysForm');
				});
			}
		}
		if (flag === 'ville') {
			if (edit) {
				dispatch(VilleService.updateData(selectedRow.id, values)).then(() => {
					Swal.fire({
						title: 'Succès',
						text: 'Modification effectuée avec succès',
						icon: 'success',
					});
				});
			} else {
				dispatch(
					VilleService.createData({ ...values, paysId: selectedRow.id }),
				).then(() => {
					Swal.fire({
						title: 'Succès',
						text: 'Ajout effectuée avec succès',
						icon: 'success',
					});
					reset('PaysForm');
				});
			}
		}
		setOpen(false);
	};

	const onSelectRow = (row) => {
		setSelectedRow(row);
		dispatch(VilleService.fetchDataByCountryId(row.id));
	};

	const paysColumns = [
		{
			dataField: 'abrege',
			text: 'Abrégé',
		},
		{
			dataField: 'libelle',
			text: 'Libellé',
		},
		{
			text: '',
			headerStyle: (column, colIndex) => {
				return { width: '80px', textAlign: 'center' };
			},
			formatter: (cellContent, row) => {
				return (
					<React.Fragment>
						<Tooltip title="Modifier">
							<EditIcon
								classes={{ root: classes.tableIcon }}
								onClick={() => toggle(true, true, row, 'pays')}
							/>
						</Tooltip>
						<Tooltip title="Supprimer">
							<DeleteIcon
								classes={{ root: classes.tableIcon }}
								onClick={() => removeRow(row, 'pays')}
							/>
						</Tooltip>
					</React.Fragment>
				);
			},
		},
	];

	const villeColumns = [
		{
			dataField: 'abrege',
			text: 'Abrégé',
		},
		{
			dataField: 'libelle',
			text: 'Libellé',
		},
		{
			text: '',
			headerStyle: (column, colIndex) => {
				return { width: '80px', textAlign: 'center' };
			},
			formatter: (cellContent, row) => {
				return (
					<React.Fragment>
						<Tooltip title="Modifier">
							<EditIcon
								classes={{ root: classes.tableIcon }}
								onClick={() => toggle(true, true, row, 'ville')}
							/>
						</Tooltip>
						<Tooltip title="Supprimer">
							<DeleteIcon
								classes={{ root: classes.tableIcon }}
								onClick={() => removeRow(row, 'ville')}
							/>
						</Tooltip>
					</React.Fragment>
				);
			},
		},
	];

	const selectRow = {
		mode: 'radio',
		selected: [selectedRow ? selectedRow.id : 0],
		clickToSelect: true,
		hideSelectColumn: true,
		bgColor: '#e8eef3',
		onSelect: onSelectRow,
	};

	return (
		<Grid container spacing={2}>
			<Grid item sm={6}>
				<Card>
					<div className={classes.cardHeader}>
						<FlagIcon color="primary" />
						<span className={classes.labelHeader}>Pays</span>
						<Button
							variant="contained"
							size="small"
							color="primary"
							onClick={() => toggle(true, false, null, 'pays')}
						>
							<AddIcon />
						</Button>
					</div>
					<CardContent>
						<DataGrid
							data={Pays}
							columns={paysColumns}
							selectRow={selectRow}
							size={8}
						/>
					</CardContent>
				</Card>
			</Grid>
			<Grid item sm={6}>
				<Card>
					<div className={classes.cardHeader}>
						<LocationCityIcon color="primary" />
						<span className={classes.labelHeader}>Villes</span>
						<Button
							variant="contained"
							size="small"
							color="primary"
							onClick={() => toggle(true, false, null, 'ville')}
						>
							<AddIcon />
						</Button>
					</div>
					<CardContent>
						<div className={classes.titleWrapper}>
							<span className={classes.title1}>Pays :</span>
							<span className={classes.title2}>
								{selectedRow && selectedRow.libelle}
							</span>
						</div>
						<DataGrid data={Ville} columns={villeColumns} size={4} />
					</CardContent>
				</Card>
			</Grid>
			<SaveForm
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				setOpen={setOpen}
				edit={edit}
				open={open}
				title={title}
				icon={icon}
			/>
		</Grid>
	);
}

export default reduxForm({ form: 'PaysForm' })(Pays);
