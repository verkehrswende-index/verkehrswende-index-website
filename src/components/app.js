// import { Router } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { Footer, Container, Row, Col } from 'react-bootstrap';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import About from '../routes/about';
import Area from '../routes/area';
import Contact from '../routes/contact';

const App = () => (
  <div id="app">
    <Router>
      <Header />
      <Container>
        <Row className="mt-5">
          <Col>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/ueber" component={About} />
              <Route path={["/gebiete/:area/analysen/:analysis", "/gebiete/:area"]}
                component={Area} />
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

