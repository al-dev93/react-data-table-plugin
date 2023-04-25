import PropTypes from "prop-types";
import style from "./style.module.css";

/**
 * @description react component used to enter the number of lines displayed
 * @param {number} length
 * @param {function} setCurrentPage
 * @param {function} setLengthTable
 * @returns render component
 */
const SelectTableLength = ({ length, setCurrentPage, setLengthTable }) => {
  const lengthOptions = ["10", "25", "50", "100"];

  function handleChange(event) {
    setCurrentPage(1);
    setLengthTable({
      rows: +event.target.value,
      pages: Math.ceil(length / +event.target.value),
      lengthTableFiltered: length,
    });
  }

  return (
    <div className={style["data-table-length"]}>
      <label htmlFor="select-length">
        {`Show `}
        <select
          id="select-length"
          name="select-length"
          aria-controls="id-data-table"
          defaultValue="10"
          onChange={(event) => handleChange(event)}
        >
          {lengthOptions.map((value, index) => (
            <option key={`${value}-${index + 1}`} value={value}>
              {value}
            </option>
          ))}
        </select>
        {` entries`}
      </label>
    </div>
  );
};

export default SelectTableLength;

SelectTableLength.propTypes = {
  length: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
  setLengthTable: PropTypes.func.isRequired,
};

SelectTableLength.defaultProps = {
  length: undefined,
};
