import React from "react";
import Trend from "../../components/trend";
import { Link } from "react-router-dom";
import { useFilters, useTable, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';
import Score from "../analysis/score.js";
import "./style.scss";

function DefaultColumnFilter({
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

const IndexTable = ({data}) => {
  const tableData = React.useMemo(
    () => (data ? data.areas.map((area) => { return {
      name: area.name,
      slug: area.slug,
      score: area.score,
      trend: area.score / area.score1Y - 1,
    } } ) : []),
    [data]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'Stadt',
        accessor: 'name',
        Filter: DefaultColumnFilter,
        Cell: ({value, row}) => (
          <Link to={`/gebiete/${row.original.slug}/analysen/radinfrastruktur`}>
            {value}
          </Link>
        ),
      },
      {
        Header: 'Punkte',
        disableFilters: true,
        Cell: ({value}) => <Score score={value}/>,
        accessor: 'score',
        sortType: 'basic',
        style: { width: '7em' },
      },
      {
        Header: 'Trend',
        disableFilters: true,
        Cell: ({value}) => <Trend increase={value}/>,
        accessor: 'trend',
        sortType: 'basic',
        style: { width: '8em' },
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData }, useFilters, useSortBy);
   return (
     <>
     <p>{headerGroups[0].headers[0].canFilter ? headerGroups[0].headers[0].render('Filter') : null}</p>
     <Table {...getTableProps()} className="index-table">
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
         {rows.map(row => {
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
     </>
   )

};

export default IndexTable;
