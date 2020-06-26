/**
 * Validation User Form
 * @param {*} values 
 */
import { isEmail, isNumeric } from '../../../commons/utils/object_utils';


const validate = values => {
    const errors = {};

    if (!values.Username) {
        errors.Username = "Required";
    }

    if (!values.Password) {
        errors.Password = "Required";
    }

    if (!isEmail(values.Email)) {
        errors.Email = "Not a valid Email";
    }

    if (!isNumeric(values.PhoneNumber)) {
        errors.PhoneNumber = "Not a valid Number";
    }

    if (values.Password !== values.ConfirmPassword) {
        errors.ConfirmPassword = "Passwords do not match";
    }
    return errors;
}

export default validate;