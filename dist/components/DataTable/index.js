import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.reduce.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.sort.js";
import "./style.css";
import { numericTypeSort, ascendingCompare } from "../ColumnDataTable/index";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _SelectTableLength = _interopRequireDefault(
  require("../SelectTableLength")
);
var _InputTableFilter = _interopRequireDefault(require("../InputTableFilter"));
var _RowDataTable = _interopRequireDefault(require("../RowDataTable"));
var _TableInfo = _interopRequireDefault(require("../TableInfo"));
var _TableNavBar = _interopRequireDefault(require("../TableNavBar"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/* eslint-disable jsx-a11y/anchor-is-valid */

/**
 * @description react component for creating data table including processing tools
 * @param {array of object} dataTable
 * @param {array of object} columnsTitle
 * @returns render component DataTable
 */
const DataTable = (_ref) => {
  let { dataTable, columnsTitle } = _ref;
  const isRequired = columnsTitle.findIndex((value) => !!value.isRequired);
  const initialSortColumn = isRequired < 0 ? 0 : isRequired;
  const initialRowPerPage = 10;
  const dataTableLength = +dataTable.length;
  const [lengthTable, setLengthTable] = (0, _react.useState)({
    rows: initialRowPerPage,
    pages: Math.ceil(dataTableLength / initialRowPerPage),
    lengthTableOrdered: dataTableLength,
  });
  const [currentPage, setCurrentPage] = (0, _react.useState)(
    dataTableLength ? 1 : 0
  );
  const [filter, setFilter] = (0, _react.useState)("");
  const [sorting, setSorting] = (0, _react.useState)([
    {
      column: columnsTitle[initialSortColumn].data,
      sort: "sorting-asc",
      compare:
        columnsTitle[initialSortColumn].type === "date" ||
        columnsTitle[initialSortColumn].type === "number" ||
        columnsTitle[initialSortColumn].type === "alphanumeric"
          ? (0, numericTypeSort)(
              columnsTitle[initialSortColumn].type,
              "sorting-asc"
            )
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
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      className: "data-table-container",
    },
    /*#__PURE__*/ _react.default.createElement(_SelectTableLength.default, {
      length: lengthTable.lengthTableOrdered,
      setCurrentPage,
      setLengthTable,
    }),
    /*#__PURE__*/ _react.default.createElement(_InputTableFilter.default, {
      setCurrentPage,
      setFilter,
    }),
    !dataTableLength &&
      /*#__PURE__*/ _react.default.createElement(
        "p",
        {
          className: "empty-table",
        },
        "No data available in table"
      ),
    /*#__PURE__*/ _react.default.createElement(
      "table",
      {
        id: "id-data-table",
        role: "grid",
        className: "data-table",
      },
      /*#__PURE__*/ _react.default.createElement(
        "thead",
        null,
        /*#__PURE__*/ _react.default.createElement(_RowDataTable.default, {
          columnsTitle,
          sorting,
          setSorting,
        })
      ),
      /*#__PURE__*/ _react.default.createElement(
        "tbody",
        null,
        (!!dataTableLength &&
          orderTable().map((row, index) => {
            const rowId = index + 1;
            return /*#__PURE__*/ _react.default.createElement(
              _RowDataTable.default,
              {
                key: "row_".concat(index + 1),
                row,
                rowId,
                columnsTitle,
                sorting,
              }
            );
          })) ||
          /*#__PURE__*/ _react.default.createElement("tr", {
            className: "empty-data-table",
          })
      )
    ),
    /*#__PURE__*/ _react.default.createElement(_TableInfo.default, {
      dataTableLength,
      lengthTable,
      currentPage,
    }),
    /*#__PURE__*/ _react.default.createElement(_TableNavBar.default, {
      pages: "".concat(lengthTable.pages),
      current: "".concat(currentPage),
      setCurrentPage: setCurrentPage,
    })
  );
};
var _default = DataTable;
const __default = _default;
export { __default as default };
DataTable.propTypes = {
  columnsTitle: _propTypes.default.arrayOf(
    _propTypes.default.objectOf(_propTypes.default.string)
  ).isRequired,
  dataTable: _propTypes.default.arrayOf(
    _propTypes.default.objectOf(_propTypes.default.string)
  ).isRequired,
};
