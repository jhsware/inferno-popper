import Inferno from 'inferno'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'
import {
  Children,
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from './compat'

const noop = () => null

class Travel extends Component {

  constructor(props) {
    super(props)

    this._portalNode = null
  }

  componentDidMount() {
    this._renderPortal()
  }

  componentDidUpdate() {
    this._renderPortal()
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
    this._portalNode = document.createElement(renderTag)

    // append node to the render node
    renderToNode.appendChild(this._portalNode)

    // store the instance passed back to allow work to be done on it
    this._portalInstance = typeof onMount === 'function'
      ? onMount(this._portalNode)
      : this._portalNode
  }

  _renderPortal() {
    const component = this._getComponent()

    // if no component, bail out
    if (!component) {
      this._destroyPortal()
      return
    }

    // if no portalNode found, create it
    if (!this._portalNode) {
      this._setupPortal()
    }

    // render component into the DOM
    unstable_renderSubtreeIntoContainer(
      this,
      component,
      this._portalNode,
      () => {
        // don't update until the subtree has finished rendering
        this._updatePortal()
      }
    )
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
    if (this._portalNode) {
      unmountComponentAtNode(this._portalNode)
      this._portalNode.parentNode.removeChild(this._portalNode)
    }
    this._portalNode = null
  }

  render() {
    if (this.props.useArray) {
      return Children.toArray(this.props.children)[0]
    } else {
      return null
    }
  }
}

export default Travel