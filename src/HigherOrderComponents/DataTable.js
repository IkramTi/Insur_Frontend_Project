import React, { Component } from 'react';
// import Swal from 'sweetalert2';
import { connect } from 'react-redux';

function GridHOC(WrappedComponent, service) {
	class MXGrid extends Component {
		constructor(props) {
			super(props);
			this.data = {};
		}

		componentDidMount() {
			this.props.fetchData();
		}

		removeRow = (row) => {
			// Swal.fire({
			//   title: 'Are you sure?',
			//   text: 'You won\'t be able to revert this!',
			//   icon: 'warning',
			//   showCancelButton: true,
			//   confirmButtonColor: '#3085d6',
			//   cancelButtonColor: '#d33',
			//   confirmButtonText: 'Yes, delete it!'
			// }).then(result => {
			//   if (result.value) {
			//     this.props.delete(row.Id).then(() => {
			//       Swal.fire(
			//         'Deleted!',
			//         'Your Data has been deleted.',
			//         'success'
			//       );
			//     });
			//   }
			// });
		};

		render() {
			return <WrappedComponent remove={this.removeRow} {...this.props} />;
		}
	}

	return connect(null, { fetchData: service.fetchData })(MXGrid);
}

export default GridHOC;
