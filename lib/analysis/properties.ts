import { AnalysisProperties } from "lib/data";

// The type of a feature property used in analysis.
type PropertyType = "score" | "bool" | null;

// A configuration of properties.
type Properties = {
  [key: string]: {
    label: string;
    type?: PropertyType;
    valueMap?: {
      [key: string]: string;
    };
  };
};

// Configurations of known properties.
const knownProperties: Properties = {
  lit: {
    label: "Beleuchtet",
    type: "bool",
  },
  surface: {
    label: "Oberfläche",
    valueMap: {
      asphalt: "Asphalt",
    },
  },
  surfaceFactor: {
    label: "Bewertung Oberfläche",
    type: "score",
  },
  wayFactor: {
    label: "Bewertung Weg",
    type: "score",
  },
  score: {
    label: "Bewertung",
    type: "score",
  },
};

// A map of property keys to their values, label and types.
type MappedProperties = {
  [key: string]: {
    label: string;
    value: string;
    type: PropertyType;
  };
};

// A group of known and unknown properties.
type MappedPropertiesGroups = {
  known: MappedProperties;
  unknown: MappedProperties;
};

/**
 * Maps string properties to mapped properties.
 *
 * @param properties The properties to map.
 * @returns The mapped properties.
 */
export function mapProperties(
  properties: AnalysisProperties
): MappedPropertiesGroups {
  const ret = {
    known: {},
    unknown: {},
  };
  Object.entries(properties).forEach(([k, v]) => {
    if (k in knownProperties) {
      ret.known[k] = {
        label: knownProperties[k].label,
        value:
          knownProperties[k].valueMap && v in knownProperties[k].valueMap
            ? knownProperties[k].valueMap[v]
            : v,
        type: knownProperties[k].type,
      };
    } else {
      ret.unknown[k] = {
        label: k,
        value: v,
        type: null,
      };
    }
  });
  return ret;
}
