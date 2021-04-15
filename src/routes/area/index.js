import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import Analysis from "../../components/analysis";
import Loading from "../../components/loading";

// Note: `user` comes from the URL, courtesy of our router
const Area = ({ store }) => {
  let { area, analysis } = useParams();

  // const [time, setTime] = useState(Date.now());
  // const [count, setCount] = useState(10);

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

  return [
    helmet,
    data ? (
      <div>
        <h1>{data.name}</h1>
        {analysis && <Analysis id={analysis} area={area} store={store} />}
        <p></p>
      </div>
    ) : (
      <Loading />
    ),
  ];
};

export default Area;
