import React from 'react';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// core components
import Button from 'components/CustomButtons/Button.js';
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [openProfile, setOpenProfile] = React.useState(false);
	const [placement, setPlacement] = React.useState();
	const dispatch = useDispatch();

	const handleClickProfile = (newPlacement) => (event) => {
		setAnchorEl(event.currentTarget);
		setOpenProfile((prev) => placement !== newPlacement || !prev);
		setPlacement(newPlacement);
	};
	const handleCloseProfile = () => {
		setOpenProfile(null);
	};

	const logout = () => {
		dispatch({ type: 'DO_LOGOUT' });
	};

	return (
		<div>
			<div className={classes.manager}>
				<Button
					color={window.innerWidth > 959 ? 'transparent' : 'white'}
					justIcon={window.innerWidth > 959}
					simple={!(window.innerWidth > 959)}
					aria-owns={openProfile ? 'profile-menu-list-grow' : null}
					aria-haspopup="true"
					onClick={handleClickProfile('bottom-end')}
					className={classes.buttonLink}
				>
					<AccountCircleIcon />
				</Button>
				<Popper
					open={Boolean(openProfile)}
					anchorEl={anchorEl}
					placement={placement}
					transition
					disablePortal
					className={
						classNames({ [classes.popperClose]: !openProfile }) +
						' ' +
						classes.popperNav
					}
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							id="profile-menu-list-grow"
							style={{
								transformOrigin:
									placement === 'bottom' ? 'center top' : 'center bottom',
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleCloseProfile}>
									<MenuList role="menu">
										<MenuItem
											onClick={handleCloseProfile}
											className={classes.dropdownItem}
										>
											Profile
										</MenuItem>
										<MenuItem
											onClick={handleCloseProfile}
											className={classes.dropdownItem}
										>
											Settings
										</MenuItem>
										<Divider light />
										<MenuItem onClick={logout} className={classes.dropdownItem}>
											Logout
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
}
