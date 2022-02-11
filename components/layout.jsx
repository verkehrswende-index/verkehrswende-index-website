import { Footer, Container, Row, Col } from "react-bootstrap";

import Header from "./header";
import config from "../config.json5";

export const siteTitle = (title) => (title ? `${title} | ` : '') + 'Verkehrswende-Index';

export default function Layout({ children }) {
  return (
    <div id="app">
      <Header />
      <Container>
        <Row className="mt-5">
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
      <footer>
        <Container className="text-center">
          {/* <p className="text-muted">
             Entwickelt
             </p> */}
        </Container>
      </footer>
    </div>
  );
}
