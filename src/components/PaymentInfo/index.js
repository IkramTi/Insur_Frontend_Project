import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { Field } from 'redux-form';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { renderTextField, renderFieldSelect } from '../../components';
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		flex: 1,
		width: '100%',
		// maxWidth: 500,
	},
	button: {
		margin: 10,
		textAlign: 'right',
	},
	row: {
		padding: '35px !important',
	},
	form: {
		boxShadow: '0 0 3px 2px lightgray',
		borderRadius: 5,
		padding: theme.spacing(2),
	},
	delete: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	customIcon: {
		fontWeight: 'bold',
		fontSize: '1.3rem',
		margin: 5,
	},
	cardTitle: {
		color: '#003d58',
		fontWeight: 500,
		alignItems: 'center',
		borderBottom: '1px solid #ddd',
		padding: '0.7rem',
	},
	cardContent: {
		paddingLeft: '2rem',
		paddingRight: '2rem',
	},
	card: {
		border: '1px solid #ddd',
		boxShadow: 'none',
	},
}));

const PaymentCheckForm = ({ classes, index, deleteMethod, isRequired }) => {
	return (
		<>
			<Grid item xs={4}>
				<Field
					name="paymentMethodCheck"
					type="select"
					id="paymentMethodCheck"
					component={renderFieldSelect([])}
					label="Method"
				/>
			</Grid>
			<Grid item xs={2}>
				<Field
					name="paymentCheckNumber"
					type="text"
					id="paymentCheckNumber"
					component={renderTextField}
					label="Check number"
				/>
			</Grid>
			<Grid item xs={3}>
				<Field
					name="paymentCheckBank"
					type="select"
					id="paymentCheckBank"
					component={renderFieldSelect([])}
					label="Bank"
				/>
			</Grid>
			<Grid item xs={2}>
				<Field
					name={'paymentCheckAmount'}
					type="text"
					id="paymentCheckAmount"
					component={renderTextField}
					label="Amount"
				/>
			</Grid>
			<Grid item xs={1} className={classes.delete}>
				<Fab
					disabled={isRequired}
					color="primary"
					size="small"
					onClick={() => deleteMethod(index)}
				>
					<DeleteIcon />
				</Fab>
			</Grid>
		</>
	);
};

const PaymentCashForm = ({ classes, index, deleteMethod, isRequired }) => {
	return (
		<>
			<Grid item xs={4}>
				<Field
					name="paymentmethodCash"
					type="select"
					id="paymentmethodCash"
					component={renderFieldSelect([])}
					label="Method"
				/>
			</Grid>
			<Grid item xs={7}>
				<Field
					name="paymentAmountCash"
					type="select"
					id="paymentAmountCash"
					component={renderTextField}
					label="Amount"
				/>
			</Grid>
			<Grid item xs={1} className={classes.delete}>
				<Fab
					disabled={isRequired}
					color="primary"
					size="small"
					onClick={() => deleteMethod(index)}
				>
					<DeleteIcon />
				</Fab>
			</Grid>
		</>
	);
};

const paymentMethods = [
	{
		id: 'method-cash',
		type: 'cash',
	},
	{
		id: 'method-check',
		type: 'check',
	},
];

const PaymentInfo = (props) => {
	const [effectDate, setEffectDate] = useState(new Date());
	const [selectedMethods, setselectedMethods] = useState([paymentMethods[0]]);

	const classes = useStyles();

	const handleAddMethod = () => {
		let filtered = paymentMethods.filter((e) => {
			return !selectedMethods.includes(e);
		});
		if (filtered.length > 0)
			setselectedMethods([...selectedMethods, filtered[0]]);
	};

	const handleDeleteMethod = (index) => {
		setselectedMethods([...selectedMethods.filter((e, i) => i !== index)]);
	};

	const handleDateChange = (date) => {
		setEffectDate(date);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="MM/dd/yyyy"
						margin="normal"
						id="effective-date"
						label="Effective date"
						value={effectDate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={2}>
					{selectedMethods.map((method, i) => {
						switch (method.type) {
							case 'check':
								return (
									<PaymentCheckForm
										key={method.id}
										classes={classes}
										index={i}
										deleteMethod={handleDeleteMethod}
										isRequired={i === 0 && selectedMethods.length === 1}
									/>
								);
							case 'cash':
								return (
									<PaymentCashForm
										key={method.id}
										classes={classes}
										index={i}
										deleteMethod={handleDeleteMethod}
										isRequired={i === 0 && selectedMethods.length === 1}
									/>
								);
							default:
								return '';
						}
					})}
					<Grid item xs={12} className={classes.button}>
						<Fab
							variant="extended"
							size="medium"
							color="primary"
							onClick={handleAddMethod}
							disabled={paymentMethods.length === selectedMethods.length}
						>
							<AddIcon className="mr-2" />
							Add Payment Method
						</Fab>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default withRouter(PaymentInfo);
