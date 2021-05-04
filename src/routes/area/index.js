import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import Analysis from "../../components/analysis";
import Loading from "../../components/loading";

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
  const helmet = (
    <Helmet>
      <title>{data ? data.name : "Gebiet"}</title>
    </Helmet>
  );
  const analysisToShow = analysis ? [analysis] : Object.keys(registeredAnalysis);
  return [
    helmet,
    data ? (
      <div>
        <h1>{data.name}</h1>
        {analysisToShow.map((id) =>
          <Analysis key={id} id={id} area={area} store={store} className="mb-5" />
        )}
        <p></p>
      </div>
    ) : (
      <Loading />
    ),
  ];
};

export default Area;
