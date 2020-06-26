import React from 'react';
import { Field } from 'redux-form';
import SaveFormHOC from '../../../commons/HOCs/SaveForm';
import { renderField, renderFieldSelectMulti } from '../../../share/Fields';
import { Account_service, Role_service } from '../../../services/Security';
import validate from './validate';

const MXSaveForm = props => {
    return (
        <React.Fragment>
            <Field
                name="FirstName"
                type="text"
                id="FirstName"
                component={renderField}
                label='Firstname'
            />
            <Field
                name="LastName"
                type="text"
                id="LastName"
                component={renderField}
                label='Lastname'
            />
            <Field
                name="Email"
                type="text"
                id="Email"
                component={renderField}
                label='Email'
            />
            <Field
                name="PhoneNumber"
                type="text"
                id="PhoneNumber"
                component={renderField}
                label='Téléphone'
            />
            <Field
                name="userRoles"
                type="select"
                id="userRoles"
                component={renderFieldSelectMulti(props.Roles, 'Name')}
                label='Roles'
            />
            <Field
                name="UserName"
                type="text"
                id="UserName"
                component={renderField}
                label='Username'
                autofill="off"
                autoComplete="off"
            />
            {props.edit
                ? ''
                : <React.Fragment>
                    <Field
                        name="Password"
                        type="password"
                        id="Password"
                        component={renderField}
                        label='Password'
                        autofill="off"
                        autoComplete="new-password"
                    />
                    <Field
                        name="ConfirmPassword"
                        type="password"
                        id="ConfirmPassword"
                        component={renderField}
                        label='Confirm Password'
                    />
                </React.Fragment>
            }
        </React.Fragment>
    )
};

export default SaveFormHOC(MXSaveForm, Account_service, 'Users', validate, {
    fetchRoles: Role_service.fetch
});