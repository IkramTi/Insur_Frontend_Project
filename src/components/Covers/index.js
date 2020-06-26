import React from 'react';

import PropTypes from 'prop-types';
// @material-ui/core components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// core components
import CoverCard from './CoverCard';

const Covers = ({
	className,
	covers,
	handleModalOpen,
	onSelectCover,
	selectedCover,
}) => {
	return (
		<Container maxWidth="md" component="main">
			<Grid container spacing={5} alignItems="stretch">
				{covers.map((cover) => {
					const coverSelected = selectedCover && selectedCover.title === cover.title;

					return (
						<Grid item key={cover.id} xs={12} md={4}>
							<CoverCard
								className={className}
								cover={cover}
								handleModalOpen={handleModalOpen}
								onSelectCover={onSelectCover}
								coverSelected={coverSelected}
							/>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};

Covers.propTypes = {
	className: PropTypes.string,
	covers: PropTypes.array.isRequired,
};

export default Covers;
