const __ = (x,y) => x;

import React from "react";
import {Col,Row} from "react-bootstrap";
import Score from "../../components/analysis/score.js";
import Analysis from "../../components/analysis";
import AnalysisPreview from "../../components/analysis-preview";
import Loading from "../../components/loading";
import Population from "../../components/population";
import registeredAnalysis from '../../components/analysis/registered.js';
import "./style.scss";

export default function Area({slug, data, store}) {
  console.log(slug);
  return (
    <>
      <h1 className="mb-0 pb-0">{data.name}</h1>
      <small className="text-muted">
        { Object.keys(data).map( tag => tag.match(/^name:(?!de$)[a-z]{2}$/) ? data[tag] : null ).filter( (tag, index, self) => tag && self.indexOf(tag) === index ).join('  ·  ') }
      </small>
      <Row className="mt-4 mb-5">
        <Col xs={8} sm={3} className="mb-3">
          <Score showMaxScore={true} score={data.score} oldScore={data.score1Y} />
        </Col>
        <Col xs={12} sm={9}>
          <strong>{__( 'Einwohner*innen' )}:</strong> <Population value={data.population}/>
          <br/>
          <strong>{__( 'Bürgermeister*in' )}:</strong> {data.mayorParty}
        </Col>
      </Row>
      <h2>Analysen</h2>
      <div className="analysis-previews">
        {Object.keys(registeredAnalysis).map((id) =>
          <AnalysisPreview key={id} id={id} area={slug} store={store} className="mb-5" />
        )}
      </div>
    </>
  );
}
