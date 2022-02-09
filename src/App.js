import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

function App() {
  const [userData, setUserData] = useState([]);
  const [order, setOrder] = useState("");
  const [column, setColumn] = useState("");
  const [orderLast, setOrderLast] = useState("");

  const formatData = (data) => {
    let temp = {};
    temp["id"] = data[0].id.value;
    temp["title"] = data[0].name.title;
    temp["firstName"] = data[0].name.first;
    temp["lastName"] = data[0].name.last;
    temp["email"] = data[0].email;
    temp["gender"] = data[0].gender;

    let dateofBirth = data[0].dob.date.split("T")[0];
    temp["dob"] = dateofBirth;

    temp["cell"] = data[0].cell;
    temp["phone"] = data[0].phone;

    temp[
      "streetAddress"
    ] = `${data[0].location.street.number} ${data[0].location.street.name}`;
    temp["city"] = data[0].location.city;
    temp["state"] = data[0].location.state;
    temp["country"] = data[0].location.country;
    temp["postalCode"] = data[0].location.postcode;

    let registeredDate = data[0].registered.date.split("T")[0];
    temp["registeredDate"] = registeredDate;
    return temp;
  };

  const apiCall = async () => {
    let currentRequest = 1;
    let result = [];
    while (currentRequest <= 5) {
      let response = await Axios.get("https://randomuser.me/api/");
      console.log("response", response);
      let formattedData = formatData(response.data.results);
      result = [...result, formattedData];
      currentRequest++;
    }
    console.log("result", result);
    setUserData(result);
  };
  useEffect(() => {
    apiCall();
  }, []);

  const handleFirstNameHeader = () => {
    setOrderLast("");
    if (order === "") {
      setOrder("asc");
      setColumn("firstName");
    } else if (order === "asc") {
      setOrder("desc");
      setColumn("firstName");
    } else {
      setOrder("");
      setColumn("");
    }
  };

  const handlelastNameHeader = () => {
    setOrder("");
    if (orderLast === "") {
      setOrderLast("asc");
      setColumn("lastName");
    } else if (orderLast === "asc") {
      setOrderLast("desc");
      setColumn("lastName");
    } else {
      setOrderLast("");
      setColumn("");
    }
  };

  const renderSortIcon = () => {
    if (order === "") {
      return null;
    } else if (order === "asc") {
      return <FontAwesomeIcon icon={faSortUp} />;
    } else return <FontAwesomeIcon icon={faSortDown} />;
  };

  const renderSortIconLastName = () => {
    if (orderLast === "") {
      return null;
    } else if (orderLast === "asc") {
      return <FontAwesomeIcon icon={faSortUp} />;
    } else return <FontAwesomeIcon icon={faSortDown} />;
  };

  let sortedArray = [...userData];
  console.log("sortedArray before", sortedArray);
  console.log("order ", order);
  console.log("column", column);
  console.log("orderLast", orderLast);
  if (order !== "" && column !== "" && column === "firstName") {
    sortedArray = _.orderBy(sortedArray, [column], [order]);
  } else if (orderLast !== "" && column !== "" && column === "lastName") {
    sortedArray = _.orderBy(sortedArray, [column], [orderLast]);
  }
  console.log("sortedArray after", sortedArray);

  return (
    <div className="App">
      <Table striped bordered hover responsive style={{ marginTop: "50px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th onClick={handleFirstNameHeader}>
              FirstName {renderSortIcon()}
            </th>
            <th onClick={handlelastNameHeader}>
              LastName {renderSortIconLastName()}
            </th>
            <th>Email</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Cell Number</th>
            <th>Phone Number</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Postal Code</th>
            <th>Registered Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedArray.map((item) => (
            <tr>
              <td>{item.title}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.dob}</td>
              <td>{item.cell}</td>
              <td>{item.phone}</td>
              <td>{item.streetAddress}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.country}</td>
              <td>{item.postalCode}</td>
              <td>{item.registeredDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
