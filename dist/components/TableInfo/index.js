"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _styleModule = _interopRequireDefault(require("./style.module.css"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * @description react component used for displaying information about the data table
 * @param {number} dataTableLength
 * @param {object} lengthTable
 * @param {number} currentPage
 * @returns render component
 */
const TableInfo = (_ref) => {
  let { dataTableLength, lengthTable, currentPage } = _ref;
  const startOfCurrentPage = lengthTable.lengthTableOrdered
    ? lengthTable.rows * (currentPage - 1) + 1
    : 0;
  const endOfCurrentPage =
    currentPage * lengthTable.rows <= lengthTable.lengthTableOrdered
      ? currentPage * lengthTable.rows
      : lengthTable.lengthTableOrdered;
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      className: _styleModule.default["data-table-info"],
    },
    /*#__PURE__*/ _react.default.createElement(
      "p",
      null,
      "Showing ".concat(startOfCurrentPage, " to ").concat(endOfCurrentPage)
    ),
    (dataTableLength === lengthTable.lengthTableOrdered &&
      /*#__PURE__*/ _react.default.createElement(
        "p",
        null,
        "of ".concat(lengthTable.lengthTableOrdered, " entries")
      )) ||
      /*#__PURE__*/ _react.default.createElement(
        "p",
        null,
        "entries (filtered from ".concat(dataTableLength, " total entries)")
      )
  );
};
var _default = TableInfo;
const __default = _default;
export { __default as default };
TableInfo.propTypes = {
  dataTableLength: _propTypes.default.number.isRequired,
  lengthTable: _propTypes.default.objectOf(_propTypes.default.number)
    .isRequired,
  currentPage: _propTypes.default.number.isRequired,
};
