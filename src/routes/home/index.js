import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Icon from "../../components/icon";
/* import { Helmet } from "react-helmet"; */
import "./style.scss"

const About = () => (
  <>
    {/* <Helmet> */}
      {/* <title>ber das Projekt</title> */}
    {/* </Helmet> */}
    <Row>
      <Col>
        <p className="teaser-3">
          Für mehr <strong>Lebensqualität</strong> und <strong>klimaschonende</strong> Mobilität:
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className="teaser-1">
          Wie stehts mit der <strong>Verkehrswende</strong> in deiner Stadt?
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className="teaser-2">
          Und wie sieht es in anderen Städten aus?
        </p>
      </Col>
    </Row>
    <Row>
      <Col md={4}>
        <p>
          Das Projekt <strong>Verkehrswende-Index</strong> untersucht und vergleicht den
          Stand der Verkehrswende in deutschen Städten.
        </p>
      </Col>
      <Col md={4}>
        <p className="teaser-4">
          <Icon name="arrow-right"/>&nbsp;
          <Link to="/index">Zu den Ergebnissen</Link>
        </p>
      </Col>
    </Row>

  </>
);

export default About;
