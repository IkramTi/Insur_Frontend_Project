import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';

// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';

// core components
import AdminNavbarLinks from './AdminNavbarLinks.js';
import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js';
const useStyles = makeStyles(styles);

export default function Header(props) {
	const classes = useStyles();

	const { logo, show } = props;
	var brand = (
		<div className={classes.logo}>
			<div className={classes.logoImage}>
				<img src={logo} alt="logo" className={classes.img} />
			</div>
		</div>
	);
	return (
		<AppBar className={classes.appBar}>
			<Toolbar className={classes.container}>
				{brand}
				{show &&
					(!props.open ? (
						<Fab
							size="small"
							onClick={props.handleDrawerToggle}
							className={classes.fab}
						>
							<Menu fontSize="small" />
						</Fab>
					) : (
						<Fab
							size="small"
							onClick={props.handleDrawerClose}
							className={classes.fab}
						>
							<MoreVertIcon fontSize="small" />
						</Fab>
					))}
				<div className={classes.flex}>
					{show && (
						<Link to="/home">
							<MenuItem style={{ width: 68 }}>
								<ListItemIcon>
									<HomeIcon fontSize="large" />
								</ListItemIcon>
							</MenuItem>
						</Link>
					)}
				</div>
				<AdminNavbarLinks />
			</Toolbar>
		</AppBar>
	);
}

Header.propTypes = {
	rtlActive: PropTypes.bool,
	handleDrawerToggle: PropTypes.func,
	routes: PropTypes.arrayOf(PropTypes.object),
};
