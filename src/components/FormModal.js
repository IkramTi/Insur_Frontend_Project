import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	root: {
		overflow: 'visible',
		backgroundColor: 'aliceblue',
	},
	DialogTitle: {
		margin: 0,
		padding: '12px 24px',
		color: '#046ead',
		fontSize: '1.2rem',
		fontWeight: 400,
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: '5px',
		color: 'rgba(0,0,0,0.54)',
	},
	DialogContent: {
		padding: '8px 100px',
	},
	DialogActions: {
		marginTop: '2rem',
		padding: theme.spacing(1),
		textAlign: 'center',
	},
	titleIcon: {
		color: '#046ead',
		marginRight: '1rem',
	},
	icon: {
		marginRight: '1rem',
		color: '#fff',
	},
}));

export default function FormDialog({
	title,
	open,
	setOpen,
	children,
	onSubmit,
	handleSubmit,
	TitleIcon,
	edit,
}) {
	const classes = useStyles();
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
			classes={{ paperScrollPaper: classes.root }}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle className={classes.DialogTitle}>
					<TitleIcon className={classes.titleIcon} />
					{title}
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent className={classes.DialogContent}>{children}</DialogContent>
				<DialogActions className={classes.DialogActions}>
					<Button variant="contained" type="submit" color="primary">
						{edit ? (
							<EditIcon className={classes.icon} />
						) : (
							<AddIcon className={classes.icon} />
						)}
						{edit ? 'Modifier' : 'Ajouter'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
