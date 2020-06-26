import React, { Component } from 'react'
import { connect } from 'react-redux'
// Tags
import {
    Card,
    CardBody,
    CardHeader,
    Button
} from 'reactstrap';
// Components
import { MXHeader, MXModal } from '../../../components';
import MXGrid from './DT';
import MXSaveForm from './SaveForm';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            component: null,
            params: null,
            modal: false,
            selectedRow: null,
            edit: false
        }
    }

    toggle = (e, selectedRow, edit) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal,
            selectedRow,
            edit
        })
    }

    render() {
        const { selectedRow, modal, edit } = this.state;
        const { className } = this.props;
        return (
            <React.Fragment>
                <Card>
                    {/* Show Navigation*/}
                    <CardHeader>
                        <MXHeader Title={'Users'} >
                            <Button className="btn-square" color="success" onClick={(e) => this.toggle(e)} >  <i className='fa fa-plus' />  </Button>
                        </MXHeader>
                    </CardHeader>
                    {/* Show DataGrid */}
                    <CardBody>
                        <MXGrid toggle={this.toggle} {...this.props} />
                    </CardBody>
                </Card>
                {/* Show saveForm inside modal */}
                <MXModal title="User" modal={modal} toggle={this.toggle} className={className} style={{ top: "0" }} >
                    <MXSaveForm edit={edit} selectedRow={selectedRow} {...this.props} />
                </MXModal>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state =>
    ({
        Users: state.Profil.Users,
        Roles: state.Profil.Roles,
    })

const connected = connect(mapStateToProps, {})(Users)

export default connected