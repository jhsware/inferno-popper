import Inferno from 'inferno'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'


class Manager extends Component {

  constructor (props) {
    super(props)
    
    this._setTargetNode = (node) => {
      this._targetNode = node
    }
  
    this._getTargetNode = () => {
      return this._targetNode
    }  
  }

  getChildContext() {
    return {
      popperManager: {
        setTargetNode: this._setTargetNode,
        getTargetNode: this._getTargetNode,
      },
    }
  }

  render() {
    const { 
      tag: Tag,
      children,
      ...restProps
    } = this.props

    if (Tag !== false) {
      return createElement(Tag || 'div', restProps, children)
    } else {
      return children
    }
  }
}

export default Manager
