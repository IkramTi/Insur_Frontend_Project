import Grid from '@material-ui/core/Grid';
import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import logo from 'assets/img/saham-assurance.png';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import services from '../../services';
import Navbar from 'components/Navbars/Navbar';

const useStyles = makeStyles((theme) => ({
	logo: {
		position: 'relative',
		zIndex: 4,
		width: 260,
		display: 'flex',
		flex: 1,
	},
	logoImage: {
		width: 100,
		display: 'inline-block',
		marginLeft: 10,
		marginRight: 15,
	},
	img: {
		width: 200,
		top: 2,
		display: 'block',
		verticalAlign: 'middle',
		border: 0,
	},
	wrapper: {
		display: 'flex',
		position: 'relative',
	},
	logout: {
		paddingTop: '1rem',
	},
	box: {
		backgroundColor: '#0075c9',
		color: '#FFF',
		padding: '2rem',
		borderRadius: '1rem',
	},
	container: {
		paddingLeft: '20rem',
		paddingRight: '20rem',
		padding: '5rem',
	},
	cardGrid: {
		paddingTop: theme.spacing(14),
		paddingBottom: theme.spacing(4),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		transform: 'scale(0.8)',
		border: '1px solid #ddd',
		borderRadius: '1rem',
		backgroundColor: '#f5f4f4',
		textAlign: 'center',
	},
	cardEnabled: {
		'&:hover': {
			cursor: 'pointer',
			transform: 'scale(0.85)',
			boxShadow:
				'0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
		},
		transition: '.3s ease-in-out',
		backgroundColor: '#d9eaf5',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
		textAlign: 'center',
		backgroundColor: '#fff',
		borderBottomLeftRadius: '1rem',
		borderBottomRightRadius: '1rem',
		color: '#0f7dbe',
	},
	cardContentDisabled: {
		color: '#bdbcbc',
	},
	iconContainer: {
		paddingTop: '2rem',
		paddingBottom: '2rem',
	},
	iconWrapper: {
		borderRight: '1px solid #fff',
	},
	icon: {
		fontSize: '7rem',
		color: '#0f7dbe',
	},
	iconDisabled: {
		color: 'rgba(0,0,0,0.15)',
	},
	button: {
		padding: 0,
		display: 'block',
	},
}));

function Home({ ...props }) {
	const classes = useStyles();
	const cardClasses = (active) =>
		classNames({
			[classes.card]: true,
			[classes.cardEnabled]: active === 1,
		});
	const iconClasses = (active) =>
		classNames({
			[classes.icon]: true,
			[classes.iconDisabled]: active === 0,
		});
	const cardContentClasses = (active) =>
		classNames({
			[classes.cardContent]: true,
			[classes.cardContentDisabled]: active === 0,
		});
	const { modules } = useSelector((state) => ({
		modules: state.userInfo.menuModels,
	}));
	var brand = (
		<div className={classes.logo}>
			<div className={classes.logoImage}>
				<img src={logo} alt="logo" className={classes.img} />
			</div>
		</div>
	);

	const { AuthenticationService } = services;

	const dispatch = useDispatch();

	const changeModule = (module) => {
		props.history.push('/admin');
		dispatch(AuthenticationService.setActiveModule(module));
	};

	return (
		<div>
			<Navbar logo={logo} show={false} />
			<Container className={classes.cardGrid} maxWidth="lg">
				<Paper>
					<Grid container spacing={6}>
						{modules.map((module) => (
							<Grid item key={module} xs={12} sm={6} md={4}>
								<div
									onClick={() => {
										changeModule(module);
									}}
									className={cardClasses(1)}
								>
									<div className={classes.iconWrapper}>
										<div className={classes.iconContainer}>
											<Icon color="primary" className={iconClasses(1)}>
												{module.icon === null ? 'beach_access' : module.icon}
											</Icon>
										</div>
									</div>
									<CardContent className={cardContentClasses(1)}>
										<Typography gutterBottom variant="h5" component="h2">
											{module.name}
										</Typography>
									</CardContent>
								</div>
							</Grid>
						))}
					</Grid>
				</Paper>
			</Container>
		</div>
	);
}
export default Home;
