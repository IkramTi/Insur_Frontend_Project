import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import Card from 'components/Card';
import CardBody from 'components/CardBody';
import ClientIdentityForm from './ClientIdentityForm';
import ClientInfoForm from './ClientInfoForm';

const ClientInfo = (props) => {
	const [isCorporate, setIsCorporate] = useState(false);
	const { countries, idTypes, natureBusiness, cities } = useSelector(
		(state) => ({
			countries: state.Referentiel.refPaysLibelles,
			idTypes: state.Referentiel.idTypeLibelles,
			natureBusiness: state.Referentiel.natureBusinessLibelles,
			cities: state.Referentiel.refVilleLibelles,
		}),
	);

	const handleCorporateSwitch = (e) => {
		setIsCorporate(e.target.checked);
		props.initialize({ isCorporate: e.target.checked });
	};

	return (
		<>
			<Card
				style={{ backgroundColor: 'rgb(232, 243, 251)' }}
				className="rounded-0"
			>
				<CardBody>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<ClientIdentityForm
								cities={cities}
								countries={countries}
								idTypes={idTypes}
								natureBusiness={natureBusiness}
								isCorporate={isCorporate}
								handleCorporateSwitch={handleCorporateSwitch}
							/>
						</Grid>
						<Grid item xs={6}>
							<ClientInfoForm
								countries={countries}
								cities={cities}
								isCorporate={isCorporate}
							/>
						</Grid>
					</Grid>
				</CardBody>
			</Card>
		</>
	);
};

const formed = reduxForm({
	form: 'clientInfo',
	destroyOnUnmount: false,
})(ClientInfo);

export default formed;
