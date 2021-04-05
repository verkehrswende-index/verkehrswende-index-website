import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Analysis from '../../components/analysis';

// Note: `user` comes from the URL, courtesy of our router
const Area = () => {
  let { area, analysis } = useParams();

	// const [time, setTime] = useState(Date.now());
	// const [count, setCount] = useState(10);

  const [data, setData] = useState(null);

	useEffect(() => {
		const opts = {
			headers: {
				// 'X-WP-Nonce': wpApiSettings.nonce,
			},
			method: 'GET',
		};
		fetch(
			`http://localhost:3000/areas/${encodeURIComponent(area)}/config.json`,
			opts
		)
      .then( ( response ) => response.json() )
      .then( ( json ) => { setData(json);  } );
	}, []);

	return data ? (
		<div className={style.profile}>
      <h1>{ data.name }</h1>
			<p>Analysen für { data.name }.</p>
      { ( analysis && <Analysis id={analysis} area={area} /> ) }
			<p>
			</p>
		</div>
  ) : <p>Loading</p>;
}

export default Area;
