// Object.defineProperty(exports, "__esModule", {
//   value: true,
// });
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _styleModule = _interopRequireDefault(require("./style.module.css"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * @description react component used to enter the number of lines displayed
 * @param {number} length
 * @param {function} setCurrentPage
 * @param {function} setLengthTable
 * @returns render component
 */
const SelectTableLength = (_ref) => {
  let { length, setCurrentPage, setLengthTable } = _ref;
  const lengthOptions = ["10", "25", "50", "100"];
  function handleChange(event) {
    setCurrentPage(1);
    setLengthTable({
      rows: +event.target.value,
      pages: Math.ceil(length / +event.target.value),
      lengthTableFiltered: length,
    });
  }
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      className: _styleModule.default["data-table-length"],
    },
    /*#__PURE__*/ _react.default.createElement(
      "label",
      {
        htmlFor: "select-length",
      },
      "Show ",
      /*#__PURE__*/ _react.default.createElement(
        "select",
        {
          id: "select-length",
          name: "select-length",
          "aria-controls": "id-data-table",
          defaultValue: "10",
          onChange: (event) => handleChange(event),
        },
        lengthOptions.map((value, index) =>
          /*#__PURE__*/ _react.default.createElement(
            "option",
            {
              key: "".concat(value, "-").concat(index + 1),
              value: value,
            },
            value
          )
        )
      ),
      " entries"
    )
  );
};
var _default = SelectTableLength;
const __default = _default;
export { __default as default };
SelectTableLength.propTypes = {
  length: _propTypes.default.number,
  setCurrentPage: _propTypes.default.func.isRequired,
  setLengthTable: _propTypes.default.func.isRequired,
};
SelectTableLength.defaultProps = {
  length: undefined,
};
