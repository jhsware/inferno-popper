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
      if (this.props.target) {
        return this.props.target
      } else if (
        !this.context.popperManager ||
        !this.context.popperManager.getTargetNode()
      ) {
        throw new Error(
          'Target missing. Popper must be given a target from the Popper Manager, or as a prop.',
        )
      }
      return this.context.popperManager.getTargetNode()
    }

    _getOffsets = data => {
      return Object.keys(data.offsets).map(key => data.offsets[key])
    }
  
    _isDataDirty = data => {
      if (this.state.data) {
        return (
          JSON.stringify(this._getOffsets(this.state.data)) !==
          JSON.stringify(this._getOffsets(data))
        )
      } else {
        return true
      }
    }

    this._updateStateModifier = {
      enabled: true,
      order: 900,
      fn: data => {
        if (this._isDataDirty(data)) {
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
      lastProps.eventsEnabled !== this.props.eventsEnabled ||
      lastProps.target !== this.props.target
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
      applyStyle: { enabled: false },
      updateState: this._updateStateModifier,
    }

    if (this._arrowNode) {
      modifiers.arrow = {
        ...(this.props.modifiers.arrow || {}),
        element: this._arrowNode,
      }
    }

    this._popper = new PopperJS(this._getTargetNode(), this._popperNode, {
      placement,
      eventsEnabled,
      modifiers,
    })
    
    // TODO: look into setTimeout scheduleUpdate call, without it, the popper will not position properly on creation
    setTimeout(() => this._scheduleUpdate())
  }

  _destroyPopper() {
    if (this._popper) {
      this._popper.destroy()
    }
  }

  _getPopperStyle() {
    const { data } = this.state

    if (!this._popper || !data) {
      return {
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
      }
    }

    return {
      position: data.offsets.popper.position,
      ...data.styles,
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

  _handlePopperRef (node) {
    this._popperNode = node
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
        ref: this._handlePopperRef,
        style: popperStyle,
        'data-placement': popperPlacement,
        'data-x-out-of-boundaries': popperHide,
      }
      return children({
        popperProps,
        restProps,
        scheduleUpdate: this._scheduleUpdate,
      })
    }

    const componentProps = {
      ...restProps,
      style: {
        ...restProps.style,
        ...popperStyle,
      },
      'data-placement': popperPlacement,
      'data-x-out-of-boundaries': popperHide,
    }

    if (typeof component === 'string') {
      componentProps.ref = this._handlePopperRef
    } else {
      componentProps.innerRef = this._handlePopperRef
    }

    return createElement(component, componentProps, children)
  }
}

export default Popper
