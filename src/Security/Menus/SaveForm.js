import React from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { Row, Col, Form, Label, Button } from 'reactstrap';
import { renderField, renderFieldSelect } from '../../../share/Fields';
import Swal from 'sweetalert2';

const RenderRadioBtn = ({ value, Libelle, onChangeHandler, checked }) => {
  return <Label className="radio space">
    <input type='radio'
      value={value}
      defaultChecked={checked}
      name={'radio'}
      onChange={e => onChangeHandler(e)}
    />
    <span className="checkmark"></span>
    {Libelle}
  </Label>;
};

function SaveForm(props) {
  const [visibility, setVisibility] = React.useState('lien');
  const [ParentMenuId, setParentMenuId] = React.useState('');

  const onChangeRadios = e => {
    setVisibility(e.target.value);
  };

  const onChangeHandler = (name, value) => {
    if (name === 'ParentMenuId') setParentMenuId(value);
  };

  const onSubmit = values => {
    const { createMenu, createMenuItem } = props;
    const objectToCreate = {
      ...values,
      ParentMenuId: visibility !== 'parent' ? values.ParentMenuId : null,
      Icon: visibility === 'parent' ? values.Icon : '',
      Code: values.Nom,
      Area: values.Nom,
      IsDisplayedInMenu: true
    };

    if (visibility !== 'lien') {
      createMenu({ Item: objectToCreate }).then(r => {
        if (r) {
          Swal.fire('Attention', 'Menu was Created Successfully').then(() => {
          });
        }
      });
    }
    else {
      createMenuItem({ Item: objectToCreate }).then(r => {
        if (r) {
          Swal.fire('Attention', 'Link was Created Successfully').then(() => {
          });
        }
      });
    }
  };

  const { Menus } = props;
  const menuTypes = [
    { Id: 1, value: 'parent', Libelle: 'Parent', onChangeRadios, checked: false },
    { Id: 2, value: 'menu', Libelle: 'Menu de rattachement', onChangeRadios, checked: false },
    { Id: 3, value: 'lien', Libelle: 'Lien', onChangeRadios, checked: true }
  ];
  return (
    <React.Fragment>
      <div>
        <h4>Nouveau élément</h4>
        <hr />
        <Row className='space'>
          <Col xl="3" lg="3" md="3" sm="3" xs="3">
            {
              menuTypes.map(type => {
                return <RenderRadioBtn
                  key={type.Id}
                  value={type.value}
                  Libelle={type.value}
                  onChangeHandler={type.onChangeRadios}
                  checked={type.checked}
                />;
              })
            }
          </Col>
        </Row>
        <Form onSubmit={props.handleSubmit(onSubmit)}>
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
                onChange={onChangeHandler}
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
    </React.Fragment>
  );
};

export default reduxForm({
  form: 'MenuForm'
})(SaveForm);