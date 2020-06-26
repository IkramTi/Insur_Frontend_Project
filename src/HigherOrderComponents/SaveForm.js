import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { reduxForm } from 'redux-form';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function SaveFormHOC(
	WrappedComponent,
	service,
	name,
	validate,
	fetchActions = {},
) {
	class MXSaveForm extends Component {
		constructor(props) {
			super(props);
			this.data = {};
		}

		componentDidMount() {
			const { initialize, selectedRow, actions } = this.props;
			if (selectedRow) {
				initialize(selectedRow);
			}

			if (Object.keys(fetchActions).length > 0) {
				for (const action in actions) {
					actions[action]();
				}
			}
		}

		Save = (values) => {
			const { edit, selectedRow } = this.props;

			if (edit) {
				values.Id = selectedRow.Id;
				this.props.update(selectedRow.Id, values).then(() => {
					Swal.fire({ text: 'Saved Successfully', type: 'success' });
				});
			} else {
				this.props.create(values).then(() => {
					Swal.fire({ text: 'Saved Successfully', type: 'success' });
				});
			}
		};

		render() {
			const { handleSubmit } = this.props;

			return (
				<Form onSubmit={handleSubmit(this.Save)}>
					<WrappedComponent {...this.props} />
					<br />
					<Button className="btn-square" color="success" type="submit">
						<i className="fa fa-save" /> Sauvegarder
					</Button>
				</Form>
			);
		}
	}
	const mapDispatchToProps = (dispatch) => {
		return {
			actions: bindActionCreators(Object.assign({}, fetchActions), dispatch),
			create: (values) => dispatch(service.create(values)),
			update: (Id, values) => dispatch(service.update(Id, values)),
		};
	};
	const connected = connect(null, mapDispatchToProps)(MXSaveForm);
	return reduxForm({ form: name, validate })(connected);
}

export default SaveFormHOC;
