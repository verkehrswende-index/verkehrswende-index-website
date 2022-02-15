import { useEffect, useState } from "react";
import Loading from "../loading";
import MapWidget from "./map.js";
import styles from "./style.module.scss";
import { fetchFeatures } from "lib/data.ts";
import { Filter, MapConfig } from 'lib/analysis/registered.ts';
import Switch from "../switch";

type Props = {
  area: any;
  analysis: any;
  config: MapConfig;
};

const filter = new Filter();

const Map = ({area, analysis, config} : Props) => {
  const filterableFeatures = Object.entries(config.features).filter(([k,_]) => k !== 'default');
  var initialFilters : { [key: string]: boolean} = {};
  filterableFeatures.forEach(([k,_]) => {
    initialFilters[k] = false;
  });
  const [filters, setFilters] = useState<{ [key: string]: boolean}>(initialFilters);
  const [showAllFeatures, setShowAllFeatures] = useState<boolean>(true);
  const [map, setMap] = useState<any|null>(null);

  useEffect(() => {
    const map = new MapWidget(`map-${analysis}`, config);
    setMap(map);
  }, []);

  useEffect(() => {
    filterableFeatures.forEach(([k,_]) => {
      setFilters((s) => {return {...s, [k]: showAllFeatures}; })
    });
  }, [showAllFeatures]);

  useEffect(() => {
    if ( ! map ) {
      return;
    }

    const init = async () => {
      const features = await fetchFeatures(area, analysis);
      if ( !showAllFeatures) {
        features.features = features.features.filter(
          (f : GeoJSON.Feature) =>
            Object.keys(filters).some((filterKey) => { return filters[filterKey] && filter.match(f, config.features[filterKey].filter); })
        );
      }
      map.clearFeatures();
      map.view(features);
    };

    init();
  }, [map, filters, showAllFeatures]);

  return (
    <>
      <div className={styles.filter}>
        <Switch id="allFeatures" label={'Alles anzeigen'} checked={showAllFeatures} onChange={()=>{setShowAllFeatures((s) => !s)}}/>
        {filterableFeatures.map(([k,v]) => (
          <Switch key={k} id={k} label={v.label ?? ''} disabled={showAllFeatures} checked={filters[k]} onChange={()=>{setFilters((s) => {return {...s, [k]: !s[k]}; })}}/>
        ))}
      </div>
      <div className={styles['feature-map']} id={`map-${analysis}`}>
        {!map && <Loading />}
      </div>
    </>
  );
};

export default Map;
