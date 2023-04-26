Object.defineProperty(exports, "__esModule", {
  value: true,
});
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ColumnDataTable = _interopRequireDefault(require("../ColumnDataTable"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * @description react component used for creating table rows
 * @param {object} row
 * @param {number} rowId
 * @param {array of object} columnsTitle
 * @param {array of object} sorting
 * @param {function} setSorting
 * @returns render component RowDataTable
 */
const RowDataTable = (_ref) => {
  let { row, rowId, columnsTitle, sorting, setSorting } = _ref;
  const parity = rowId % 2 ? "odd" : "even";
  return /*#__PURE__*/ _react.default.createElement(
    "tr",
    {
      role: "row",
      className: rowId ? parity : undefined,
    },
    columnsTitle.map((column, index) => {
      // test if header line
      const { data, odd } = rowId
        ? {
            data: row,
            odd: parity,
          }
        : {};
      return /*#__PURE__*/ _react.default.createElement(
        _ColumnDataTable.default,
        {
          key: ""
            .concat(column.data, "_")
            .concat(rowId || 0, "-")
            .concat(index + 1),
          setSorting: rowId ? undefined : setSorting,
          data,
          column,
          odd,
          sorting,
        }
      );
    })
  );
};
var _default = RowDataTable;
const __default = _default;
export { __default as default };
RowDataTable.propTypes = {
  row: _propTypes.default.objectOf(_propTypes.default.string),
  rowId: _propTypes.default.number,
  columnsTitle: _propTypes.default.arrayOf(
    _propTypes.default.objectOf(_propTypes.default.string)
  ).isRequired,
  sorting: _propTypes.default.arrayOf(
    _propTypes.default.shape({
      column: _propTypes.default.string,
      sort: _propTypes.default.string,
      compare: _propTypes.default.func,
    })
  ).isRequired,
  setSorting: _propTypes.default.func,
};
RowDataTable.defaultProps = {
  row: undefined,
  rowId: undefined,
  setSorting: undefined,
};
