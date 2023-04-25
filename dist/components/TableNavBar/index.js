"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _styleModule = _interopRequireDefault(require("./style.module.css"));
var _TableNavButton = _interopRequireDefault(require("../TableNavButton"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * @description react component used to create navbar for pagination
 * @param {string} pages
 * @param {string} current
 * @param {function} setCurrentPage
 * @returns render component
 */
const TableNavBar = (_ref) => {
  let { pages, current, setCurrentPage } = _ref;
  // array containing buttons with page number
  const setOfButton = [];
  for (let index = 0; index < pages; index += 1) {
    const wording = "".concat(index + 1);
    setOfButton.push(
      /*#__PURE__*/ _react.default.createElement(_TableNavButton.default, {
        key: "".concat(index),
        wording,
        current,
        pages,
        setCurrentPage,
      })
    );
  }
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      className: _styleModule.default.wrapper,
    },
    /*#__PURE__*/ _react.default.createElement(_TableNavButton.default, {
      wording: "Previous",
      current,
      pages,
      setCurrentPage,
    }),
    setOfButton,
    /*#__PURE__*/ _react.default.createElement(_TableNavButton.default, {
      wording: "Next",
      current,
      pages,
      setCurrentPage,
    })
  );
};
var _default = TableNavBar;
const __default = _default;
export { __default as default };
TableNavBar.propTypes = {
  pages: _propTypes.default.string.isRequired,
  current: _propTypes.default.string.isRequired,
  setCurrentPage: _propTypes.default.func.isRequired,
};
