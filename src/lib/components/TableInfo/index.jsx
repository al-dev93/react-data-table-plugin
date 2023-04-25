import PropTypes from "prop-types";
import style from "./style.module.css";

/**
 * @description react component used for displaying information about the data table
 * @param {number} dataTableLength
 * @param {object} lengthTable
 * @param {number} currentPage
 * @returns render component
 */
const TableInfo = ({ dataTableLength, lengthTable, currentPage }) => {
  const startOfCurrentPage = lengthTable.lengthTableOrdered
    ? lengthTable.rows * (currentPage - 1) + 1
    : 0;
  const endOfCurrentPage =
    currentPage * lengthTable.rows <= lengthTable.lengthTableOrdered
      ? currentPage * lengthTable.rows
      : lengthTable.lengthTableOrdered;

  return (
    <div className={style["data-table-info"]}>
      <p>{`Showing ${startOfCurrentPage} to ${endOfCurrentPage}`}</p>
      {(dataTableLength === lengthTable.lengthTableOrdered && (
        <p>{`of ${lengthTable.lengthTableOrdered} entries`}</p>
      )) || <p>{`entries (filtered from ${dataTableLength} total entries)`}</p>}
    </div>
  );
};

export default TableInfo;

TableInfo.propTypes = {
  dataTableLength: PropTypes.number.isRequired,
  lengthTable: PropTypes.objectOf(PropTypes.number).isRequired,
  currentPage: PropTypes.number.isRequired,
};
