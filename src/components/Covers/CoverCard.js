import React, { useState } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// @material-ui/icons
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

// core components
import coverStyle from 'assets/jss/material-dashboard-react/components/coverStyle';
import PackIcon from './PackIcon';

const useStyles = makeStyles(coverStyle);

const CoverCard = ({
	className,
	cover,
	handleModalOpen,
	onSelectCover,
	coverSelected,
	customCover,
}) => {
	const classes = useStyles();

	const cardClasses = (coverSelected) =>
		classNames({
			[classes.coverCard]: true,
			[classes.coverCardSelected]: coverSelected,
			[className]: className !== undefined,
		});

	const cardHeaderClasses = (coverSelected) =>
		classNames({
			[classes.cardHeader]: true,
			[classes.cardHeaderSelected]: coverSelected,
		});

	return (
		<Card className={cardClasses(coverSelected)}>
			<div className={cardHeaderClasses(coverSelected)}>
				<span>{cover.title}</span>
				{cover.editModal && coverSelected ? (
					<EditIcon
						style={{ cursor: 'pointer', marginLeft: 5 }}
						onClick={handleModalOpen}
					/>
				) : null}
				{cover.detailModal && coverSelected ? (
					<VisibilityIcon
						style={{ cursor: 'pointer', marginLeft: 5 }}
						onClick={handleModalOpen}
					/>
				) : null}
			</div>
			<CardContent className="p-0 text-center">
				<PackIcon
					name={cover.icon}
					className="image"
					classes={classes}
					coverSelected={coverSelected}
				/>
				<Typography variant="body1">{cover.description}</Typography>
			</CardContent>
			{!customCover && (
				<CardActions>
					<Button
						onClick={() => onSelectCover(cover)}
						fullWidth
						variant="contained"
						disabled={coverSelected}
					>
						{coverSelected ? 'Selected' : 'Select'}
					</Button>
				</CardActions>
			)}
		</Card>
	);
};

CoverCard.propTypes = {
	className: PropTypes.string,
	cover: PropTypes.object.isRequired,
};

export default CoverCard;
