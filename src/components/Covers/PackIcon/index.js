import React from 'react';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

const PackIcon = ({ classes, className, name, coverSelected, ...props }) => {
	const imageClasses = classNames({
		[classes.image]: true,
		[className]: className !== undefined,
	});

	return (
		<Icon color={coverSelected ? 'primary' : 'default'} className={imageClasses}>
			{name}
		</Icon>
	);
};

export default PackIcon;
