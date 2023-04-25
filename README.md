# react-data-table-plugin

This React plugin allows you to create a simple data table in a minimum of time. The table created integrates sorting, filtering and pagination functionalities. It also displays information on the number of records and the filtering result. No customization is required, making implementation quick and easy.
Only two props are needed: stored data and column format.

This library was built with React and Css.

## Main characteristics

- Configuration made with two props
- Built-in functions:
  - Sorting (desc/asc), simple or multi-criteria
  - Pagination
  - Filter

## Installation

This documentation contains information about installation and usage.

### Prerequisites

[NodeJS (version 16.15)](https://nodejs.org/en/)

### Run the following command to install the plugin

`npm install react-data-table-plugin`

## Implementation

### Import plugin

```js
import { DataTable } from "react-data-table-plugin";
```

### Example of data passed to the dataTable prop

#### 1. Prop columnsTitle

```js
const columns = [
  {
    title: "First Name",
    data: "firstName",
    type: "text",
    isRequired: "required",
  },
  {
    title: "Last Name",
    data: "lastName",
    type: "text",
  },
  { title: "Date of Birth", data: "dateOfBirth", type: "date" },
  { title: "Start Date", data: "startDate", type: "date" },
  { title: "Street", data: "street", type: "alphanumeric" },
  { title: "City", data: "city", type: "text" },
  { title: "State", data: "state", type: "list" },
  { title: "Zip Code", data: "zipCode", type: "number" },
  { title: "Department", data: "department", type: "list" },
];
```

#### 2. Data type and format of column object passed by the columnsTitle prop

- title: string,
- data: string in camelcase format,
- type: string, this property is optional
  1. "text": (default value),
  2. "number": numeric value,
  3. "alphanumeric": string with mixed numbers and characters
  4. "date": date in US format MM/DD/YYYY
- isRequired, a non-empty string. This property is optional, it sets the column on which the sorting is done after launching the application

#### 3. Prop dataTable

```js
const data = [
  {
    firstName: "Alphonse",
    lastName: "Daudet",
    startDate: "01/02/2000",
    department: "Sales",
    dateOfBirth: "06/21/1968",
    street: "2 rue de Tartarin",
    city: "Tarascon",
    state: "GA",
    zipCode: "30800",
  },
  {
    firstName: "Louis",
    lastName: "delaporte",
    startDate: "07/06/2004",
    department: "Human Resources",
    dateOfBirth: "10/07/1970",
    street: "84 avenue Victor Hugo",
    city: "Bondy",
    state: "SSD",
    zipCode: "93200",
  },
];
```

Names of the properties of data object must match the values ​​of data properties of the columns object

#### 4. Use of the plug-in

```js
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <DataTable dataTable={data} columnsTitle={columns} />
  </StrictMode>
);
```
