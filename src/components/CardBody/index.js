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

export const CardBody = ({ className, children, ...rest }) => {
	const classes = useStyles();

	const cardBodyClasses = classNames({
		[classes.cardBody]: true,
		[className]: className !== undefined,
	});

	return (
		<div className={cardBodyClasses} {...rest}>
			{children}
		</div>
	);
};

CardBody.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default CardBody;
