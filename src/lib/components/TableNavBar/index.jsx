import PropTypes from "prop-types";
import style from "./style.module.css";
import TableNavButton from "../TableNavButton";

/**
 * @description react component used to create navbar for pagination
 * @param {string} pages
 * @param {string} current
 * @param {function} setCurrentPage
 * @returns render component
 */
const TableNavBar = ({ pages, current, setCurrentPage }) => {
  // array containing buttons with page number
  const setOfButton = [];
  for (let index = 0; index < pages; index += 1) {
    const wording = `${index + 1}`;
    setOfButton.push(
      <TableNavButton
        key={`${index}`}
        {...{ wording, current, pages, setCurrentPage }}
      />
    );
  }
  return (
    <div className={style.wrapper}>
      <TableNavButton
        wording="Previous"
        {...{ current, pages, setCurrentPage }}
      />
      {setOfButton}
      <TableNavButton wording="Next" {...{ current, pages, setCurrentPage }} />
    </div>
  );
};

export default TableNavBar;

TableNavBar.propTypes = {
  pages: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
