import {
  isArray,
  isNullOrUndef
} from 'inferno-shared'

/* COMPATIBILITY */
const ARR = [];

export const Children = {
  only: function (children) {
    children = Children.toArray(children);
    if (children.length !== 1) {
      throw new Error("Children.only() expects only one child.");
    }
    return children[0];
  },

  toArray: function (children) {
    if (isNullOrUndef(children)) {
      return [];
    }
    // We need to flatten arrays here,
    // because React does it also and application level code might depend on that behavior
    if (isArray(children)) {
      const result = [];

      flatten(children, result);

      return result;
    }
    return ARR.concat(children);
  }
};

/* /COMPATIBILITY */
