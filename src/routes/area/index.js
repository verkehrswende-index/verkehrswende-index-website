const __ = (x,y) => x;

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import {Col,Row} from "react-bootstrap";

import Score from "../../components/analysis/score.js";
import Analysis from "../../components/analysis";
import Loading from "../../components/loading";
import Population from "../../components/population";

import registeredAnalysis from '../../components/analysis/registered.js';

const Area = ({ store }) => {
  let { area, analysis } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      store.config.dataPath + `areas/${encodeURIComponent(area)}/config.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  const analysisToShow = analysis ? [analysis] : Object.keys(registeredAnalysis);
  return (
    <>
      <Helmet>
        <title>{data ? data.name : "Gebiet"}</title>
      </Helmet>
      { data ? (
      <div>
        <h1 className="mb-0 pb-0">{data.name}</h1>
        <small className="text-muted">
          { Object.keys(data).map( tag => tag.match(/^name:(?!de$)[a-z]{2}$/) ? data[tag] : null ).filter( (tag, index, self) => tag && self.indexOf(tag) === index ).join('  ·  ') }
        </small>
        <Row className="mt-4 mb-5">
          <Col xs={4} sm={3} lg={2}>
            <Score showMaxScore={true} score={data.score} oldScore={data.score1Y} />
          </Col>
          <Col>
            <strong>{__( 'Einwohner*innen' )}:</strong> <Population value={data.population}/>
            <br/>
            <strong>{__( 'Bürgermeister*in' )}:</strong> {data.mayorParty}
          </Col>
        </Row>
        {analysisToShow.map((id) =>
          <Analysis key={id} id={id} area={area} store={store} className="mb-5" />
        )}
      </div>
      ) : (
        <Loading />
      ) }
    </>
  );
};

export default Area;
