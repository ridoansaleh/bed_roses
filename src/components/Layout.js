import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import routes from "../routes";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "Welcome to React SSR!",
    };
  }

  render() {
    return (
      <div>
        <h1>{ this.state.title }</h1>
        <Header />
        <Switch>
          { routes.map( route => <Route key={ route.path } { ...route } /> ) }
        </Switch>
      </div>
    );
  }
}

export default Layout;
