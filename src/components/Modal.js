import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
	DialogTitle: {
		margin: 0,
		padding: '8px 24px',
		backgroundColor: '#003d58',
		color: '#fff',
		fontSize: '1.2rem',
		fontWeight: 400,
	},
}));

export default function FormDialog({ title, open, setOpen, children }) {
	const classes = useStyles();
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
			<DialogTitle className={classes.DialogTitle}>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}
