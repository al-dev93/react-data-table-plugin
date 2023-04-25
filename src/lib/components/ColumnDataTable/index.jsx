import PropTypes from "prop-types";
import style from "./style.module.css";

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
export function ascendingCompare(a, b) {
  return (a ?? "").localeCompare(b ?? "", "fr", { ignorePunctuation: "true" });
}
/**
 * @description compare two alphabetical values in descending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
export function descendingCompare(a, b) {
  return (b ?? "").localeCompare(a ?? "", "fr", { ignorePunctuation: "true" });
}
/**
 * @description compare two alphanumeric values in ascending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
export function ascendingCompareNumber(a, b) {
  return (a ?? "").localeCompare(b ?? "", "fr", { numeric: "true" });
}
/**
 * @description compare two alphanumeric values in descending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
export function descendingCompareNumber(a, b) {
  return (b ?? "").localeCompare(a ?? "", "fr", { numeric: "true" });
}
/**
 * @description compare two date strings in ascending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
export function ascendingCompareDate(a, b) {
  return (a ? digitizeDate(a) : "") - (b ? digitizeDate(b) : "");
}
/**
 * @description compare two date strings in descending sort
 * @param {string} a
 * @param {string} b
 * @returns <0, 0, >0
 */
export function descendingCompareDate(a, b) {
  return (b ? digitizeDate(b) : "") - (a ? digitizeDate(a) : "");
}
/**
 * @description choose between date comparison or alphanumeric comparison
 * @param {string} type
 * @param {string} sort
 * @returns function of comparison
 */
export function numericTypeSort(type, sort) {
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
    ? {
        ...current,
        sort: "sorting-desc",
        compare:
          type === "date" || type === "number" || type === "alphanumeric"
            ? numericTypeSort(type, "sorting-desc")
            : descendingCompare,
      }
    : {
        ...current,
        sort: "sorting-asc",
        compare:
          type === "date" || type === "number" || type === "alphanumeric"
            ? numericTypeSort(type, "sorting-asc")
            : ascendingCompare,
      };
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
const ColumnDataTable = ({ data, column, odd, sorting, setSorting }) => {
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
      if (copySorting[index].sort !== "sorting-desc")
        copySorting[index] = changeSortDirection(
          copySorting[index],
          column.type ?? undefined
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
        changeSortDirection(sorting[index], column.type ?? undefined),
      ]);
    else setSorting([newSortingClick]);
  }

  return (
    (data && (
      <td className={`${odd} ${setColumnStyle()}`} headers={`${column.data}`}>
        {data[column.data]}
      </td>
    )) || (
      <th
        className={style[setColumnStyle()]}
        tabIndex="0"
        rowSpan="1"
        colSpan="1"
        onClick={(event) => handleSortClick(event)}
        headers={`${column.data}`}
      >
        {column.title}
      </th>
    )
  );
};

export default ColumnDataTable;

ColumnDataTable.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  column: PropTypes.objectOf(PropTypes.string).isRequired,
  odd: PropTypes.string,
  sorting: PropTypes.arrayOf(
    PropTypes.shape({
      column: PropTypes.string,
      sort: PropTypes.string,
      compare: PropTypes.func,
    })
  ).isRequired,
  setSorting: PropTypes.func,
};

ColumnDataTable.defaultProps = {
  data: undefined,
  odd: undefined,
  setSorting: undefined,
};
