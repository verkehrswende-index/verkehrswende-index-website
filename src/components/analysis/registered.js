var registeredAnalysis = {
  'haltestellen-entfernung': {
    name: 'stop_distance',
    title: "Haltestellen-Entfernung",
    description: `
Wie viel PKW kommen auf eine*n Einwohner*in?
    `,
    map: {},
    values: {
      // 'cars_per_resident': {
      //   title: "PKWs pro Einwohner*in",
      //   lowerIsBetter: true,
      // },
    },
  },
  'pkw-dichte': {
    name: 'cars_per_resident',
    title: "PKW-Dichte",
    description: `
Wie viel PKW kommen auf eine*n Einwohner*in?
    `,
    values: {
      'cars_per_resident': {
        title: "PKWs pro Einwohner*in",
        lowerIsBetter: true,
      },
    },
  },
  radinfrastruktur: {
    name: 'bike_infrastructure',
    title: "Radinfrastruktur",
    description: `
Wie viele Radwege und Radspuren gibt es
im Verhältnis zu allen Wegen?
    `,
    map: {},
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
