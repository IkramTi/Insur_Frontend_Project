import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// @material-ui/icons

// core components
import styles from 'assets/jss/material-dashboard-react/components/cardStyle';

const useStyles = makeStyles(styles);

export const CardHeader = ({ className, children, header, ...rest }) => {
	const classes = useStyles();

	const cardHeaderClasses = classNames({
		[classes.cardHeader]: true,
		[className]: className !== undefined,
	});

	return (
		<div className={cardHeaderClasses} {...rest}>
			{header && (
				<>
					{header.icon}
					<span className={classes.labelHeader}>{header.title}</span>
				</>
			)}
			{children}
		</div>
	);
};

CardHeader.propTypes = {
	className: PropTypes.string,
	header: PropTypes.array,
	children: PropTypes.node,
};

export default CardHeader;
