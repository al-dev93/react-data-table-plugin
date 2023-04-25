import PropTypes from "prop-types";
import style from "./style.module.css";

/**
 * @description react component used to enter table filter phrase
 * @param {function} setCurrentPage
 * @param {function} setFilter
 * @returns render component input
 */
const InputTableFilter = ({ setCurrentPage, setFilter }) => {
  function handleChange(event) {
    setCurrentPage(1);
    setFilter(event.target.value);
  }

  return (
    <div className={style["data-table-filter"]}>
      <label htmlFor="filter-input">
        Search:
        <input
          id="filter-input"
          name="filter-input"
          type="search"
          aria-controls="id-data-table"
          onChange={(event) => handleChange(event)}
        />
      </label>
    </div>
  );
};

export default InputTableFilter;

InputTableFilter.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
