export function fillForm(change, obj) {
  for (var key in obj) {
    change(key, obj[key]);
  }
}

// determine if the given value is an object (NOT an array and NOT null) - it might still be for example Math
export function isObject(v) {
  return v && v.constructor === Object;
}

// determine if the given value is integer
export function isInt(v) {
  return v !== null && v !== undefined && v.constructor === Number && (v % 1) === 0;
}

// determine if the given value is a number (not infinite, not NaN)
export function isNumber(v) {
  return typeof v === 'number' && !isNaN(v) && isFinite(v);
}

var numRegex = /^[-+]?(?:\d*\.\d+|\d+(?:\.\d*)?)$/; // 1 1. 1.2 .2 (and everything with optional + or - in front) 

// determine if the given value (string or number) represents a valid number (non infinite, not NaN), no spces allowed 
export function isNumeric(v) {
  return isNumber(v) || (isString(v) && numRegex.test(v));
}

// determine if the given value is a string (not null, but may be empty)
export function isString(v) {
  return typeof v === 'string';
}

// determine if the given value is a boolean value
export function isBoolean(v) {
  return typeof v === 'boolean';
}

// determine if the given value is a date object
export function isDate(v) {
  return v && v.constructor === Date;
}

// determine if the given value has a simple type
export function isSimpleType(v) {
  return v === null || v === undefined || isString(v) || isBoolean(v) || isNumber(v);
}

var emailRegex = /[a-z0-9.!#$%&amp;*+/=?^_`{|}~-\u00C8-\u00D6\u00D8-\u00F6\u00F8-\u00FF]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/i;
// Email validation Regex

// determine if string is an valid email
export function isEmail(v) {
  return isString(v) && emailRegex.test(v);
}

//Deep clones obj, returns a new object
export function deepClone(obj) {
  if (obj === undefined) {
    console.error('Attempt to deepClone undefined object');
  }

  if (obj === null || typeof obj !== 'object') {
    // no need to clone this, it's not an object
    return obj;
  }

  // Tricky exploit to deep clone an object...
  // Will not clone prototype or methods, only data
  // http://heyjavascript.com/4-creative-ways-to-clone-objects/#
  return JSON.parse(JSON.stringify(obj));
}

export function getObjectFromListById(Id, list) {
  return Id && list.length > 0 ? list.find(item => item.Id === Id) : {};
}