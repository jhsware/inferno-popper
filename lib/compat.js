import {
  Component,
  createComponentVNode,
  render
} from 'inferno'
import {
  isArray,
  isNullOrUndef
} from 'inferno-shared'
import { VNodeFlags } from 'inferno-vnode-flags'

/* COMPATIBILITY */
// TODO: Rewrite implementation for Inferno

export function unmountComponentAtNode(container) {
  render(null, container);
  return true;
}

export function unstable_renderSubtreeIntoContainer(parentComponent, vNode, container, callback) {
  const wrapperVNode = createComponentVNode(VNodeFlags.ComponentClass, WrapperComponent, {
    children: vNode,
    context: parentComponent.context
  });
  render(wrapperVNode, container);
  const component = vNode.children;

  if (callback) {
    // callback gets the component as context, no other argument.
    callback.call(component);
  }
  return component;
}

export class WrapperComponent extends Component {
  getChildContext() {
    // tslint:disable-next-line
    return this.props.contex;
  }

  render(props) {
    return props.children;
  }
}

function flatten(arr, result) {
  for (let i = 0, len = arr.length; i < len; i++) {
    const value = arr[i];
    if (isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}

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
