var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component, createPortal } from 'inferno';
import { createElement } from 'inferno-create-element';

import { Children } from './compat';

var noop = function noop() {
  return null;
};

var Travel = function (_Component) {
  _inherits(Travel, _Component);

  function Travel(props) {
    _classCallCheck(this, Travel);

    var _this = _possibleConstructorReturn(this, (Travel.__proto__ || Object.getPrototypeOf(Travel)).call(this, props));

    _this.state = {
      portalNode: null,
      portalInstance: null
    };
    return _this;
  }

  _createClass(Travel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setupPortal();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updatePortal();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._destroyPortal();
    }
  }, {
    key: '_getRenderToNode',
    value: function _getRenderToNode() {
      var renderTo = this.props.renderTo;

      if (typeof renderTo === 'string') {
        return document.querySelector(renderTo);
      } else {
        return renderTo || document.body;
      }
    }
  }, {
    key: '_getComponent',
    value: function _getComponent() {
      if (this.props.useArray) {
        return Children.toArray(this.props.children)[1];
      } else {
        return Children.only(this.props.children);
      }
    }
  }, {
    key: '_setupPortal',
    value: function _setupPortal() {
      var _props = this.props,
          renderTag = _props.renderTag,
          onMount = _props.onMount;

      // Default props

      renderTag = renderTag || 'div';
      onMount = onMount || noop;

      var renderToNode = this._getRenderToNode();

      // create a node that we can stick our component in
      var portalNode = document.createElement(renderTag);

      // append node to the render node
      renderToNode.appendChild(portalNode);

      // store the instance passed back to allow work to be done on it
      var portalInstance = typeof onMount === 'function' ? onMount(portalNode) : portalNode;

      this.setState({
        portalNode: portalNode,
        portalInstance: portalInstance
      });
    }
  }, {
    key: '_updatePortal',
    value: function _updatePortal() {
      var _this2 = this;

      var _props2 = this.props,
          id = _props2.id,
          className = _props2.className,
          style = _props2.style,
          onUpdate = _props2.onUpdate;

      // Default props

      onUpdate = onUpdate || noop;

      if (id) {
        this._portalNode.id = id;
      }

      if (className) {
        this._portalNode.className = className;
      }

      if (style) {
        Object.keys(style).forEach(function (key) {
          _this2._portalNode.style[key] = style[key];
        });
      }

      if (typeof onUpdate === 'function') {
        this._portalInstance = onUpdate(this._portalInstance);
      }
    }
  }, {
    key: '_destroyPortal',
    value: function _destroyPortal() {
      this.state.portalNode.parentNode.removeChild(this._portalNode);
      this.setState({
        portalNode: null,
        portalInstance: null
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return this.state.portalNode ? createPortal(this._getComponent(), this.state.portalNode) : null;
    }
  }]);

  return Travel;
}(Component);

export default Travel;