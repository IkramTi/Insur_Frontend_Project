import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import {
  Button, Label, Card, CardBody, CardHeader, Col,
  Row, Form, Collapse
} from 'reactstrap';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import { renderField, renderFieldSelect } from '../../share/Fields';
import { Menu_service, MenuItem_service } from '../../services/Security';
import { MXHeader } from '../../components';

class Menus extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCustom = this.toggleCustom.bind(this);

    this.state = {
      component: null,
      params: null,
      modal: true,
      selectedRow: null,
      edit: false,
      collapse: false,
      accordion: [true, false, false],
      tab: 0,
      status: 'Closed',
      fadeIn: true,
      timeout: 300
    };
  }

  loading = (component, params) => {
    this.setState({ component, params });
  }

  toggleCustom(tab) {
    const prevTab = this.state.tab;
    tab = prevTab === tab ? 0 : tab;
    this.setState({ tab });
  }

  toggle = (e, selectedRow, edit) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      modal: !this.state.modal,
      selectedRow,
      edit
    });
  }

  componentDidMount() {
    this.props.fetchMenu();
    this.props.fetchMenuItem();
  }

  render() {
    const { modal, tab, params } = this.state;
    const { Menus, MenuItems } = this.props;
    return (
      <React.Fragment>
        <Card>
          {/* Show Navigation*/}
          <CardHeader>
            <MXHeader Title={'Menus'} >
              {modal ?
                <Button className="btn-square" color="success" onClick={e => this.toggle(e)} >  <i className='fa fa-plus' />  </Button>
                :
                <Button className="btn-square" color="primary" onClick={e => this.toggle(e)} >  <i className='fa fa-arrow-left' />  </Button>
              }
            </MXHeader>
          </CardHeader>
          <CardBody>
            {
              modal ?
                Menus.filter(o => o.ParentMenuId === null).map(parent => {
                  let submenu = Menus.filter(o => o.ParentMenuId === parent.Id);
                  return <div key={parent.Id} className="item space">
                    <Button
                      block
                      color='primary'
                      className="m-2 p-1 btn-square"
                      onClick={() => this.toggleCustom(parent.Id)}
                      aria-expanded={tab === parent.Id}
                      aria-controls="exampleAccordion1"
                    >
                      <i className={`mr-2 fa fa-${parent.Icon}`} /><strong>{parent.Nom}</strong>
                    </Button>
                    <Collapse isOpen={tab === parent.Id} data-parent="#exampleAccordion" id="exampleAccordion1">
                      {
                        submenu.map(item => {
                          return <div key={item.Id} className='space ml-4' >
                            <h6>{item.Nom} </h6>
                            {
                              MenuItems.filter(o => o.MenuId === item.Id).map(navItem => {
                                return <div key={navItem.Id} className='space ml-4' >
                                  <p> - {navItem.Nom}</p>
                                </div>;
                              })
                            }
                          </div>;
                        })
                      }
                    </Collapse>
                  </div>;
                })
                :
                <SaveForm loading={this.loading} params={params} toggle={this.toggle} />
            }
          </CardBody>
          {/* Show DataGrid */}
        </Card>
      </React.Fragment>
    );
  }

  renderComponent = (component, params) => {
    switch (component) {
    case 'SaveForm':
      return <SaveForm loading={this.loading} params={params} />;
    default:
      return <div id="exampleAccordion" data-children=".item">
        {this.renderCollapseItem()}
      </div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    Menus: state.Profil.Menus,
    MenuItems: state.Profil.MenuItems
  };
}

const connected = connect(mapStateToProps, {
  fetchMenu: Menu_service.fetch, fetchMenuItem: MenuItem_service.fetch
})(Menus);
export default connected;

class SaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: 'lien',
      ParentMenuId: ''
    };
  }

  componentDidUpdate(prevProps) {
    const { Menus, MenuItems, loading } = this.props;
    if ((prevProps.Menus !== Menus && Menus.successful) ||
      (prevProps.MenuItems !== MenuItems && MenuItems.successful)) {
      loading(null, null);
    }
  }

  onChangeRadios = e => {
    this.setState({ visibility: e.target.value });
  }

  onChangeHandler(name, value) {
    if (name === 'ParentMenuId') {
      this.setState({ ParentMenuId: value });
    }
  }

  onSubmit = values => {
    const { visibility } = this.state;
    const { toggle } = this.props;
    const objectToCreate = {
      ...values,
      ParentMenuId: visibility !== 'parent' ? values.ParentMenuId : null,
      Icon: visibility === 'parent' ? values.Icon : '',
      Code: values.Nom,
      Area: values.Nom,
      IsDisplayedInMenu: true
    };

    if (visibility !== 'lien') {
      Menu_service.create({ Item: objectToCreate }).then(r => {
        if (r) {
          Swal.fire('Attention', 'Menu was Created Successfully').then(() => {
            toggle();
          });
        }
      });
    }
    else {
      MenuItem_service.create({ Item: objectToCreate }).then(r => {
        if (r) {
          Swal.fire('Attention', 'Link was Created Successfully').then(() => {
            toggle();
          });
        }
      });
    }
  }

  render() {
    const { Menus } = this.props;
    const { visibility, ParentMenuId } = this.state;
    return (
      <div>
        <h4>Nouveau élément</h4>
        <hr />
        <Row className='space'>
          <Col xl="3" lg="3" md="3" sm="3" xs="3">
            {this.renderRadioBtn('parent', 'Parent', this.onChangeRadios, false)}
            {this.renderRadioBtn('menu', 'Menu de rattachement', this.onChangeRadios, false)}
            {this.renderRadioBtn('lien', 'Lien', this.onChangeRadios, true)}
          </Col>
        </Row>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Row>
            <Col xl="12" lg="12" md="12" sm="12" xs="12">
              <Field
                name="Nom"
                type="text"
                id="Nom"
                component={renderField}
                label='Nom'
              />
              <Field
                name="Icon"
                type="text"
                id="Icon"
                component={renderField}
                label='Icon'
                disabled={visibility !== 'parent' ? true : false}
              />
              <Field
                name="ParentMenuId"
                type="select"
                id="ParentMenuId"
                component={renderFieldSelect(Menus.filter(o => o.ParentMenuId === null), 'Nom')}
                label='Parent'
                isDisabled={visibility === 'parent' ? true : false}
                onChange={this.onChangeHandler.bind(this, 'ParentMenuId')}
              />
              <Field
                name="MenuId"
                type="select"
                id="MenuId"
                component={renderFieldSelect(Menus.filter(o => o.ParentMenuId === ParentMenuId), 'Nom')}
                label='Menu de rattachement'
                isDisabled={visibility === 'lien' ? false : true}
              />
              <Field
                name="Lien"
                type="text"
                id="Lien"
                component={renderField}
                label='Lien'
                disabled={visibility === 'lien' ? false : true}
              />

              <Field
                name="Description"
                type="text"
                id="Description"
                component={renderField}
                label='Description'
                disabled={visibility === 'lien' ? true : false}
              />
            </Col>

          </Row>
          <br />
          <Button className="btn-square" color="success" type="submit">
            <i className="fa fa-save" /> Sauvegarder
          </Button>
        </Form>
      </div>
    );
  }

  renderRadioBtn = (value, Libelle, onChangeHandler, checked) => {
    return <Label className="radio space">
      <input type='radio'
        value={value}
        defaultChecked={checked}
        name={'radio'}
        onChange={onChangeHandler}
      />
      <span className="checkmark"></span>
      {Libelle}
    </Label>;
  }
}


SaveForm = reduxForm({
  form: 'PDT_Form'
})(
  connect(state => ({
    Menus: state.Profil.Menus,
    MenuItems: state.Profil.MenuItems
  }), {})(SaveForm)
);

