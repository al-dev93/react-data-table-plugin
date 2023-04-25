import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.sort.js";
import "core-js/modules/web.dom-collections.iterator.js";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
const _ascendingCompare = ascendingCompare;
export { _ascendingCompare as ascendingCompare };
const _ascendingCompareDate = ascendingCompareDate;
export { _ascendingCompareDate as ascendingCompareDate };
const _ascendingCompareNumber = ascendingCompareNumber;
export { _ascendingCompareNumber as ascendingCompareNumber };
const _descendingCompare = descendingCompare;
export { _descendingCompare as descendingCompare };
const _descendingCompareDate = descendingCompareDate;
export { _descendingCompareDate as descendingCompareDate };
const _descendingCompareNumber = descendingCompareNumber;
export { _descendingCompareNumber as descendingCompareNumber };
const _numericTypeSort = numericTypeSort;
export { _numericTypeSort as numericTypeSort };
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _styleModule = _interopRequireDefault(require("./style.module.css"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    // eslint-disable-next-line no-unused-expressions
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
/**
 * @description remove the "/" character and convert the string to YYYYMMDD format
 * @param {string} stringDate
 * @returns string date YYYYMMDD
 */
function digitizeDate(stringDate) {
  const stringToArray = stringDate.split("/");
  return stringToArray[2] + stringToArray[0] + stringToArray[1];
}
/**
 * @description compare two alphabetical values in ascending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
function ascendingCompare(a, b) {
  return (a !== null && a !== void 0 ? a : "").localeCompare(
    b !== null && b !== void 0 ? b : "",
    "fr",
    {
      ignorePunctuation: "true",
    }
  );
}
/**
 * @description compare two alphabetical values in descending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
function descendingCompare(a, b) {
  return (b !== null && b !== void 0 ? b : "").localeCompare(
    a !== null && a !== void 0 ? a : "",
    "fr",
    {
      ignorePunctuation: "true",
    }
  );
}
/**
 * @description compare two alphanumeric values in ascending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
function ascendingCompareNumber(a, b) {
  return (a !== null && a !== void 0 ? a : "").localeCompare(
    b !== null && b !== void 0 ? b : "",
    "fr",
    {
      numeric: "true",
    }
  );
}
/**
 * @description compare two alphanumeric values in descending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
function descendingCompareNumber(a, b) {
  return (b !== null && b !== void 0 ? b : "").localeCompare(
    a !== null && a !== void 0 ? a : "",
    "fr",
    {
      numeric: "true",
    }
  );
}
/**
 * @description compare two date strings in ascending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
function ascendingCompareDate(a, b) {
  return (a ? digitizeDate(a) : "") - (b ? digitizeDate(b) : "");
}
/**
 * @description compare two date strings in descending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
function descendingCompareDate(a, b) {
  return (b ? digitizeDate(b) : "") - (a ? digitizeDate(a) : "");
}
/**
 * @description choose between date comparison or alphanumeric comparison
 * @param {string} type
 * @param {string} sort
 * @returns function of comparison
 */
function numericTypeSort(type, sort) {
  if (sort === "sorting-asc")
    return type === "date" ? ascendingCompareDate : ascendingCompareNumber;
  return type === "date" ? descendingCompareDate : descendingCompareNumber;
}
/**
 * @description change the sort direction
 * @param {object} current
 * @param {string} type
 * @returns sort object with reversed direction and the corresponding sort function
 */
function changeSortDirection(current, type) {
  return current.sort === "sorting-asc"
    ? _objectSpread(
        _objectSpread({}, current),
        {},
        {
          sort: "sorting-desc",
          compare:
            type === "date" || type === "number" || type === "alphanumeric"
              ? numericTypeSort(type, "sorting-desc")
              : descendingCompare,
        }
      )
    : _objectSpread(
        _objectSpread({}, current),
        {},
        {
          sort: "sorting-asc",
          compare:
            type === "date" || type === "number" || type === "alphanumeric"
              ? numericTypeSort(type, "sorting-asc")
              : ascendingCompare,
        }
      );
}
/**
 * @description react component for creating table columns
 * @param {object} data
 * @param {object} column
 * @param {string} odd
 * @param {array} sorting
 * @param {function} setSorting
 * @returns render component
 */
const ColumnDataTable = (_ref) => {
  let { data, column, odd, sorting, setSorting } = _ref;
  /**
   * @returns the class name to style the columns used for sorting
   */
  function setColumnStyle() {
    if (data)
      return sorting.find((sortItem) => sortItem.column === column.data)
        ? "sorting"
        : "";
    const columnStyle = sorting.filter(
      (sortItem) => sortItem.column === column.data
    );
    return columnStyle.length
      ? columnStyle[columnStyle.length - 1].sort
      : "sorting";
  }
  /**
   * @description add sort criterion in the object copySorting or change the state of a criterion of multi-criteria sort
   * @param {number} index
   * @param {object} newSortingClick
   */
  function handleMultiSortKey(index, newSortingClick) {
    const copySorting = [...sorting];
    if (index > -1) {
      var _column$type;
      if (copySorting[index].sort !== "sorting-desc")
        copySorting[index] = changeSortDirection(
          copySorting[index],
          (_column$type = column.type) !== null && _column$type !== void 0
            ? _column$type
            : undefined
        );
      else if (copySorting.length > 1) copySorting.splice(index, 1);
    } else copySorting.push(newSortingClick);
    setSorting([...copySorting]);
  }
  /**
   * @description manage the registration of sort types on click on the column header
   * @param {object} event
   * @returns void
   */
  function handleSortClick(event) {
    var _column$type2;
    const newSortingClick = {
      column: event.target.headers,
      sort: "sorting-asc",
      compare:
        column.type === "date" ||
        column.type === "number" ||
        column.type === "alphanumeric"
          ? numericTypeSort(column.type, "sorting-asc")
          : ascendingCompare,
    };
    const index = sorting.findIndex(
      (sortItem) => sortItem.column === event.target.headers
    );
    if (event.shiftKey) {
      handleMultiSortKey(index, newSortingClick);
      return;
    }
    if (index > -1)
      setSorting([
        changeSortDirection(
          sorting[index],
          (_column$type2 = column.type) !== null && _column$type2 !== void 0
            ? _column$type2
            : undefined
        ),
      ]);
    else setSorting([newSortingClick]);
  }
  return (
    (data &&
      /*#__PURE__*/ _react.default.createElement(
        "td",
        {
          className: "".concat(odd, " ").concat(setColumnStyle()),
          headers: "".concat(column.data),
        },
        data[column.data]
      )) ||
    /*#__PURE__*/ _react.default.createElement(
      "th",
      {
        className: _styleModule.default[setColumnStyle()],
        tabIndex: "0",
        rowSpan: "1",
        colSpan: "1",
        onClick: (event) => handleSortClick(event),
        headers: "".concat(column.data),
      },
      column.title
    )
  );
};
var _default = ColumnDataTable;
const __default = _default;
export { __default as default };
ColumnDataTable.propTypes = {
  data: _propTypes.default.objectOf(_propTypes.default.string),
  column: _propTypes.default.objectOf(_propTypes.default.string).isRequired,
  odd: _propTypes.default.string,
  sorting: _propTypes.default.arrayOf(
    _propTypes.default.shape({
      column: _propTypes.default.string,
      sort: _propTypes.default.string,
      compare: _propTypes.default.func,
    })
  ).isRequired,
  setSorting: _propTypes.default.func,
};
ColumnDataTable.defaultProps = {
  data: undefined,
  odd: undefined,
  setSorting: undefined,
};
