import { render, Component } from 'inferno'
require('inferno-devtools')
import { BrowserRouter, Route, Link } from 'inferno-router'

import BasicPage from './BasicPage.jsx'

class App extends Component {
  getChildContext() {
    return {
      pageLinks: [
        {link: "/inferno-popper-docs/basic", title: "Basic"}
      ]
    }
  }

  render () {
    return (
      <BrowserRouter>
        <div className="Content">
          <Route exact path="/" component={ BasicPage } />
        </div>
      </BrowserRouter>
    )
  }
}

if (typeof window !== 'undefined') {
  render(<App />, document.getElementById('app'))
}
