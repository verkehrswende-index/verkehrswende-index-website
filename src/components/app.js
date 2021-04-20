// import { Router } from 'react-router-dom';
import React from "react";
import { Helmet } from "react-helmet";
import { Redirect, BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Footer, Container, Row, Col } from "react-bootstrap";

import Header from "./header";

// Code-splitting is automated for `routes` directory
import Index from "../routes/index";
import About from "../routes/about";
import Area from "../routes/area";
import Contact from "../routes/contact";

var store = {
  config: {
    /* 'dataPath': '/data/', */
    dataPath: "http://localhost:3000/",
  },
};

const App = () => (
  <div id="app">
    <Router>
      <Helmet titleTemplate="%s | Verkehrswende-Index">
        <title></title>
      </Helmet>
      <Header />
      <Container>
        <Row className="mt-5">
          <Col>
            <Switch>
              <Route exact path="/">
                <Index store={store} />
              </Route>
              <Route exact path="/index">
                <Redirect to="/"/>
              </Route>
              <Route exact path="/ueber" component={About} />
              <Route
                path={["/gebiete/:area/analysen/:analysis", "/gebiete/:area"]}
              >
                <Area store={store} />
              </Route>
              <Route exact path="/kontakt" component={Contact} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
    <footer>
      <Container className="text-center">
        {/* <p className="text-muted">
            Entwickelt
            </p> */}
      </Container>
    </footer>
  </div>
);

export default App;
