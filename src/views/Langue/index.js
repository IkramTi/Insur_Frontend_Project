import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import CheckIcon from '@material-ui/icons/Check';
import FlagIcon from '@material-ui/icons/Flag';
import LanguageIcon from '@material-ui/icons/Language';

import services from '../../services';
import useLifecycleMethods from 'helpers/useLifecycleMethods.helpers';
import Navbar from 'components/Navbars/Navbar';
import logo from 'assets/img/saham-assurance.png';

const { LangueService, AuthenticationService } = services;
const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(14),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: '1rem',
	},
	title: {
		verticalAlign: 'bottom',
		marginLeft: '1rem',
		display: 'flex',
		flex: 1,
		fontSize: '1.2rem',
		fontWeight: 400,
	},
	cardHeader: {
		display: 'flex',
		padding: '0.5rem 1.25rem',
		marginBottom: '0',
		borderBottom: '1px solid #ddd',
		background: 'transparent',
		zIndex: '3 !important',
		color: '#003d58',
		fontWeight: 500,
		alignItems: 'center',
		'&:first-child': {
			borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
		},
	},
	listItemSelected: {
		backgroundColor: '#d9eaf5',
	},
	listItem: {
		'&:hover': {
			backgroundColor: '#f5f4f4',
			cursor: 'pointer',
		},
	},
	cardActions: {
		textAlign: 'right',
		borderTop: '1px solid #ddd',
		paddingTop: '0.5rem',
	},
}));

function Langue({ ...props }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [selectedLangue, setselectedLangue] = React.useState(true);

	const listItemClasses = (langueSelected) =>
		classNames({
			[classes.listItem]: !langueSelected,
			[classes.listItemSelected]: langueSelected,
		});

	const { Langue } = useSelector((state) => ({
		Langue: state.Langue.data,
	}));

	const { componentDidMount } = useLifecycleMethods();

	componentDidMount(() => {
		dispatch(LangueService.fetchData());
	});

	const selectLanguage = (langue) => {
		setselectedLangue(langue);
		dispatch(AuthenticationService.setActiveLangue(langue));
	};

	const submitLanguage = () => {
		props.history.push('/admin/home');
	};

	return (
		<div>
			<Navbar logo={logo} show={false} />
			<Container className={classes.cardGrid} maxWidth="md">
				<Paper className={classes.paper}>
					<div className={classes.cardHeader}>
						<LanguageIcon color="primary" />
						<span className={classes.title}>Choisir la Langue</span>
					</div>
					<div className={classes.demo}>
						<List>
							{Langue.map((langue) => {
								const langueSelected =
									selectedLangue && selectedLangue.code === langue.code;
								return (
									<ListItem
										className={listItemClasses(langueSelected)}
										onClick={() => selectLanguage(langue)}
									>
										<ListItemAvatar>
											<Avatar>
												<FlagIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary={langue.name} />
										<ListItemSecondaryAction>
											{langueSelected && <CheckIcon color="primary" />}
										</ListItemSecondaryAction>
									</ListItem>
								);
							})}
						</List>
					</div>
					<div className={classes.cardActions}>
						<Button variant="contained" color="primary" onClick={submitLanguage}>
							Appliquer
						</Button>
					</div>
				</Paper>
			</Container>
		</div>
	);
}
export default Langue;
