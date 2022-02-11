var registeredAnalysis = {
  'haltestellen-abdeckung': {
    name: 'stop_distance',
    title: "Haltestellen-Abdeckung",
    category: 'public_transport',
    description: `
Wie weit ist es bis zur nächsten ÖPNV-Haltestelle?
    `,
    map: {
      features: {
        default: {
          name: 'Haltestelle',
        }
      },
    },
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
    category: 'car',
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
    category: 'bicycle',
    description: `
Wie viele Radwege und Radspuren gibt es
im Verhältnis zu allen Wegen?
    `,
    map: {
      features: {
        default: {
          name: 'Ignorierter Weg (Fußwege, Privatwege, ...)',
        }
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
