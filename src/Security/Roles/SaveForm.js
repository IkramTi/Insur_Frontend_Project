import React, { Component } from 'react';
import classnames from 'classnames';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import validate from './validate';
// Tags
import {
    Card,
    CardBody,
    Button,
    Row,
    Col,
    Nav,
    Label,
    TabContent,
    NavItem,
    NavLink,
    TabPane,
    ListGroup,
    ListGroupItem,
    Form
} from 'reactstrap';
import { Field } from 'redux-form';
// Components
import { renderField } from '../../../share/Fields';
import Swal from 'sweetalert2';
import { Role_service } from '../../../services/Security';

class MXSaveForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            ParentMenuId: 21,
            RolesMenuItem: props.selectedRow ? props.selectedRow.RolesMenuItem : []
        }
    }

    componentDidMount() {
        const { initialize, selectedRow } = this.props;
        if (selectedRow) {
            initialize(selectedRow)
        }
    }

    toggle = (tab) => {
        const { ParentMenuId } = this.state
        if (ParentMenuId !== tab) {
            this.setState({ ParentMenuId: tab });
        }
    }

    toggleItems = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    onChangePermissions = (MenuId, PermissionId, event) => {
        const { RolesMenuItem } = this.state;
        var checked = event.target.checked
        var roles = RolesMenuItem,
            permissions = RolesMenuItem.find(role => role.MenuItemId === MenuId);
        if (checked) {
            if (permissions) {
                roles = roles.filter(role => role.MenuItemId !== MenuId);
                roles.push({ MenuItemId: MenuId, RolesMenuItemPermission: [...permissions.RolesMenuItemPermission, PermissionId] });
            }
            else {
                roles.push({ MenuItemId: MenuId, RolesMenuItemPermission: [PermissionId] });
            }
        }
        else {
            // Super check 
            if (permissions) {
                roles = roles.filter(role => role.MenuItemId !== MenuId);
                if (permissions.RolesMenuItemPermission.length !== 1) {
                    roles.push({ MenuItemId: MenuId, RolesMenuItemPermission: permissions.RolesMenuItemPermission.filter(p => p !== PermissionId) });
                }
            }
        }

        this.setState(Object.assign({}, this.state, {
            RolesMenuItem: roles
        }))
    }

    onChangeCheckedList = (MenuItemId, event) => {
        const { Permissions } = this.props
        const { RolesMenuItem } = this.state;
        var checked = event.target.checked
        var roles = RolesMenuItem;
        if (checked) {
            roles = roles.filter(role => role.MenuItemId !== MenuItemId);
            roles.push({ MenuItemId, RolesMenuItemPermission: Permissions.map(e => e.Id) });
        }
        else {
            roles = roles.filter(role => role.MenuItemId !== MenuItemId);
        }
        this.setState(Object.assign({}, this.state, {
            RolesMenuItem: roles
        }))
    }

    Save = values => {
        const { edit, selectedRow, toggle } = this.props;
        const { RolesMenuItem } = this.state;
        var pSelectMenuItemIds = [], pSelectPermissionMenuItemIds = [];
        RolesMenuItem.forEach(role => {
            pSelectMenuItemIds.push(role.MenuItemId);
            pSelectPermissionMenuItemIds.push(...role.RolesMenuItemPermission.map(p => (role.MenuItemId + '-' + p)))
        })
        const objectToSave = {
            ...values,
            pSelectMenuItemIds,
            pSelectPermissionMenuItemIds
        }

        if (edit) {
            objectToSave.Id = selectedRow.Id;
            this.props.update(objectToSave).then(r => {
                if (r) {
                    Swal.fire('Attention', 'Role was Updated Successfully').then(r => {
                        toggle();
                    })
                }
            });
        } else {
            this.props.create(objectToSave).then(r => {
                if (r) {
                    Swal.fire('Attention', 'Role was Created Successfully').then(r => {
                        toggle();
                    })
                }
            });
        }
    }

    render() {
        const props = this.props
        const { ParentMenuId, activeTab } = this.state
        var RolesMenuItem = this.state.RolesMenuItem;
        var Menus = props.Menus.filter(o => o.ParentMenuId === null);
        return (
            <Form onSubmit={props.handleSubmit(this.Save)}>
                <Row className="space">
                    <Col xl="4" lg="4" md="4" sm="4" xs="4">
                        <Field
                            name="Code"
                            type="text"
                            id="Code"
                            component={renderField}
                            label='Code'
                        />
                    </Col>
                    <Col xl="4" lg="4" md="4" sm="4" xs="4">
                        <Field
                            name="Name"
                            type="text"
                            id="Name"
                            component={renderField}
                            label='Nom du rôle'
                        />
                    </Col>
                    <Col xl="4" lg="4" md="4" sm="4" xs="4">
                        <Field
                            name="Description"
                            id="Description"
                            type="text"
                            component={renderField}
                            label='Description'
                        />
                    </Col>
                </Row>
                <h5>Menu Items & Permissions</h5>
                <Card className="card-accent-primary space">
                    <CardBody>
                        <Nav tabs className='space'>
                            <RenderNavMenus
                                Menus={Menus}
                                ParentMenuId={ParentMenuId}
                                toggle={this.toggle}
                            />
                        </Nav>
                        <TabContent activeTab={ParentMenuId}>
                            {
                                Menus.map(menu => {
                                    let SubMenus = props.Menus.filter(o => o.ParentMenuId === menu.Id)
                                    return <TabPane key={menu.Id} tabId={menu.Id}>
                                        <Row>
                                            <Col md='3' className='border-right' >
                                                <ListGroup id="list-tab" role="tablist">
                                                    <RenderNavSubMenus
                                                        toggleItems={this.toggleItems}
                                                        SubMenus={SubMenus}
                                                        activeTab={activeTab}
                                                    />
                                                </ListGroup>
                                            </Col>
                                            <Col md='9'>
                                                <TabContent activeTab={activeTab}>
                                                    <RenderSubMenusContent
                                                        MenuItems={props.MenuItems}
                                                        RolesMenuItem={RolesMenuItem}
                                                        SubMenus={SubMenus}
                                                        Permissions={props.Permissions}
                                                        onChangeCheckedList={this.onChangeCheckedList}
                                                        onChangePermissions={this.onChangePermissions}
                                                    />
                                                </TabContent>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                })
                            }
                        </TabContent>
                    </CardBody>
                </Card>
                <br />
                <Button className="btn-square" color="success" type="submit">
                    <i className="fa fa-save" /> Sauvegarder
				</Button>
            </Form>
        );
    }
}

var RenderNavMenus = ({ Menus, ParentMenuId, toggle }) =>
    (
        Menus.map(menu => (
            <NavItem key={menu.Id}>
                <NavLink
                    className={classnames({ active: ParentMenuId === menu.Id })}
                    onClick={() => { toggle(menu.Id); }}>
                    {menu.Nom}
                </NavLink>
            </NavItem>))
    )

var RenderNavSubMenus = ({ SubMenus, toggleItems, activeTab }) =>
    (
        SubMenus.map(submenu => (
            <ListGroupItem
                key={submenu.Id}
                onClick={() => toggleItems(submenu.Id)}
                action
                active={activeTab === submenu.Id} >
                {submenu.Nom}
            </ListGroupItem>
        ))
    )

var RenderSubMenusContent = ({ MenuItems, RolesMenuItem, SubMenus, Permissions, onChangeCheckedList, onChangePermissions }) => {
    let columns = Permissions.map(e => (
        {
            dataField: 'Permissions' + e.Id, Id: e.Id, text: e.Nom,
            formatter: (cell, row) => {
                return (
                    <Label key={e.Id} className="checkbox">
                        <input type='checkbox'
                            checked={row.Permissions.includes(e.Id)}
                            value={row.Permissions.includes(e.Id)}
                            // defaultChecked={false}
                            onChange={(event) => { onChangePermissions(row.Id, e.Id, event); }}
                        />
                        <span className="checkmark" />
                    </Label>
                );
            }
        }));
    columns.unshift({
        dataField: 'MenuName', text: 'Menu',
        formatter: (cell, row) => {
            return (
                <Label className="checkbox">
                    <input type='checkbox'
                        checked={row.All}
                        value={row.All}
                        // defaultChecked={false}
                        onChange={(event) => { onChangeCheckedList(row.Id, event); }}
                    />
                    <span className="checkmark" />
                    {cell}
                </Label>
            );
        }
    })
    let data = MenuItems.map(menu => {
        var roleMenus = RolesMenuItem.find(e => e.MenuItemId === menu.Id),
            permissions = roleMenus ? roleMenus.RolesMenuItemPermission : [],
            data = {
                Id: menu.Id,
                MenuId: menu.MenuId,
                MenuName: menu.Nom,
                Permissions: permissions,
                All: permissions.length === Permissions.length
            }
        return data;
    })
    return (
        SubMenus.map(submenu => (
            <TabPane key={submenu.Id} tabId={submenu.Id}>
                <ToolkitProvider
                    keyField="Id"
                    data={data.filter(o => o.MenuId === submenu.Id)}
                    columns={columns}
                >
                    {props => (
                        <div>
                            <BootstrapTable
                                {...props.baseProps}
                                pagination={paginationFactory()}
                                noDataIndication={'No Data'}
                                hover
                                condensed
                            />
                        </div>
                    )}
                </ToolkitProvider>
            </TabPane>))
    )
}
const connected = connect(null, {
    create: Role_service.create,
    update: Role_service.update
})(MXSaveForm);
export default reduxForm({ form: 'Role', validate })(connected);