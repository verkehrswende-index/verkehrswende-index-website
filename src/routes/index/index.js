import React, { useEffect, useState } from "react";
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
      <Alert variant="warning">
        Der Index ist noch sehr experimentell und umfasst aktuell nur kreisfreie
        Städte. Morgen könnte schon wieder alles anders aussehen. Feedback ist
        erwünscht!
      </Alert>
      <Alert variant="info">
        Für jede Stadt werden verschiedene Analysen durchgeführt. Das Ergebnis
        ist jeweils ein Wert zwischen 0% und 100%. Die Werte werden gewichtet
        und ergeben zusammen dann das Endergebnis.
      </Alert>
      {data ? <IndexTable data={data}/> : <Loading />}
    </>
  );
};

export default Index;
