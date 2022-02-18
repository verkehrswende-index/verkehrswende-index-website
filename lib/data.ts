import config from "config.json5";
import registeredAnalysis from "lib/analysis/registered";

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

export type AnalysisGeometryObject = GeoJSON.GeometryObject;
export type AnalysisProperties = GeoJSON.GeoJsonProperties;
export type AnalysisFeature = GeoJSON.Feature<
  AnalysisGeometryObject,
  AnalysisProperties
>;
export type AnalysisFeatureCollection = GeoJSON.FeatureCollection<
  AnalysisGeometryObject,
  AnalysisProperties
>;

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

/**
 * Fetches the features for the given area and analysis.
 *
 * @param area The area id.
 * @param analysis The analysis id.
 * @param date The date specifier.
 * @returns Promiseof fetched Features
 */
export async function fetchFeatures(
  area: string,
  analysis: string,
  date: string = ""
): Promise<AnalysisFeatureCollection> {
  const dateInfix = date === "" ? "" : "1y.";
  const response = await fetch(
    config.remoteDataURI +
      `areas/${area}/analysis/${analysis}/features.${dateInfix}json`
  );
  return response.json();
}

/**
 * Get a map from ids to features for the given feature collection.
 *
 * The features will not be copied, only referenced!
 *
 * @param collection The feature collection
 * @returns The mapped features.
 */
export function getFeatureMap(
  collection: AnalysisFeatureCollection
): Map<AnalysisFeature["id"], AnalysisFeature> {
  const map = new Map();
  collection.features.forEach((feature) => {
    map.set(feature.id, feature);
  });
  return map;
}
