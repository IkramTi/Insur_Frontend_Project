import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import clsx from 'clsx';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes.js';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/smoke-0.jpg';
import logo from 'assets/img/saham-assurance.png';

let ps;

const switchRoutes = (
	<Switch>
		{routes.map((prop, key) => {
			if (prop.children !== undefined) {
				prop.children.map((child, key) => {
					if (child.layout === '/admin') {
						return (
							<Route
								path={prop.layout + prop.path}
								component={prop.component}
								key={key}
							/>
						);
					}
				});
			} else {
				if (prop.layout === '/admin') {
					return (
						<Route
							path={prop.layout + prop.path}
							component={prop.component}
							key={key}
						/>
					);
				}
			}
			return null;
		})}
		<Redirect from="/" to="/admin" />
	</Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
	// styles
	const classes = useStyles();
	const { menuModels, activeModule } = useSelector((state) => ({
		menuModels: state.userInfo.menuModels,
		activeModule: state.userInfo.ActiveModule,
	}));
	// ref to help us initialize PerfectScrollbar on windows devices
	const mainPanel = React.createRef();
	// states and functions
	const [image] = React.useState(bgImage);
	const [color] = React.useState('blue');
	const [open, setOpen] = React.useState(true);

	const navigation = () => {
		let nav = [];
		nav =
			activeModule &&
			activeModule.childremenu.map((item, key) => {
				return {
					name: item.namemenu,
					path: '/admin',
					icon: item.iconmenu === null ? 'chevron_right' : item.iconmenu,
					active: 1,
					children: item.menuitems.map((p) => {
						return {
							name: p.name,
							path: '/' + p.name,
							icon: p.icon === null ? 'chevron_right' : p.icon,
							layout: '/admin',
						};
					}),
				};
			});
		return nav ? nav : [];
	};

	const handleDrawerToggle = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const getRoute = () => {
		return window.location.pathname !== '/admin/maps';
	};

	// initialize and destroy the PerfectScrollbar plugin
	React.useEffect(() => {
		if (activeModule === 0) {
			return rest.history.push('/home');
		} else {
			if (navigator.platform.indexOf('Win') > -1) {
				ps = new PerfectScrollbar(mainPanel.current, {
					suppressScrollX: true,
					suppressScrollY: false,
				});
				document.body.style.overflow = 'hidden';
			}
			// Specify how to clean up after this effect:
			return function cleanup() {
				if (navigator.platform.indexOf('Win') > -1) {
					ps.destroy();
				}
			};
		}
	}, [mainPanel]);

	return (
		<div className={classes.wrapper}>
			<Navbar
				logo={logo}
				handleDrawerToggle={handleDrawerToggle}
				handleDrawerClose={handleDrawerClose}
				open={open}
				show={true}
				{...rest}
			/>
			<Sidebar
				routes={navigation()}
				image={image}
				handleDrawerToggle={handleDrawerToggle}
				handleDrawerClose={handleDrawerClose}
				open={open}
				color={color}
				{...rest}
			/>
			<div
				className={clsx(classes.mainPanel, { [classes.fullWidth]: !open })}
				ref={mainPanel}
			>
				{/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
				{getRoute() ? (
					<div className={classes.content}>
						<div className={classes.container}>{switchRoutes}</div>
					</div>
				) : (
					<div className={classes.map}>{switchRoutes}</div>
				)}
			</div>
		</div>
	);
}
