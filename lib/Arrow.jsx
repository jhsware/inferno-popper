import Inferno from 'inferno'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'

const Arrow = (props, context) => {
  const { component = 'span', innerRef, children, ...restProps } = props
  const { popper } = context
  const arrowRef = node => {
    popper.setArrowNode(node)
    if (typeof innerRef === 'function') {
      innerRef(node)
    }
  }
  const arrowStyle = popper.getArrowStyle()

  if (typeof children === 'function') {
    const arrowProps = {
      ref: arrowRef,
      style: arrowStyle,
    }
    return children({ arrowProps, restProps })
  }

  const componentProps = {
    ...restProps,
    style: {
      ...arrowStyle,
      ...restProps.style,
    },
  }

  if (typeof component === 'string') {
    componentProps.ref = arrowRef
  } else {
    componentProps.innerRef = arrowRef
  }

  return createElement(component, componentProps, children)
}

export default Arrow
