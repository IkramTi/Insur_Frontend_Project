
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
import { MXHeader } from '../../../components';
import { Menu_service, MenuItem_service, Permission_service } from '../../../services/Security';
import MXGrid from './DT';
import MXSaveForm from './SaveForm';

class Roles extends Component {
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
        if (e) {
            e.preventDefault();
        }
        this.setState({
            modal: !this.state.modal,
            selectedRow,
            edit
        })
    }

    componentDidMount() {
        this.props.fetchMenu();
        this.props.fetchMenuItem();
        this.props.fetchPermission();
    }

    render() {
        const { selectedRow, modal, edit } = this.state;

        return (
            <React.Fragment>
                <Card>
                    {/* Show Navigation*/}
                    <CardHeader>
                        <MXHeader Title={'Roles'} >
                            {modal ?
                                <Button className="btn-square" color="primary" onClick={(e) => this.toggle(e)} >  <i className='fa fa-arrow-left' />  </Button>
                                :
                                <Button className="btn-square" color="success" onClick={(e) => this.toggle(e)} >  <i className='fa fa-plus' />  </Button>
                            }
                        </MXHeader>
                    </CardHeader>
                    <CardBody>
                        {modal ?
                            <MXSaveForm edit={edit} selectedRow={selectedRow} {...this.props} toggle={this.toggle} />
                            :
                            <MXGrid toggle={this.toggle} {...this.props} />
                        }
                    </CardBody>
                    {/* Show DataGrid */}
                </Card>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>
    ({
        Roles: state.Profil.Roles,
        Menus: state.Profil.Menus,
        MenuItems: state.Profil.MenuItems,
        Permissions: state.Profil.Permissions,
    })

const connected = connect(mapStateToProps, {
    fetchMenu: Menu_service.fetch,
    fetchMenuItem: MenuItem_service.fetch,
    fetchPermission: Permission_service.fetch
})(Roles)

export default connected