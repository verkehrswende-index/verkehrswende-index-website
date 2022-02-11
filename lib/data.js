import config from "../config.json5";
import registeredAnalysis from '../components/analysis/registered.js';

export async function fetchIndex() {
  return fetch(config.dataURI + "index.json")
    .then((response) => response.json());
}

export async function fetchArea(area) {
  const path = config.dataURI + `areas/${area}`;
  const data = await fetch(`${path}/config.json`)
        .then((response) => response.json());
  data.analysis = {};
  await Promise.all(Object.keys(registeredAnalysis).map(async (slug) => {
    const name = registeredAnalysis[slug].name;
    const results = await fetch(`${path}/analysis/${name}/results.json`)
          .then((response) => response.json());
    const results1y = await fetch(`${path}/analysis/${name}/results.1y.json`)
          .then((response) => response.json());
    data.analysis[slug] = { results, results1y };
  }));
  return data;
}

export async function fetchFeatures(area, analysis) {
  const response = await fetch(
    config.remoteDataURI + `areas/${area}/analysis/${analysis}/features.json`
  );
  return response.json();
}
