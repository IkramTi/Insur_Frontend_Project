import { Field, reduxForm } from 'redux-form';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';
import Typography from '@material-ui/core/Typography';
import imageBackG from 'assets/img/insur.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { renderTextField } from '../../components';
import services from '../../services';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const { AuthenticationService } = services;

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		//backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.grey[900]
				: theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		width: 'auto',
		height: '-webkit-fill-available',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#8597a5',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: '#8597a5',
		color: '#fff',
		'&:hover': {
			backgroundColor: '#505962',
		},
	},
}));

function SignInSide({ handleSubmit }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { isLogged, isFetching } = useSelector((state) => ({
		isLogged: state.userInfo.access_token ? true : false,
		isFetching: state.userInfo.isFetching,
	}));
	const onSubmit = (values) => {
		const object = {
			...values,
		};
		const searchParams = Object.keys(object)
			.map((key) => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
			})
			.join('&');

		dispatch(AuthenticationService.login(searchParams));
	};
	if (isLogged) {
		return <Redirect to="/langue" />;
	}
	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={9} lg={8}>
				<img src={imageBackG} className={classes.image} alt="#" />
			</Grid>
			<Grid
				item
				xs={12}
				sm={8}
				md={3}
				lg={4}
				component={Paper}
				elevation={6}
				square
			>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Authentification
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit(onSubmit)}
					>
						<Field
							type="text"
							name="username"
							label="Utilisateur"
							component={renderTextField}
							required
						/>
						<Field
							type="password"
							name="password"
							label="Mot de passe"
							component={renderTextField}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							className={classes.submit}
						>
							{isFetching ? (
								<Spinner name="circle" noFadeIn color="white" />
							) : (
								'Se connecter'
							)}
						</Button>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
export default reduxForm({ form: 'LoginForm' })(SignInSide);
