import Head from "next/head";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import Icon from "../components/icon";
import styles from "./index.module.scss";
import Layout, { siteTitle } from "../components/layout";

const About = () => (
  <Layout>
    <Head>
      <title>{siteTitle()}</title>
    </Head>
    <Row>
      <Col>
        <p className={styles.teaser3}>
          Für mehr <strong>Lebensqualität</strong> und{" "}
          <strong>klimaschonende</strong> Mobilität:
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className={styles.teaser1}>
          Wie stehts mit der <strong>Verkehrswende</strong> in deiner Stadt?
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className={styles.teaser2}>
          Und wie sieht es in anderen Städten aus?
        </p>
      </Col>
    </Row>
    <Row>
      <Col md={4}>
        <p>
          Das Projekt <strong>Verkehrswende-Index</strong> untersucht und
          vergleicht den Stand der Verkehrswende in deutschen Städten.
        </p>
      </Col>
      <Col md={4}>
        <p className={styles.teaser4}>
          <Icon name="arrow-right" />
          &nbsp;
          <Link href="/uebersicht">Zu den Ergebnissen</Link>
        </p>
      </Col>
    </Row>
  </Layout>
);

export default About;
