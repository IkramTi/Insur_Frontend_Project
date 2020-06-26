/*eslint-disable*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons components
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
	const classes = useStyles();
	const expandedSettings = [];
	props.routes.map((item, key) => {
		if (item.children !== undefined) {
			expandedSettings.push({ id: key, open: true });
		}
	});
	const [expanded, setExpanded] = React.useState(expandedSettings);

	const handleClick = (key) => {
		setExpanded(
			expanded.map((el) => (el.id === key ? { ...el, open: !el.open } : el)),
		);
		//setExpanded(newExpanded)
	};
	// verifies if routeName is the one active (in browser input)
	function activeRoute(routeName) {
		return window.location.href.indexOf(routeName) > -1 ? true : false;
	}
	const { color, image, routes } = props;
	var links = (
		<List className={classes.list}>
			{routes.map((prop, key) => {
				const listItemClasses = classNames({
					[' ' + classes[color]]: activeRoute(prop.layout + prop.path),
				});
				const whiteFontClasses = classNames({
					[' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
				});
				return (
					prop.active === 1 && (
						<div className={classes.parentContainer}>
							<ListItem
								button
								className={classes.itemLink + listItemClasses}
								onClick={() => handleClick(key)}
							>
								{typeof prop.icon === 'string' ? (
									<Icon className={classNames(classes.itemIcon, whiteFontClasses)}>
										{prop.icon}
									</Icon>
								) : (
									<prop.icon
										className={classNames(classes.itemIcon, whiteFontClasses)}
									/>
								)}
								<ListItemText
									primary={prop.name}
									className={classes.itemText}
									disableTypography={true}
								/>
								{expanded.find((e) => e.id === key).open ? (
									<ExpandLess className={classes.itemIcon} />
								) : (
									<ExpandMore className={classes.itemIcon} />
								)}
							</ListItem>
							<Collapse
								in={expanded.find((e) => e.id === key).open}
								className={classes.collapse}
								timeout="auto"
								unmountOnExit
							>
								<List component="div" disablePadding>
									{prop.children.map((child) => {
										const listItemChildClasses = classNames({
											[' ' + classes[color]]: activeRoute(child.layout + child.path),
										});
										const whiteFontChildClasses = classNames({
											[' ' + classes.whiteFont]: activeRoute(child.layout + child.path),
										});
										return (
											<NavLink
												to={child.layout + child.path}
												className={classes.item}
												activeClassName="active"
												key={key}
											>
												<ListItem
													button
													className={classes.itemLink + listItemChildClasses}
												>
													{typeof child.icon === 'string' ? (
														<Icon
															className={classNames(classes.itemIcon, whiteFontChildClasses)}
														>
															{child.icon}
														</Icon>
													) : (
														<child.icon
															className={classNames(classes.itemIcon, whiteFontChildClasses)}
														/>
													)}
													<ListItemText
														primary={child.name}
														className={classNames(classes.itemText, whiteFontChildClasses)}
														disableTypography={true}
													/>
												</ListItem>
											</NavLink>
										);
									})}
								</List>
							</Collapse>
						</div>
					)
				);
			})}
		</List>
	);

	return (
		<div>
			<Drawer
				anchor="left"
				variant="persistent"
				open={props.open}
				classes={{
					paper: classNames(classes.drawerPaper),
				}}
			>
				<div className={classes.sidebarWrapper}>{links}</div>
				{image !== undefined ? (
					<div
						className={classes.background}
						style={{ backgroundImage: 'url(' + image + ')' }}
					/>
				) : null}
			</Drawer>
		</div>
	);
}

Sidebar.propTypes = {
	handleDrawerToggle: PropTypes.func,
	image: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
	open: PropTypes.bool,
};
