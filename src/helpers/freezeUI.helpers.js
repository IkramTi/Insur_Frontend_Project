import { isString } from 'util';
import { isSerializable, addClass, removeClass, unfocus } from './common.helpers';

const LSPrefix = 'yulz.';
var ls, lss, lsp = LSPrefix + '.'
try {
  // get local storage object and test if storing works
  var l = window.localStorage;
  l.setItem(lsp, 1);
  l.removeItem(lsp);
  ls = l
}
catch (e) {
  //swallow
  console.warn('localStorage is not accessible, working locally');
}
if (!ls) {
  // stub that doesn't store persistently , but at leasdt during the React session
  lss = {};
  ls =
    {
      getItem: k => k in lss ? lss[k] : null,
      setItem: (k, v) => lss[k] = v,
      removeItem: k => delete lss[k]
    };
}

// get a value from the local store
// returns the defaultValue if n/a, null or error
export function getLocVal(key, defaultValue = null) {
  var r = null;
  if (!key || !isString(key)) {
    console.error('getLocVal: bad key', key);
  }
  else {
    try {
      r = JSON.parse(ls.getItem(lsp + key));
    }
    catch (e) {
      // swallow access or JSON parse error
      console.warn('getLocVal: exception', e, key);
    }
  }
  return r === null ? defaultValue : r
}

// set a value in the local store (value must be serializable)
// set to null to remove
// returns true on success
export function setLocVal(key, value) {
  if (!key || !isString(key)) {
    console.error('setLocVal: bad key', key);
  }
  else {
    try {
      if (value === null) {
        ls.removeItem(lsp + key);
      }
      else if (isSerializable(value)) {
        ls.setItem(lsp + key, JSON.stringify(value));
      }
      else {
        console.warn('setLocVal: value must be serializable', value);
        return false;
      }
    }
    catch (e) {
      // swallow access or JSON stringify error
      console.warn('setLocVal: exception', e, key, value);
    }
  }
  return false;
}

const FreezeThrobberDelay = 500,
  UnfreezeDelay = 50;

var freezed = 0, // the freeze level, 0 for no freeze
  freezetimer, // the timeout for showing throbber or unfreezing
  throbberLevel = 0, // throbber to be shown from this freeze level and up (0 if not set yet)
  throbber = document.getElementById('winthrobber'), // the throbber DOM element
  deferredThrobber = 0, // flag if throbber timeout was reached and the throbber is not yet shown
  freezeActEl; // active element before first freeze

// freezing the UI and showing a throbber after some time
// for each call to freeze, you must call unfreeze ant the end
// freeze calls can be nested;
export function freezeUI() {
  if (!freezed++) {
    // actual freeze
    freezeActEl = document.activeElement;
    unfocus();
    addClass(document.body, 'freezed');
    if (freezetimer) {
      clearTimeout(freezetimer);
      freezetimer = 0;
    }
    freezetimer = setTimeout(() => {
      freezetimer = 0;
      if (throbberLevel && freezed >= throbberLevel) {
        // we're allowed to show the throbber, so we'll show it now
        if (throbber) {
          throbber.style.display = '';
        }
      }
      else {
        // remember that the throbber timeout triggered
        deferredThrobber = 1;
      }
    }, FreezeThrobberDelay);
  }
  if (!throbberLevel) {
    // set new "show throbber" level
    throbberLevel = freezed;
  }
  if (deferredThrobber) {
    // show throbber now that we're allowed to
    if (throbber) {
      throbber.style.display = '';
    }
    deferredThrobber = 0;
  }
}

// unfreezing the UI
// if this is the last unfreeze level, we will automatically focus the element that was focused
// when the first freezeUI has been called if no element is currently focused (i.e. body has the focus)
export function unfreezeUI() {
  if (!freezed) {
    console.error('unfreeze called w/o freeze');
    return;
  }
  if (!--freezed) {
    // actual unfreeze
    // immediately hide the throbber
    if (throbber) {
      throbber.style.display = 'none';
    }
    deferredThrobber = 0;

    // slight delay for unfreezing the UI in case it needs to refresh first
    if (freezetimer) {
      clearTimeout(freezetimer);
    }
    freezetimer = setTimeout(() => {
      removeClass(document.body, 'freezed');
    }, UnfreezeDelay);

    if (freezeActEl && document.activeElement === document.body) {
      freezeActEl.focus();
      freezeActEl = 0;
    }
  }
  if (freezed < throbberLevel) {
    throbberLevel = freezed;
  }
}
