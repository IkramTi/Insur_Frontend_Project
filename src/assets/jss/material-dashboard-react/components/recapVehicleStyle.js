const recapVehicleStyle = (theme) => ({
	cardBorderSelected: {
		border: '1px solid #046ead',
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.grey[700]
				: theme.palette.grey[200],
	},
	cardHeaderSelected: {
		backgroundColor: '#046ead',
		color: '#fff',
	},
	image: {
		width: '3rem',
	},
	primaryLabel: {
		color: '#3D85C7',
		fontWeight: 500,
		fontSize: '0.9rem',
	},
	iconButton: {
		padding: 0,
		color: '#003d58',
	},
});

export default recapVehicleStyle;
