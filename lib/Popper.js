var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'inferno';
import { createElement } from 'inferno-create-element';
import PopperJS from 'popper.js';

export var placements = PopperJS.placements;

var Popper = function (_Component) {
  _inherits(Popper, _Component);

  function Popper(props) {
    _classCallCheck(this, Popper);

    var _this = _possibleConstructorReturn(this, (Popper.__proto__ || Object.getPrototypeOf(Popper)).call(this, props));

    _this.state = {};

    _this._setArrowNode = function (node) {
      _this._arrowNode = node;
    };

    _this._getTargetNode = function () {
      if (_this.props.target) {
        return _this.props.target;
      } else if (!_this.context.popperManager || !_this.context.popperManager.getTargetNode()) {
        throw new Error('Target missing. Popper must be given a target from the Popper Manager, or as a prop.');
      }
      return _this.context.popperManager.getTargetNode();
    };

    _getOffsets = function _getOffsets(data) {
      return Object.keys(data.offsets).map(function (key) {
        return data.offsets[key];
      });
    };

    _isDataDirty = function _isDataDirty(data) {
      if (_this.state.data) {
        return JSON.stringify(_this._getOffsets(_this.state.data)) !== JSON.stringify(_this._getOffsets(data));
      } else {
        return true;
      }
    };

    _this._updateStateModifier = {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        if (_this._isDataDirty(data)) {
          _this.setState({ data: data });
        }
        return data;
      }
    };
    return _this;
  }

  _createClass(Popper, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popper: {
          setArrowNode: this._setArrowNode.bind(this),
          getArrowStyle: this._getArrowStyle.bind(this)
        }
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(lastProps) {
      if (lastProps.placement !== this.props.placement || lastProps.eventsEnabled !== this.props.eventsEnabled || lastProps.target !== this.props.target) {
        this._destroyPopper();
        this._createPopper();
      }

      if (lastProps.children !== this.props.children) {
        this._popper.scheduleUpdate();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._destroyPopper();
    }
  }, {
    key: '_createPopper',
    value: function _createPopper() {
      var _this2 = this;

      var _props = this.props,
          placement = _props.placement,
          eventsEnabled = _props.eventsEnabled,
          positionFixed = _props.positionFixed;

      var modifiers = Object.assign({}, this.props.modifiers, {
        applyStyle: { enabled: false },
        updateState: this._updateStateModifier
      });

      if (this._arrowNode) {
        modifiers.arrow = Object.assign({}, this.props.modifiers.arrow || {}, {
          element: this._arrowNode
        });
      }

      this._popper = new PopperJS(this._getTargetNode(), this._popperNode, {
        placement: placement,
        positionFixed: positionFixed,
        eventsEnabled: eventsEnabled,
        modifiers: modifiers
      });

      // TODO: look into setTimeout scheduleUpdate call, without it, the popper will not position properly on creation
      setTimeout(function () {
        return _this2._scheduleUpdate();
      });
    }
  }, {
    key: '_destroyPopper',
    value: function _destroyPopper() {
      if (this._popper) {
        this._popper.destroy();
      }
    }
  }, {
    key: '_getPopperStyle',
    value: function _getPopperStyle() {
      var data = this.state.data;


      if (!this._popper || !data) {
        return {
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0
        };
      }

      return Object.assign({
        position: data.offsets.popper.position
      }, data.styles);
    }
  }, {
    key: '_getPopperPlacement',
    value: function _getPopperPlacement() {
      return this.state.data ? this.state.data.placement : undefined;
    }
  }, {
    key: '_getPopperHide',
    value: function _getPopperHide() {
      return !!this.state.data && this.state.data.hide ? '' : undefined;
    }
  }, {
    key: '_getArrowStyle',
    value: function _getArrowStyle() {
      if (!this.state.data || !this.state.data.offsets.arrow) {
        return {};
      } else {
        var _state$data$offsets$a = this.state.data.offsets.arrow,
            top = _state$data$offsets$a.top,
            left = _state$data$offsets$a.left;

        return { top: top, left: left };
      }
    }
  }, {
    key: '_handlePopperRef',
    value: function _handlePopperRef(node) {
      this._popperNode = node;
      if (node) {
        this._createPopper();
      } else {
        this._destroyPopper();
      }
      if (this.props.innerRef) {
        this.props.innerRef(node);
      }
    }
  }, {
    key: '_scheduleUpdate',
    value: function _scheduleUpdate() {
      this._popper && this._popper.scheduleUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          component = _props2.component,
          innerRef = _props2.innerRef,
          placement = _props2.placement,
          eventsEnabled = _props2.eventsEnabled,
          positionFixed = _props2.positionFixed,
          modifiers = _props2.modifiers,
          children = _props2.children,
          restProps = _objectWithoutProperties(_props2, ['component', 'innerRef', 'placement', 'eventsEnabled', 'positionFixed', 'modifiers', 'children']);

      // Default props


      component = component || 'div';
      placement = placement || 'bottom';
      eventsEnabled === undefined ? true : eventsEnabled;
      modifiers = modifiers || {};

      var popperStyle = this._getPopperStyle();
      var popperPlacement = this._getPopperPlacement();
      var popperHide = this._getPopperHide();

      if (typeof children === 'function') {
        var popperProps = {
          ref: this._handlePopperRef,
          style: popperStyle,
          'data-placement': popperPlacement,
          'data-x-out-of-boundaries': popperHide
        };
        return children({
          popperProps: popperProps,
          restProps: restProps,
          scheduleUpdate: this._scheduleUpdate
        });
      }

      var componentProps = Object.assign({}, restProps, {
        style: Object.assign({}, restProps.style, popperStyle),
        'data-placement': popperPlacement,
        'data-x-out-of-boundaries': popperHide
      });

      if (typeof component === 'string') {
        componentProps.ref = this._handlePopperRef;
      } else {
        componentProps.innerRef = this._handlePopperRef;
      }

      return createElement(component, componentProps, children);
    }
  }]);

  return Popper;
}(Component);

export default Popper;