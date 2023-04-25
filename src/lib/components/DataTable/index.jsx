/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from "prop-types";
import { useState } from "react";
import "./style.css";
import SelectTableLength from "../SelectTableLength";
import InputTableFilter from "../InputTableFilter";
import RowDataTable from "../RowDataTable";
import TableInfo from "../TableInfo";
import TableNavBar from "../TableNavBar";
import { ascendingCompare, numericTypeSort } from "../ColumnDataTable/index";

/**
 * @description react component for creating data table including processing tools
 * @param {array of object} dataTable
 * @param {array of object} columnsTitle
 * @returns render component DataTable
 */
const DataTable = ({ dataTable, columnsTitle }) => {
  const isRequired = columnsTitle.findIndex((value) => !!value.isRequired);
  const initialSortColumn = isRequired < 0 ? 0 : isRequired;
  const initialRowPerPage = 10;
  const dataTableLength = +dataTable.length;
  const [lengthTable, setLengthTable] = useState({
    rows: initialRowPerPage,
    pages: Math.ceil(dataTableLength / initialRowPerPage),
    lengthTableOrdered: dataTableLength,
  });
  const [currentPage, setCurrentPage] = useState(dataTableLength ? 1 : 0);
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState([
    {
      column: columnsTitle[initialSortColumn].data,
      sort: "sorting-asc",
      compare:
        columnsTitle[initialSortColumn].type === "date" ||
        columnsTitle[initialSortColumn].type === "number" ||
        columnsTitle[initialSortColumn].type === "alphanumeric"
          ? numericTypeSort(columnsTitle[initialSortColumn].type, "sorting-asc")
          : ascendingCompare,
    },
  ]);
  /**
   * @param {string} a
   * @param {string} b
   * @returns compiling the result of comparison functions (logical or)
   */
  function compareValue(a, b) {
    return sorting.reduce(
      (accCompare, sortingValue) =>
        accCompare ||
        sortingValue.compare(a[sortingValue.column], b[sortingValue.column]),
      sorting[0].compare(a[sorting[0].column], b[sorting[0].column])
    );
  }
  /**
   * @description filter, sort or paginate the data table
   * @returns copy of dataTable
   */
  function orderTable() {
    let copyTable = [...dataTable];
    lengthTable.lengthTableOrdered = dataTableLength;
    if (filter) {
      copyTable = dataTable.filter(
        (row) =>
          columnsTitle.findIndex((column) =>
            row[column.data].toUpperCase().includes(filter.toUpperCase())
          ) >= 0
      );
      lengthTable.lengthTableOrdered = copyTable.length;
    }
    lengthTable.pages = Math.ceil(copyTable.length / lengthTable.rows);
    return copyTable
      .sort((a, b) => compareValue(a, b))
      .slice(
        lengthTable.rows * (currentPage - 1),
        lengthTable.rows * currentPage
      );
  }

  return (
    <div className="data-table-container">
      <SelectTableLength
        length={lengthTable.lengthTableOrdered}
        {...{ setCurrentPage, setLengthTable }}
      />

      <InputTableFilter {...{ setCurrentPage, setFilter }} />

      {!dataTableLength && (
        <p className="empty-table">No data available in table</p>
      )}

      <table id="id-data-table" role="grid" className="data-table">
        <thead>
          <RowDataTable {...{ columnsTitle, sorting, setSorting }} />
        </thead>
        <tbody>
          {(!!dataTableLength &&
            orderTable().map((row, index) => {
              const rowId = index + 1;
              return (
                <RowDataTable
                  key={`row_${index + 1}`}
                  {...{ row, rowId, columnsTitle, sorting }}
                />
              );
            })) || <tr className="empty-data-table" />}
        </tbody>
      </table>

      <TableInfo {...{ dataTableLength, lengthTable, currentPage }} />

      <TableNavBar
        pages={`${lengthTable.pages}`}
        current={`${currentPage}`}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default DataTable;

DataTable.propTypes = {
  columnsTitle: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired,
  dataTable: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
