const __ = (x,y) => x;

import React from "react";
import Population from "../../components/population";
import Trend from "../../components/trend";
import Icon from "../../components/icon";
import { Link } from "react-router-dom";
import { usePagination, useFilters, useTable, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';
import Score from "../analysis/score.js";
import "./style.scss";
import { Slider } from 'rsuite';
import { RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.css';

function LocationFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Durchsuche ${count} Orte...`}
    />
  );
}

function PopulationFilter({
  column: { filterValue, setFilter },
}) {
  return (
    <div className="index-table-filters__population">
      <Icon
        name={`users`}
        title={__( 'Einwohner*innen' )}
      />
      <RangeSlider
        graduated
        progress
        value={filterValue||[0,4000000]}
        min={0}
        step={50000}
        max={4000000}
        renderMark={mark => {
          if ([0,200000, 1000000, 2000000, 4000000].includes(mark)) {
            if (mark >= 1000000) {
              return <span>{mark/1000000} Mio.</span>;
            } else if (mark >= 1000) {
              return <span>{mark/1000} Tsd.</span>;
            }
            return 0;
          }
          return null;
        }}
        onChange={e => { setFilter( () => e ); }}
      />
    </div>
  )
};

const IndexTable = ({data}) => {
  const tableData = React.useMemo(
    () => {
      if ( ! data ) {
        return [];
      }
      var position = 0;
      return data.areas.map((area) => {
        const isInternational = 'international' in area;
        if ( ! isInternational ) {
          position += 1;
        }
        return {
          index: isInternational ? null : position,
          name: area.name,
          slug: area.slug,
          population: area.population,
          scores: area.scores,
          score: area.score,
          trend: area.score / area.score1Y - 1,
          mayorParty: area.mayorParty,
        };
      });
    },
    [data]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: <Icon name="hashtag" title={__("Position")}/>,
        disableFilters: true,
        accessor: 'index',
        sortType: 'basic',
        style: { width: '0em' },
      },
      {
        Header: <Icon name="trophy" title={__("Gesamtpunkte")}/>,
        disableFilters: true,
        Cell: ({value}) => <Score score={value}/>,
        accessor: 'score',
        sortType: 'basic',
        style: { width: '5em' },
      },
      {
        Header: <Icon name="map-signs" title={__("Ort")}/>,
        accessor: 'name',
        Filter: LocationFilter,
        Cell: ({value, row}) => (
          <>
            <Link to={`/gebiete/${row.original.slug}`}>
              {value}
            </Link><br/>
            <small className="text-muted">
              <Icon
                name={`users`}
                title={__( 'Einwohner*innen' )}
              />
          &nbsp;
          <span className="text-muted"><Population value={row.original.population}/></span>
            </small>
          </>
        ),
      },
      {
        accessor: 'population',
        Filter: PopulationFilter,
        filter: 'between',
      },
      {
        Header: <Icon name="line-chart" title={__("Trend")}/>,
        disableFilters: true,
        Cell: ({value}) => <Trend increase={value}/>,
        accessor: 'trend',
        sortType: 'basic',
        style: { width: '8em' },
      },
      {
        Header: <Icon name="bicycle" title={__("Rad-Freundlichkeit")}/>,
        disableFilters: true,
        Cell: ({value}) => <Score score={value}/>,
        accessor: 'scores.bike_infrastructure.score',
        sortType: 'basic',
        style: { width: '7em' },
      },
      {
        Header: <Icon name="bus" title={__("ÖPNV-Angebot")}/>,
        disableFilters: true,
        Cell: ({value}) => <Score score={value}/>,
        accessor: 'scores.stop_distance.score',
        sortType: 'basic',
        style: { width: '7em' },
      },
      {
        Header: <Icon name="ban-car" title={__("Auto-Verdrängung")}/>,
        disableFilters: true,
        Cell: ({value}) => (value !== null ? <Score score={value}/> : ''),
        accessor: 'scores.cars_per_resident.score',
        sortType: 'basic',
        style: { width: '7em' },
      },
      /* {
       *   Header: 'Bürgermeister*in',
       *   disableFilters: true,
       *   accessor: 'mayorParty',
       *   style: { width: '10em' },
       * }, */
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    allColumns,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        pageIndex: 0,
        hiddenColumns: [ 'population' ],
      },
    },
    useFilters,
    useSortBy,
    usePagination,
  );
  return (
    <>

      <div className="index-table-filters">
        {allColumns[2].render('Filter')}
        {allColumns[3].render('Filter')}
      </div>
      <div className="index-table">
        <Table {...getTableProps()}>
          <thead>
            {// Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps([{ style: column.style }, column.getSortByToggleProps()])} >
                    {// Render the header
                    column.render('Header')}
                    <span>
                      {column.isSorted
                      ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                      : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <ul className="index-table-pagination pagination mt-3">
        <li className={"page-item " + (!canPreviousPage?"disabled":"")}>
          <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); previousPage();}}>
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">{__("Vorherige Seite")}</span>
          </a>
        </li>
    {
      Array.from({length: pageOptions.length}, (v,i) => (
        <li className={"page-item " + ((pageIndex === i)?"active":"")}>
          <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); gotoPage(i);}}>
            {i+1}
          </a>
        </li>
      ))
    }
        <li className={"page-item " + (!canNextPage?"disabled":"")}>
          <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); nextPage();}}>
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">{__("Nächste Seite")}</span>
          </a>
        </li>
      </ul>
    </>
  )

};

export default IndexTable;
