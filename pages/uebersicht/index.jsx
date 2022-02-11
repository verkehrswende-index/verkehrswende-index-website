const __ = (x,y) => x;

import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../components/layout';
import { Accordion, Row, Button, Col, Card } from "react-bootstrap";
import Loading from "../../components/loading";
import IndexTable from "../../components/index-table";
import { Alert } from "react-bootstrap";
import Icon from "../../components/icon";
import Score from "../../components/analysis/score.js";
import styles from "./style.module.scss";

import config from "../../config.json5";

const Index = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle('Übersicht')}</title>
      </Head>
      <Alert variant="warning">
        <p>
          <Icon name="flask"/>&nbsp;
    Der Index ist noch sehr <strong>experimentell</strong> und umfasst aktuell nur kreisfreie
    Städte. Morgen könnte schon wieder alles anders aussehen.
        </p>
        <p>
          Aktuelle Fortschritte des Projekts könnt ihr auf{" "}
          <a href="https://twitter.com/Verkehrswindex" target="_blank" rel="noreferrer">
            Twitter
          </a>{" "}
          verfolgen. <Link href="/kontakt">Feedback</Link> ist
          erwünscht!
        </p>
      </Alert>
      <Accordion className="mb-3">
        <Card>
          <Card.Header as="h5">
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <Icon name="info-circle"/> Einführung
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles['index-help']}>
              <Card.Text>
                Für jede <Icon name="map-signs"/> Stadt werden verschiedene Analysen in den Kategorien <Icon name="bicycle"/> Fahrrad, <Icon name="ban-car"/> Auto und <Icon name="bus"/> ÖPNV durchgeführt. Das Ergebnis ist jeweils eine Punktzahl zwischen 0 und 100.
              </Card.Text>
              <Card.Text>
                Aus den einzelnen Punktzahlen der Analysen werden dann die Gesamtpunktzahlen der Katogieren (<Icon name="bicycle"/> <Icon name="ban-car"/> <Icon name="bus"/>) berechnet. Die einzelnen Analysen fließen dabei unterschiedlich stark in die Gesamtpunktzahl der Kategorie ein.
              </Card.Text>
              <Card.Text>
                Die <Icon name="trophy"/> Gesamtpunktzahl der Stadt wird wiederum aus den unterschiedlich stark einfließenden Gesamtpunktzahlen der Kategorien (<Icon name="bicycle"/> <Icon name="ban-car"/> <Icon name="bus"/>) berechnet.
              </Card.Text>
              <Card.Text>
                Die <Icon name="hashtag"/> Position ergibt sich aus den <Icon name="trophy"/> Gesamtpunktzahlen. Auf Platz 1 ist die Stadt mit der höchsten Gesamtpunktzahl.
              </Card.Text>
              <Card.Text>
                Die <Icon name="line-chart"/> Trends geben an, wie sich die <Icon name="trophy"/> Gesampunktzahl innerhalb eines Jahres geändert hat.
              </Card.Text>
              <Card.Text>
                Als Vergleich werden zudem einige weitere euopäische Städte untersucht.
              </Card.Text>
              <Card.Text>
                Durch Klick auf das jeweilige Spalten-Icon kann die <strong>Sortierung</strong> verändert werden.<br/>
                <strong>Detaillierte Informationen</strong> erhält man durch einen Kick auf den Stadtnamen.
              </Card.Text>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header as="h5">
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <Icon name="info-circle"/> Spalten-Übersicht
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={styles['index-help']}>
              <Card.Text>
                <Icon name="hashtag" title={__("Position")}/> <strong>Platzierung</strong> der Stadt im Index.<br/>
                <Icon name="trophy" title={__("Gesamtpunkte")}/> <strong>Gesamtpunktzahl</strong> der Stadt: Setzt sich aus den Punktzahlen der Kategorien Fahrrad, Autos und ÖPNV zusammen.<br/>
                <Icon name="map-signs" title={__("Ort")}/> <strong>Name der Stadt</strong><br/>
                <Icon name="line-chart" title={__("Trend")}/> <strong>Trend</strong> der Gesamtpunktzahl im Zeitraum von einem Jahr.<br/>
                <Icon name="bicycle" title={__("Kategorie Fahrrad")}/> Kategorie <strong>Fahrrad</strong>: Wie gut ist die Radinfrastruktur in der Stadt?<br/>
    <Icon name="ban-car" title={__("Kategorie Auto")}/> Kategorie <strong>Auto</strong>: Wie stark ist die Verdrängung des Autos?<br/>
    <Icon name="bus" title={__("Kategorie ÖPNV")}/> Kategorie <strong>ÖPNV</strong>: Wie gut ist der ÖPNV in der Stadt ausgebaut?<br/>
              </Card.Text>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Row>
        <Col>
          {data ? <IndexTable data={data}/> : <Loading />}
        </Col>
      </Row>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const data = await fetch(config.dataURI + "index.json")
        .then((response) => response.json());
  return {
    props: {data}
  };
}
