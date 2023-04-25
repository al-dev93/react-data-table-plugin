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
 * @description react component used to enter table filter phrase
 * @param {function} setCurrentPage
 * @param {function} setFilter
 * @returns render component input
 */
const InputTableFilter = (_ref) => {
  let { setCurrentPage, setFilter } = _ref;
  function handleChange(event) {
    setCurrentPage(1);
    setFilter(event.target.value);
  }
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      className: _styleModule.default["data-table-filter"],
    },
    /*#__PURE__*/ _react.default.createElement(
      "label",
      {
        htmlFor: "filter-input",
      },
      "Search:",
      /*#__PURE__*/ _react.default.createElement("input", {
        id: "filter-input",
        name: "filter-input",
        type: "search",
        "aria-controls": "id-data-table",
        onChange: (event) => handleChange(event),
      })
    )
  );
};
var _default = InputTableFilter;
const __default = _default;
export { __default as default };
InputTableFilter.propTypes = {
  setCurrentPage: _propTypes.default.func.isRequired,
  setFilter: _propTypes.default.func.isRequired,
};
