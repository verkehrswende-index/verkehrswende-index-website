const __ = (x,y) => x;

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

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
        <h1>{data.name}</h1>
        <p>
          <strong>{__( 'Einwohner*innen' )}:</strong> <Population value={data.population}/>
          {/* <br/> */}
          {/* <strong>{__( 'Bürgermeister*in' )}:</strong> <Population value={data.mayorParty}/> */}
        </p>
        {analysisToShow.map((id) =>
          <Analysis key={id} id={id} area={area} store={store} className="mb-5" />
        )}
        <p></p>
      </div>
      ) : (
        <Loading />
      ) }
    </>
  );
};

export default Area;
