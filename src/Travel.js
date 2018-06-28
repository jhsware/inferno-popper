import { Component, createPortal } from 'inferno'
import { Children } from './compat'

const noop = () => null

class Travel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      portalNode: null,
      portalInstance: null
    }
  }

  componentDidMount() {
    this._setupPortal()
  }

  componentDidUpdate() {
    this._updatePortal()
  }

  componentWillUnmount() {
    this._destroyPortal()
  }

  _getRenderToNode() {
    const { renderTo } = this.props
    if (typeof renderTo === 'string') {
      return document.querySelector(renderTo)
    } else {
      return renderTo || document.body
    }
  }

  _getComponent() {
    if (this.props.useArray) {
      return Children.toArray(this.props.children)[1]
    } else {
      return Children.only(this.props.children)
    }
  }

  _setupPortal() {
    let { renderTag, onMount } = this.props

    // Default props
    renderTag = renderTag || 'div'
    onMount = onMount || noop

    const renderToNode = this._getRenderToNode()

    // create a node that we can stick our component in
    const portalNode = document.createElement(renderTag)

    // append node to the render node
    renderToNode.appendChild(portalNode)

    // store the instance passed back to allow work to be done on it
    const portalInstance = typeof onMount === 'function'
      ? onMount(portalNode)
      : portalNode

    this.setState({
      portalNode,
      portalInstance
    })
  }

  _updatePortal() {
    let { id, className, style, onUpdate } = this.props

    // Default props
    onUpdate = onUpdate || noop    

    if (id) {
      this._portalNode.id = id
    }

    if (className) {
      this._portalNode.className = className
    }

    if (style) {
      Object.keys(style).forEach(key => {
        this._portalNode.style[key] = style[key]
      })
    }

    if (typeof onUpdate === 'function') {
      this._portalInstance = onUpdate(this._portalInstance)
    }
  }

  _destroyPortal() {
    this.state.portalNode.parentNode.removeChild(this._portalNode)
    this.setState({
      portalNode: null,
      portalInstance: null
    })
  }

  render() {

    return this.state.portalNode ? createPortal(this._getComponent(), this.state.portalNode) : null;
  }
}

export default Travel