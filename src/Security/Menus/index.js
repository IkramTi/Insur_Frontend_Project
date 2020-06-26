import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import 'react-widgets/dist/css/react-widgets.css';
import { Menu_service, MenuItem_service } from '../../../services/Security';
import { MXHeader } from '../../../components';
import SaveForm from './SaveForm';
import DT from './DT';

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
    const { modal, params } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <MXHeader Title={'Menus'} >
              {
                modal
                  ? <Button className="btn-square" color="success" onClick={e => this.toggle(e)} >  <i className='fa fa-plus' />  </Button>
                  : <Button className="btn-square" color="primary" onClick={e => this.toggle(e)} >  <i className='fa fa-arrow-left' />  </Button>
              }
            </MXHeader>
          </CardHeader>
          <CardBody>
            {
              modal
                ? <DT {...this.props} />
                : <SaveForm loading={this.loading} params={params} toggle={this.toggle} {...this.props} />
            }
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    Menus: state.Profil.Menus,
    MenuItems: state.Profil.MenuItems
  };
}

const connected = connect(mapStateToProps, {
  fetchMenu: Menu_service.fetch,
  fetchMenuItem: MenuItem_service.fetch,
  createMenu: Menu_service.create,
  createMenuItem: MenuItem_service.update
})(Menus);
export default connected;