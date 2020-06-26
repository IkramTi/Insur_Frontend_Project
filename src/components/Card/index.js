import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import styles from 'assets/jss/material-dashboard-react/components/cardStyle';

const useStyles = makeStyles(styles);

export const Card = ({ className, children, header, ...rest }) => {
	const classes = useStyles();

	const cardClasses = classNames({
		[classes.card]: true,
		[className]: className !== undefined,
	});

	return (
		<div className={cardClasses} {...rest}>
			{children}
		</div>
	);
};

Card.propTypes = {
	className: PropTypes.string,
	header: PropTypes.array,
	children: PropTypes.node,
};

export default Card;
