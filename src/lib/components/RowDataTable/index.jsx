import PropTypes from "prop-types";
import ColumnDataTable from "../ColumnDataTable";

/**
 * @description react component used for creating table rows
 * @param {object} row
 * @param {number} rowId
 * @param {array of object} columnsTitle
 * @param {array of object} sorting
 * @param {function} setSorting
 * @returns render component RowDataTable
 */
const RowDataTable = ({ row, rowId, columnsTitle, sorting, setSorting }) => {
  const parity = rowId % 2 ? "odd" : "even";
  return (
    <tr role="row" className={rowId ? parity : undefined}>
      {columnsTitle.map((column, index) => {
        // test if header line
        const { data, odd } = rowId ? { data: row, odd: parity } : {};
        return (
          <ColumnDataTable
            key={`${column.data}_${rowId || 0}-${index + 1}`}
            setSorting={rowId ? undefined : setSorting}
            {...{ data, column, odd, sorting }}
          />
        );
      })}
    </tr>
  );
};

export default RowDataTable;

RowDataTable.propTypes = {
  row: PropTypes.objectOf(PropTypes.string),
  rowId: PropTypes.number,
  columnsTitle: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired,
  sorting: PropTypes.arrayOf(
    PropTypes.shape({
      column: PropTypes.string,
      sort: PropTypes.string,
      compare: PropTypes.func,
    })
  ).isRequired,
  setSorting: PropTypes.func,
};

RowDataTable.defaultProps = {
  row: undefined,
  rowId: undefined,
  setSorting: undefined,
};
