import Inferno from 'inferno'
import Component from 'inferno-component'
require('inferno-devtools')
import { Router, Route, Redirect, IndexRoute, Link } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'

import BasicPage from './BasicPage.jsx'

class AppLayout extends Component {
  
  getChildContext() {
    return {
      pageLinks: [
        {link: "/inferno-bootstrap-docs/basic", title: "Basic"}
      ]
    }
  }

  render () {
    return (
        <div className="Content">
          {this.props.children}
        </div>
    )
  }
}

if (typeof window !== 'undefined') {
  const browserHistory = createBrowserHistory()

  const appRoutes = (
    <Router history={ browserHistory }>
      <Route path="/inferno-popper-docs" component={ AppLayout }>
        <IndexRoute component={ BasicPage } />
        <Route path="/basic" component={BasicPage} />
      </Route>
      <Redirect from="/*" to="/inferno-popper-docs" />
    </Router>
  )
  Inferno.render(appRoutes, document.getElementById('app'))
}