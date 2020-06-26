import React from 'react';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { FormModal, renderTextField } from 'components';

function SaveForm({
	open,
	setOpen,
	onSubmit,
	handleSubmit,
	edit,
	title,
	icon,
}) {
	return (
		<FormModal
			open={open}
			title={`${edit ? 'Modifier' : 'Ajout'}` + ' ' + title}
			setOpen={setOpen}
			onSubmit={onSubmit}
			handleSubmit={handleSubmit}
			TitleIcon={icon}
			edit={edit}
		>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Field
						name="abrege"
						type="text"
						id="abrege"
						component={renderTextField}
						label="Abrégé"
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
						name="libelle"
						type="text"
						id="libelle"
						component={renderTextField}
						label="Libellé"
					/>
				</Grid>
			</Grid>
		</FormModal>
	);
}

export default SaveForm;
