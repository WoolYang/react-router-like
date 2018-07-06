import React from "react";
import PropTypes from "prop-types";
import { createHashHistory as createHistory } from "history";
import Router from "./router";

class HashRouter extends React.Component {
    static propTypes = {
        basename: PropTypes.string,
        getUserConfirmation: PropTypes.func,
        hashType: PropTypes.oneOf(["hashbang", "noslash", "slash"]),
        children: PropTypes.node
    };

    history = createHistory(this.props);  //scrollRestoration state 指向History对象


    render() {
        return <Router history={this.history} children={this.props.children} />;
    }
}

export default HashRouter;