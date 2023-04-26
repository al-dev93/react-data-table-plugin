Object.defineProperty(exports, "__esModule", {
  value: true,
});
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _styleModule = _interopRequireDefault(require("./style.module.css"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/* eslint-disable no-plusplus */

/**
 * @description react component used for creating navigation buttons
 * @param {string} wording
 * @param {string} pages
 * @param {string} current
 * @param {funtion} setCurrentPage
 * @returns render button
 */
const TableNavButton = (_ref) => {
  let { wording, pages, current, setCurrentPage } = _ref;
  // text displayed in the button
  const disable =
    (current === pages && wording === "Next") ||
    (current === "1" && wording === "Previous") ||
    pages === "0";
  // enable or disable the Next an Prev buttons
  const active = current === wording;
  /**
   * @description change the current page depending on the click on a navigation button
   * @param {object} event
   * @returns void
   */
  function handleClick(event) {
    let page = +current;
    switch (event.target.textContent) {
      case "Previous":
        setCurrentPage(--page);
        return;
      case "Next":
        setCurrentPage(++page);
        break;
      default:
        setCurrentPage(+event.target.textContent);
        break;
    }
  }
  return /*#__PURE__*/ _react.default.createElement(
    "button",
    {
      className: ""
        .concat(_styleModule.default.button, " ")
        .concat(disable ? _styleModule.default.disabled : "", " ")
        .concat(active ? _styleModule.default.current : ""),
      type: "button",
      disabled: disable ? "disabled" : undefined,
      onClick: (event) => handleClick(event),
    },
    wording
  );
};
var _default = TableNavButton;
const __default = _default;
export { __default as default };
TableNavButton.propTypes = {
  wording: _propTypes.default.string.isRequired,
  pages: _propTypes.default.string.isRequired,
  current: _propTypes.default.string.isRequired,
  setCurrentPage: _propTypes.default.func.isRequired,
};
