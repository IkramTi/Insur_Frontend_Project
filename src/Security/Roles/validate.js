/**
 * Validation User Form
 * @param {*} values 
 */


const validate = values => {
    const errors = {};

    if (!values.Code) {
        errors.Code = "Required";
    }

    if (!values.Name) {
        errors.Name = "Required";
    }
    return errors;
}

export default validate;