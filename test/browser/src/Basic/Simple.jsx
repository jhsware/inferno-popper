import { Section, Stage, Scene, Code, Narrative } from '../components.jsx'

export default function () {
  return (
    <Section title="Multiple Pop-Overs">
      <Narrative>
        <p></p>
      </Narrative>
      <Stage>
        <Scene>
          <MultipleExample />
          <Code>
{`class MultipleExample extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      placement: 'bottom'
    }
  }

  render() {
    const { placement } = this.state
    return (
      <div>
        <select
          value={placement}
          onChange={e => this.setState({ placement: e.target.value })}
        >
          {placements.map(placement =>
            <option key={placement} value={placement}>
              {placement}
            </option>
          )}
        </select>
        <Manager>
          <Target style={{ width: 120, height: 120, background: 'red', margin: '5rem auto' }}>
            Box
          </Target>
          <Popper placement="left">
          {({ popperProps }) =>
            <div {...popperProps} className="popper">
              Content Left
              <Arrow>
                {({ arrowProps }) =>
                  <span {...arrowProps} className="popper__arrow" />}
              </Arrow>
            </div>}
          </Popper>
          <Popper className="popper" placement="right">
            Content Right
            <Arrow className="popper__arrow" />
          </Popper>
          <Portal>
            <Popper
              className="popper"
              placement={placement}
              modifiers={modifiers}
            >
              Dynamic Content in a Portal!
              <Arrow className="popper__arrow" />
            </Popper>
          </Portal>
        </Manager>
      </div>
    )
  }
}
`}
          </Code>
        </Scene>
      </Stage>
    </Section>
  )
}


import { Component } from 'inferno'
import { createElement } from 'inferno-create-element'

import { Manager, Target, Popper, Arrow, Travel } from '../../../../index'
const Portal = Travel
import PopperJS from '../../../../node_modules/popper.js/dist/umd/popper.js'
const placements = PopperJS.placements

const modifiers = {
  customStyle: {
    enabled: true,
    fn: data => {
      data.styles = {
        ...data.styles,
        background: 'red',
      }
      return data
    },
  },
}

const CustomTarget = ({ innerRef, ...props }) =>
  <button
    ref={innerRef}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 200,
      padding: 24,
      fontSize: 32,
      lineHeight: '1',
      backgroundColor: 'rebeccapurple',
      color: 'rgba(255, 255, 255, 0.5)',
      userSelect: 'none',
    }}
    {...props}
  />

const CustomPopper = ({ innerRef, style, ...props }) =>
  <div
    ref={innerRef}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 100,
      fontSize: 16,
      backgroundColor: '#ff9121',
      color: 'rgba(255, 255, 255, 0.8)',
      ...style,
    }}
    {...props}
  />

class MultipleExample extends Component {

  constructor(props) {
    super(props)

    this.state = {
      placement: 'bottom'
    }
  }

  render() {
    const { placement } = this.state
    return (
      <div>
        <select
          value={placement}
          onChange={e => this.setState({ placement: e.target.value })}
        >
          {placements.map(placement =>
            <option key={placement} value={placement}>
              {placement}
            </option>
          )}
        </select>
        <Manager>
          <Target style={{ width: 120, height: 120, background: 'red', margin: '0 auto 5rem' }}>
            Box
          </Target>
          <Popper placement="left">
          {({ popperProps }) =>
            <div {...popperProps} className="popper">
              Content Left
              <Arrow>
                {({ arrowProps }) =>
                  <span {...arrowProps} className="popper__arrow" />}
              </Arrow>
            </div>}
          </Popper>
          <Popper className="popper" placement="right">
            Content Right
            <Arrow className="popper__arrow" />
          </Popper>
          <Portal>
            <Popper
              className="popper"
              placement={placement}
              modifiers={modifiers}
            >
              Dynamic Content in a Portal!
              <Arrow className="popper__arrow" />
            </Popper>
          </Portal>
        </Manager>
      </div>
    )
  }
}

/*
          <Popper placement="left">
          {({ popperProps }) =>
            <div {...popperProps} className="popper">
              Content Left
              <Arrow>
                {({ arrowProps }) =>
                  <span {...arrowProps} className="popper__arrow" />}
              </Arrow>
            </div>}
          </Popper>
          <Popper className="popper" placement="right">
            Content Right
            <Arrow className="popper__arrow" />
          </Popper>
          <Portal>
            <Popper
              className="popper"
              placement={placement}
              modifiers={modifiers}
            >
              Dynamic Content in a Portal!
              <Arrow className="popper__arrow" />
            </Popper>
          </Portal>

*/