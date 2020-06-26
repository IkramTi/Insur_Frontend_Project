import { isSimpleType, isObject } from './object.helpers';

let rspaces = /\s+/;

// add multiple css classes to a DOM element
// el: DOM element
// n: class name
export function addClass(el, n) {
  setClass(el, n, 1);
}

// remove multiple classes from a DOM element
// el: DOM element
// n: class name
export function removeClass(el, n) {
  setClass(el, n);
}

// add or remove one or more space delimited class names to/from a DOM element
// el: DOM element
// n: class name
// add: flaggy if to add the class name as opposed to remove it
export function setClass(el, n, add) {
  if (el) {
    var clist = el.classList;
    n.split(rspaces).forEach(cls => {
      if (cls) {
        add ? clist.add(cls) : clist.remove(cls);
      }
    });
  }
}

// serial number of the last unfocus call
export var _unfocusSer = 0;

// unfocus the element that currently has the focus
export function unfocus() {
  var act = document.activeElement;
  act && act.blur && act.blur();
  _unfocusSer++;
}


// determine if the given value is serializable (i.e. if the re-deserialized value would be exactly the same as the original value)
export function isSerializable(o) {
  if (isSimpleType(o)) {
    return true;
  }
  if (!Array.isArray(o) && !isObject(o)) {
    return false;
  }
  for (var p in o) {
    if (o.hasOwnProperty(p) && !isSerializable(o[p])) {
      return false;
    }
  }
  return true;
}
