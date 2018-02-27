import { Component } from 'inferno'
import { createElement } from 'inferno-create-element'
import PopperJS from 'popper.js'
import isEqual from 'is-equal-shallow'

const noop = () => null

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
          (this.state.data && !isEqual(data.offsets, this.state.data.offsets)) ||
          !this.state.data
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

  componentDidMount() {
    this._updatePopper()
  }

  componentDidUpdate(lastProps) {
    if (
      lastProps.placement !== this.props.placement ||
      lastProps.eventsEnabled !== this.props.eventsEnabled
    ) {
      this._updatePopper()
    }

    if (this._popper && lastProps.children !== this.props.children) {
      this._popper.scheduleUpdate()
    }
  }

  componentWillUnmount() {
    this._destroyPopper()
  }


  _updatePopper() {
    this._destroyPopper()
    if (this._node) {
      this._createPopper()
    }
  }

  _createPopper() {
    const { placement, eventsEnabled } = this.props
    const modifiers = {
      ...this.props.modifiers,
      applyStyle: { enabled: false },
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

    // schedule an update to make sure everything gets positioned correct
    // after being instantiated
    this._popper.scheduleUpdate()
  }

  _destroyPopper() {
    if (this._popper) {
      this._popper.destroy()
    }
  }

  _getPopperStyle() {
    const { data } = this.state

    // If Popper isn't instantiated, hide the popperElement
    // to avoid flash of unstyled content
    if (!this._popper || !data) {
      return {
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
      }
    }

    const { top, left, position } = data.offsets.popper

    return {
      position,
      ...data.styles,
    }
  }

  _getPopperPlacement() {
    return !!this.state.data ? this.state.data.placement : undefined
  }

  _getArrowStyle() {
    if (!this.state.data || !this.state.data.offsets.arrow) {
      return {}
    } else {
      const { top, left } = this.state.data.offsets.arrow
      return { top, left }
    }
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

    const popperRef = node => {
      this._node = node
      if (typeof innerRef === 'function') {
        innerRef(node)
      }
    }
    const popperStyle = this._getPopperStyle()
    const popperPlacement = this._getPopperPlacement()

    if (typeof children === 'function') {
      const popperProps = {
        ref: popperRef,
        style: popperStyle,
        ['data-placement']: popperPlacement,
      }
      return children({
        popperProps,
        restProps,
        scheduleUpdate: this._popper && this._popper.scheduleUpdate,
      })
    }

    const componentProps = {
      ...restProps,
      style: {
        ...restProps.style,
        ...popperStyle,
      },
      'data-placement': popperPlacement,
    }

    if (typeof component === 'string') {
      componentProps.ref = popperRef
    } else {
      componentProps.innerRef = popperRef
    }

    return createElement(component, componentProps, children)
  }
}

export default Popper
