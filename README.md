# inferno-popper
[![gzip size](http://img.badgesize.io/https://unpkg.com/inferno-popper/dist/cjs/index.min.js?compression=gzip)](https://unpkg.com/inferno-popper/dist/cjs/index.min.js)

Inferno wrapper for [PopperJS](https://github.com/FezVrasta/popper.js/) ported from [inferno-popper](https://github.com/souporserious/inferno-popper).

## Compatibility
inferno-popper 7.x supports Inferno v7

inferno-popper 6.x supports Inferno v6

inferno-popper 5.x supports Inferno v5

inferno-popper 4.x supports Inferno v4

inferno-popper 3.x supports Inferno v3 (code in InfernoV3 branch)

## Install

`$ npm install --save inferno-popper`

## Usage

NOTE: There is an example of a dynamic popper if you check the browser test.

```js
import { Manager, Target, Popper, Arrow } from 'inferno-popper'

const PopperExample = () => (
  <Manager>
    <Target style={{ width: 120, height: 120, background: '#b4da55' }}>
      Target Box
    </Target>
    <Popper placement="left" className="popper">
      Left Content
      <Arrow className="popper__arrow"/>
    </Popper>
    <Popper placement="right" className="popper">
      Right Content
      <Arrow className="popper__arrow"/>
    </Popper>
  </Manager>
)
```

## Usage w/ child function

This is a useful way to interact with custom components. Just make sure you pass down the refs properly.

```js
import { Manager, Target, Popper, Arrow } from 'inferno-popper'

const PopperExample = () => (
  <Manager>
    <Target>
      {({ targetProps }) => (
        <div {...targetProps}>
          Target Box
        </div>
      )}
    </Target>
    <Popper placement="left">
      {({ popperProps, restProps }) => (
        <div
          className="popper"
          {...popperProps}
        >
          Popper Content
          <Arrow>
            {({ arrowProps, restProps }) => (
              <span
                className="popper__arrow"
                {...arrowProps}
              />
            )}
          </Arrow>
        </div>
      )}
    </Popper>
  </Manager>
)
```

## `Shared Props`

`Target`, `Popper`, and `Arrow` all share the following props

#### `component`: PropTypes.oneOfType([PropTypes.node, PropTypes.func])

A valid DOM tag or custom component to render. If using a custom component, an `innerRef` prop will be passed down that **must** be attached to the child component ref.

#### `innerRef`: PropTypes.func

Use this prop to access the internal ref. Does not apply to the `Manager` component since we do not interact with its ref.

## `Manager`

This is a special component that provides the `Target` component to the `Popper` component. Pass any props as you normally would here.

#### `tag`: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])

A valid DOM tag to render. Allows rendering just children by passing `false`. Once React 16 is out, this prop will most likely go away since we will be able to return an array and all this currently does is subscribe `Target` and `Popper`.

## `Target`

This is just a simple component that subscribes to `PopperManager`, so `Popper` can make use of it. Again, pass any props as you normally would here.

Each `Target` must be wrapped in a `Manager`, and each `Manager` can wrap only one `Target`.

#### `children`: PropTypes.oneOfType([PropTypes.node, PropTypes.func])

A `Target`'s child may be one of the following:

- a React element[s]
- a function accepting the following object (all props must be passed down in order for the PopperJS to work properly)

  ```js
  {
    targetProps: {
      ref // a function that accepts the target component as an argument
    },
    restProps // any other props that came through the Target component
  }
  ```


## `Popper`

Your popper that gets attached to the `Target` component.

Each `Popper` must be wrapped in a `Manager`, and each `Manager` can wrap multiple `Popper` components.

#### `placement`: PropTypes.oneOf(Popper.placements)
#### `eventsEnabled`: PropTypes.bool
#### `modifiers`: PropTypes.object

Passes respective options to a new [Popper instance](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#new-popperreference-popper-options). As for `onCreate` and `onUpdate`, these callbacks were intentionally left out in favor of using the [component lifecycle methods](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle). If you have a good use case for these please feel free to file and issue and I will consider adding them in.

#### `children`: PropTypes.oneOfType([PropTypes.node, PropTypes.func])

A `Popper`'s child may be one of the following:

- a React element[s]
- a function accepting the following object (all props must be passed down in order for the PopperJS to work properly)

  ```js
  {
    popperProps: {
      ref, // a function that accepts the popper component as an argument
      style, // the styles to apply to the popper element
      ['data-placement'] // the placement of the Popper
    },
    restProps // any other props that came through the Popper component
  }
  ```

## `Arrow`

Another component that subscribes to the `Popper` component as an [arrow modifier](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#Modifiers.arrow). Must be a child of `Popper`.

#### `children`: PropTypes.oneOfType([PropTypes.node, PropTypes.func])

An `Arrow`'s child may be one of the following:

- a React element[s]
- a function accepting the following object (all props must be passed down in order for the PopperJS to work properly)

  ```js
  {
    arrowProps: {
      ref, // a function that accepts the arrow component as an argument
      style // the styles to apply to the arrow element
    },
    restProps // any other props that came through the Arrow component
  }
  ```


## Running Brower Test Locally

clone repo

`git clone git@github.com:jhsware/inferno-popper.git`

move into folder

`cd ~/inferno-popper`

install dependencies

`npm install`

run browser test

`$ npm run build && npm run build-test && node test/browser/server.js`

open your browser and visit: `http://localhost:8080/`
