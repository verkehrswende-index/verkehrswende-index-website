import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Loading from "../../components/loading";
import IndexTable from "../../components/index-table";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Index = ({ store }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(store.config.dataPath + "index.json")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Der Index</title>
      </Helmet>
      <Row>
        <Col sm={7}>
          <p className="">
            Der <strong>Verkehrswende-Index</strong> untersucht und vergleicht den
            Stand der Verkehrswende in deutschen Gemeinden.
          </p>
          <p>
            Für jede Stadt werden verschiedene Analysen durchgeführt. Das Ergebnis
            ist jeweils ein Wert zwischen 0% und 100%. Die Werte werden gewichtet
            und ergeben zusammen dann das Endergebnis.
          </p>
          <p>
            Als Referenz werden zudem einige weitere euopäische Städte untersucht.
          </p>
        </Col>
        <Col>
          <Alert variant="warning">
            <p>
              Der Index ist noch sehr <strong>experimentell</strong> und umfasst aktuell nur kreisfreie
              Städte. Morgen könnte schon wieder alles anders aussehen.
            </p>
            <p>
              Aktuelle Fortschritte des Projekts könnt ihr auf{" "}
              <a href="https://twitter.com/Verkehrswindex" target="_blank">
                Twitter
              </a>{" "}
              verfolgen. <Link to="/kontakt">Feedback</Link> ist
              erwünscht!
            </p>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
      <Row>
        <Col>
          {data ? <IndexTable data={data}/> : <Loading />}
        </Col>
      </Row>
    </>
  );
};

export default Index;
