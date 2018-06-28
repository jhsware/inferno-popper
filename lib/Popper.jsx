import { Component } from 'inferno'
import { createElement } from 'inferno-create-element'
import PopperJS from 'popper.js'

class Popper extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    this._setArrowNode = node => {
      this._arrowNode = node
    }
  
    this._getTargetNode = () => {
      return this.context.popperManager.getTargetNode()
    }

    this._updateStateModifier = {
      enabled: true,
      order: 900,
      fn: data => {
        if (
          data.placement !== this.state.placement ||
          data.hide !== this.state.hide
        ) {
          this.setState({ data })
        }
        return data
      }
    }
  }

  getChildContext() {
    return {
      popper: {
        setArrowNode: this._setArrowNode.bind(this),
        getArrowStyle: this._getArrowStyle.bind(this),
      },
    }
  }

  componentDidUpdate(lastProps) {
    if (
      lastProps.placement !== this.props.placement ||
      lastProps.eventsEnabled !== this.props.eventsEnabled
    ) {
      this._destroyPopper()
      this._createPopper()
    }

    if (lastProps.children !== this.props.children) {
      this._popper.scheduleUpdate()
    }
  }

  componentWillUnmount() {
    this._destroyPopper()
  }

  _createPopper() {
    const { placement, eventsEnabled } = this.props
    const modifiers = {
      ...this.props.modifiers,
      updateState: this._updateStateModifier,
    }

    if (this._arrowNode) {
      modifiers.arrow = {
        element: this._arrowNode,
      }
    }

    this._popper = new PopperJS(this._getTargetNode(), this._node, {
      placement,
      eventsEnabled,
      modifiers,
    })
  }

  _destroyPopper() {
    if (this._popper) {
      this._popper.destroy()
    }
  }

  _getPopperPlacement() {
    return this.state.data ? this.state.data.placement : undefined
  }

  _getPopperHide () {
    return !!this.state.data && this.state.data.hide ? '' : undefined
  }

  _getArrowStyle() {
    if (!this.state.data || !this.state.data.offsets.arrow) {
      return {}
    } else {
      const { top, left } = this.state.data.offsets.arrow
      return { top, left }
    }
  }

  _getPopperRef (node) {
    this._node = node
    if (node) {
      this._createPopper()
    } else {
      this._destroyPopper()
    }
    if (this.props.innerRef) {
      this.props.innerRef(node)
    }
  }

  _scheduleUpdate () {
    this._popper && this._popper.scheduleUpdate()
  }

  render() {
    let {
      component,
      innerRef,
      placement,
      eventsEnabled,
      modifiers,
      children,
      ...restProps
    } = this.props

    // Default props
    component = component || 'div'
    placement = placement || 'bottom'
    eventsEnabled === undefined ? true : eventsEnabled
    modifiers = modifiers || {}

    const popperStyle = this._getPopperStyle()
    const popperPlacement = this._getPopperPlacement()
    const popperHide = this._getPopperHide()

    if (typeof children === 'function') {
      const popperProps = {
        ref: this._getPopperRef,
        style: popperStyle,
        ['data-placement']: popperPlacement,
        ['data-x-out-of-boundaries']: popperHide,
      }
      return children({
        popperProps,
        restProps,
        scheduleUpdate: this._scheduleUpdate,
      })
    }

    const componentProps = {
      ...restProps,
      'data-placement': popperPlacement,
      'data-x-out-of-boundaries': popperHide,
    }

    if (typeof component === 'string') {
      componentProps.ref = this._getPopperRef
    } else {
      componentProps.innerRef = this._getPopperRef
    }

    return createElement(component, componentProps, children)
  }
}

export default Popper
