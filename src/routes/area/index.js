const __ = (x,y) => x;

import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import {useParams} from "react-router-dom";

import AreaComponent from "../../components/area";
import Analysis from "../../components/analysis";
import Loading from "../../components/loading";

import registeredAnalysis from '../../components/analysis/registered.js';

const Area = ({ store }) => {
  let {area, analysis} = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      store.config.dataURI + `areas/${encodeURIComponent(area)}/config.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const title = analysis
              ? registeredAnalysis[analysis].title + (data ? ` in ${data.name}` : "")
              : (data ? data.name : "Gebiet")

  return (
    <>
      <Helmet>
        <title>
          {title}
        </title>
      </Helmet>
      { data ? (
          analysis
          ? (<Analysis key={analysis} id={analysis} areaId={area} areaConfig={data} store={store} className="mb-5" />)
          : ( <AreaComponent slug={area} data={data} store={store}/> )
      ) : (
        <Loading />
      ) }
    </>
  );
};

export default Area;
