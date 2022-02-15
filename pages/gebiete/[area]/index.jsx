import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/layout';

const __ = (x,y) => x;

import {Col,Row} from "react-bootstrap";
import Score from "../../../components/analysis/score.js";
import AnalysisPreview from "../../../components/analysis-preview";
import Population from "../../../components/population";
import registeredAnalysis from 'lib/analysis/registered.ts';
import styles from "./area.module.scss";
import { fetchIndex, fetchArea } from "lib/data.ts";


// export default function Area({slug, data, store}) {
const Contact = ({data, area, analysis}) => {
  return (
  <Layout>
    <Head>
      <title>{siteTitle(data.name)}</title>
    </Head>
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
    <h2>{__('Analysen')}</h2>
    <div className={styles['analysis-previews']}>
      {Object.keys(registeredAnalysis).map((slug) =>
        <AnalysisPreview key={slug} slug={slug} area={area} title={registeredAnalysis[slug].title} results={analysis[slug].results} results1y={analysis[slug].results1y} className="mb-5" />
      )}
    </div>
  </Layout>
  );
};

export default Contact;

export async function getStaticPaths() {
  const data = await fetchIndex();
  const areas = data.areas.map((v) => ({params: { area: v.slug }}));
  return {
    paths: areas,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const data = await fetchArea(params.area);
  return {
    props: {data, area: params.area, analysis: data.analysis}
  };
}
