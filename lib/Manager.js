var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'inferno';
import { createElement } from 'inferno-create-element';

var Manager = function (_Component) {
  _inherits(Manager, _Component);

  function Manager(props) {
    _classCallCheck(this, Manager);

    var _this = _possibleConstructorReturn(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).call(this, props));

    _this._setTargetNode = function (node) {
      _this._targetNode = node;
    };

    _this._getTargetNode = function () {
      return _this._targetNode;
    };
    return _this;
  }

  _createClass(Manager, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popperManager: {
          setTargetNode: this._setTargetNode,
          getTargetNode: this._getTargetNode
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Tag = _props.tag,
          children = _props.children,
          restProps = _objectWithoutProperties(_props, ['tag', 'children']);

      if (Tag !== false) {
        return createElement(Tag || 'div', restProps, children);
      } else {
        return children;
      }
    }
  }]);

  return Manager;
}(Component);

export default Manager;