import config from "../config.json5";
import registeredAnalysis from "lib/analysis/registered.ts";

export async function fetchIndex() {
  return fetch(config.dataURI + "index.json").then((response) =>
    response.json()
  );
}

export async function fetchArea(area: string) {
  const path = config.dataURI + `areas/${area}`;
  const data = await fetch(`${path}/config.json`).then((response) =>
    response.json()
  );
  data.analysis = {};
  await Promise.all(
    Object.keys(registeredAnalysis).map(async (slug) => {
      const name = registeredAnalysis[slug].name;
      const results = await fetch(`${path}/analysis/${name}/results.json`).then(
        (response) => response.json()
      );
      const results1y = await fetch(
        `${path}/analysis/${name}/results.1y.json`
      ).then((response) => response.json());
      data.analysis[slug] = { results, results1y };
    })
  );
  return data;
}

export async function fetchFeaturesDownloadSize(
  area: string,
  analysis: string
): Promise<number> {
  const response = await fetch(
    config.remoteDataURI + `areas/${area}/analysis/${analysis}/features.json`,
    {
      method: "HEAD",
    }
  );
  const lengthString = response.headers.get("Content-Length");
  if (lengthString === null) {
    return NaN;
  }
  return parseInt(lengthString, 10);
}

export async function fetchFeatures(
  area: string,
  analysis: string
): Promise<GeoJSON.FeatureCollection> {
  const response = await fetch(
    config.remoteDataURI + `areas/${area}/analysis/${analysis}/features.json`
  );
  return response.json();
}
