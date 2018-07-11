import React from "react";
import PropTypes from "prop-types";
import matchPath from "./matchPath";

class Switch extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            route: PropTypes.object.isRequired
        }).isRequired
    };

    static propTypes = {
        children: PropTypes.node,
        location: PropTypes.object
    };

    render() {
        const { route } = this.context.router;
        const { children } = this.props;
        const location = this.props.location || route.location;

        let match, child;
        React.Children.forEach(children, element => {
            if (match == null && React.isValidElement(element)) {
                const {
                    path: pathProp,
                    exact,
                    strict,
                    sensitive,
                    from
                } = element.props;
                const path = pathProp || from;

                child = element;
                match = matchPath(
                    location.pathname,
                    { path, exact, strict, sensitive },
                    route.match
                );
            }
        });

        return match
            ? React.cloneElement(child, { location, computedMatch: match })
            : null;
    }
}

export default Switch;
