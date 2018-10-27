import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes";
import Layout from "./components/Layout";
import {  configureStore, initializeSession } from "./redux/store";
import htmlTemplate from './template';

export default function render(req, res) {
  const context = {};
  const store = configureStore();

  store.dispatch(initializeSession());

  const dataRequirements =
    routes
      .filter(route => matchPath( req.url, route ) ) // filter matching paths
      .map(route => route.component ) // map to components
      .filter(comp => comp.serverFetch ) // check if components have data requirement
      .map(comp => store.dispatch( comp.serverFetch( ) ) ); // dispatch data requirement

  Promise.all(dataRequirements).then(() => {
    const jsx = (
      <ReduxProvider store={ store }>
          <StaticRouter context={context} location={req.url}>
              <Layout />
          </StaticRouter>
      </ReduxProvider>
    );
    const reactDom = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(htmlTemplate(reactDom, reduxState, helmetData));
  });
}
