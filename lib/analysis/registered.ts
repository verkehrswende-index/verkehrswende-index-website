import { filterConfigs as bicycleInfrastructureFilterConfigs } from "../../../verkehrswindex-analysis/src/analysis/bike-infrastructure.mjs";
import { filterConfigs as stopDistanceFilterConfigs } from "../../../verkehrswindex-analysis/src/analysis/stop-distance.mjs";
import Filter from "../../../verkehrswindex-analysis/src/osm/filter.js";
export { Filter };

export type MapConfig = {
  features: {
    [key: string]: {
      name?: string;
      label?: string;
      filter?: any;
    };
  };
};

export type AnalysisConfig = {
  [key: string]: {
    name: string;
    title: string;
    category: string;
    description: string;
    map?: MapConfig;
    values: {
      [key: string]: {
        title: string;
        lowerIsBetter?: boolean;
        unit?: string;
        description?: string;
      };
    };
  };
};

const registeredAnalysis: AnalysisConfig = {
  "haltestellen-abdeckung": {
    name: "stop_distance",
    title: "Haltestellen-Abdeckung",
    category: "public_transport",
    description: `
Wie weit ist es bis zur nächsten ÖPNV-Haltestelle?
    `,
    map: {
      features: {
        default: {
          name: "Haltestelle",
        },
        stop: {
          label: "Haltestelle",
          filter: stopDistanceFilterConfigs.stop,
        },
        building: {
          label: "Gebäude",
          filter: stopDistanceFilterConfigs.building,
        },
      },
    },
    values: {
      // 'cars_per_resident': {
      //   title: "PKWs pro Einwohner*in",
      //   lowerIsBetter: true,
      // },
    },
  },
  "pkw-dichte": {
    name: "cars_per_resident",
    title: "PKW-Dichte",
    category: "car",
    description: `
Wie viel PKW kommen auf eine*n Einwohner*in?
    `,
    values: {
      cars_per_resident: {
        title: "PKWs pro Einwohner*in",
        lowerIsBetter: true,
      },
    },
  },
  radinfrastruktur: {
    name: "bike_infrastructure",
    title: "Radinfrastruktur",
    category: "bicycle",
    description: `
Wie viele Radwege und Radspuren gibt es
im Verhältnis zu allen Wegen?
    `,
    map: {
      features: {
        default: {
          name: "Ignorierter Weg (Fußwege, Privatwege, ...)",
        },
        bicycleRoad: {
          label: "Radstraßen",
          filter: bicycleInfrastructureFilterConfigs.bicycleRoad,
        },
        cycleWay: {
          label: "Radwege",
          filter: bicycleInfrastructureFilterConfigs.cycleWay,
        },
      },
    },
    values: {
      good: {
        title: "Gut",
        unit: "m",
        description: "Komfortable, schnelle, sichere Rad-Infrastruktur",
      },
      acceptable: {
        title: "Akzeptabel",
        unit: "m",
        description:
          "Minimal/Akzeptable Rad-Infrastruktur sowie Wege mit Tempo 30",
      },
      bad: {
        title: "Schlecht",
        unit: "m",
        description: "Schlechte oder nicht vorhandene Rad-Infrastruktur",
        lowerIsBetter: true,
      },
    },
  },
};

export default registeredAnalysis;
