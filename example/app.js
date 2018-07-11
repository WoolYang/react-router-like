import React from 'react'
import { HashRouter, Route, Switch, NavLink } from '../src/index'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>this is app</div>
                <HashRouter>
                    <div>
                        <NavLink to='/bar'>bar</NavLink>
                        <NavLink to='/foo'>foo</NavLink>
                    </div>
                </HashRouter>
                <HashRouter>
                    <Switch>
                        <Route path="/bar" component={Bar} />
                        <Route path="/foo" component={Foo} />
                    </Switch>
                </HashRouter>
            </div>

        )
    }
}

class Bar extends React.Component {
    render() {
        return (
            <div>this is bar</div>
        )
    }
}

class Foo extends React.Component {
    render() {
        return (
            <div>this is foo</div>
        )
    }
}