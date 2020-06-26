import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Card from 'components/Card';
import CardBody from 'components/CardBody';
import ProductType from '../ProductType';
import Simulation from './Simulation';
import ClientInfo from '../ClientInfo';
import QuoteFile from '../BusinessFiles/QuoteFile';

const useStyles = makeStyles((theme) => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	stepperPaper: {
		marginBottom: theme.spacing(1),
	},
	paper: {
		padding: '1rem',
	},
	stepper: {
		padding: theme.spacing(0.5, 0.5, 0.5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginLeft: theme.spacing(1),
	},
}));

const steps = ['Choix produit', 'Simulation', 'Informations client', 'Recap'];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <ProductType />;
		case 1:
			return <Simulation />;
		case 2:
			return <ClientInfo />;
		case 3:
			return <QuoteFile />;
		default:
			throw new Error('Unknown step');
	}
}

export default function Simulator() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);

	const { product } = useSelector((state) => ({
		product: state.form.product,
	}));

	const handleNext = () => {
		if (product) {
			setActiveStep(activeStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<React.Fragment>
			<main className={classes.layout}>
				<Card className="mb-2 rounded-0">
					<CardBody>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</CardBody>
				</Card>
				<>
					{activeStep !== steps.length && (
						<React.Fragment>
							{getStepContent(activeStep)}
							<Card className="mt-2 rounded-0">
								<CardBody className="text-right p-2">
									{activeStep !== 0 && (
										<Button onClick={handleBack} className={classes.button}>
											Back
										</Button>
									)}
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
									</Button>
								</CardBody>
							</Card>
						</React.Fragment>
					)}
				</>
			</main>
		</React.Fragment>
	);
}
