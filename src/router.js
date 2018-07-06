import React from "react";
import PropTypes from "prop-types";

class Router extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired, //history对象必须接收
        children: PropTypes.node //router节点下必须挂着children
    };

    static contextTypes = { //Router组件同时作为router context访问者
        router: PropTypes.object
    };

    static childContextTypes = { //Router组件也作为作为context提供者
        router: PropTypes.object.isRequired
    };

    getChildContext() { //context对象，下面挂载history及所以信息，用于全文访问
        return {
            router: {
                ...this.context.router, //这个从哪儿来的被重新定义？？？
                history: this.props.history,
                route: {
                    location: this.props.history.location,
                    match: this.state.match
                }
            }
        };
    }

    state = {
        match: this.computeMatch(this.props.history.location.pathname)
    };

    computeMatch(pathname) {
        return {
            path: "/",
            url: "/",
            params: {},
            isExact: pathname === "/"
        };
    }

    componentWillMount() {
        const { children, history } = this.props;
        //写在willmount生命周期中为了服务端渲染
        this.unlisten = history.listen(() => {
            this.setState({
                match: this.computeMatch(history.location.pathname) //修改路由地址，pathname为url地址
            });
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const { children } = this.props;
        return children ? React.Children.only(children) : null;
    }
}

export default Router;