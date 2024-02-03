import "./Crud.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const Crud = () => {
  // total
  const [total, setTotal] = useState("");

  //  empty inputs
  const [titleInput, setTitleInput] = useState({
    title: "",
    price: "",
    taxes: "",
    ads: "",
    discount: "",
    count: "",
    category: "",
    total: "",
  });

  // save the new object here
  const todos = [];

  // loop on data => show on table
  const [data, setData] = useState(todos);
  // console.log(data);

  const newData = JSON.parse(localStorage.getItem("dataTable")) || [];
  // console.log(newData);

  const dataTable = newData;
  // console.log(dataTable);

  // create new object for adding to array
  const createNewdata = () => {
    const newCount = +titleInput.count;
    const newData = [...data]; // create a copy of the exciting data array;
    for (let i = 0; i < newCount; i++) {
      const addNewObject = {
        id: uuidv4(),
        title: titleInput.title,
        price: titleInput.price,
        taxes: titleInput.taxes,
        ads: titleInput.ads,
        discount: titleInput.discount,
        category: titleInput.category,
        total: total, // Note: You may want to recalculate the total here based on individual values
      };

      newData.push(addNewObject); // Update the state with the modified array

      // setData([...data, addNewObject]); => my first solution
    }

    setData(newData);

    // Save the state to localStorage
    localStorage.setItem("dataTable", JSON.stringify(newData));

    setTitleInput({
      title: "",
      price: "",
      taxes: "",
      ads: "",
      discount: "",
      count: "",
      category: "",
      total: "",
    });
  };

  // total
  useEffect(() => {
    const pricevalue = +titleInput.price || 0;
    const taxesvalue = +titleInput.taxes || 0;
    const adsvalue = +titleInput.ads || 0;
    const discountvalue = +titleInput.discount || 1;
    const result = (pricevalue + taxesvalue + adsvalue) / discountvalue;

    setTotal(parseFloat(result.toFixed(2)) || "TOTAL");
  }, [titleInput.price, titleInput.taxes, titleInput.ads, titleInput.discount]);

  // const removeLine = (id) => {
  //   console.log(id);
  //   // dataTable.filter((DtId) => console.log(DtId.id == id));

  //   dataTable.filter((DtId) => {
  //     if (DtId.id == id) {
  //       // console.log("yes");
  //       dataTable.splice(id, 1);
  //     }
  //     return dataTable;
  //   });
  // };

  const removeLine = (id) => {
    const delteChoosenLine = dataTable.filter((DtId) => DtId.id !== id);
    setData(delteChoosenLine);
    localStorage.setItem("dataTable", JSON.stringify(delteChoosenLine));
  };

  return (
    <section className="crud">
      <div className="header">
        <h2>CRUDS</h2>
        <p>CREATE READ UPDATE DELETE SEARCH</p>
      </div>

      <div className="inputs">
        <Container maxWidth="lg">
          <Box>
            <TextField
              sx={{ width: "100%", margin: "0px 0px 30px 0px" }}
              id="title"
              label="Title"
              value={titleInput.title}
              onChange={(e) => {
                setTitleInput({ ...titleInput, title: e.target.value });
              }}
            />
            <Box
              sx={{
                display: "flex ",
                flexDirection: "row",
                margin: "0px 0px 30px 0px",
              }}
            >
              <TextField
                sx={{ marginLeft: "3px", flexBasis: "23%" }}
                id="price"
                label="Price"
                type="number"
                value={titleInput.price}
                onChange={(event) => {
                  setTitleInput({ ...titleInput, price: event.target.value });
                }}
                inputProps={{
                  min: 1,
                }}
              />
              <TextField
                sx={{ marginLeft: "3px", flexBasis: "23%" }}
                id="taxes"
                label="Taxes"
                type="number"
                value={titleInput.taxes}
                onChange={(event) => {
                  setTitleInput({ ...titleInput, taxes: event.target.value });
                }}
                inputProps={{
                  min: 1,
                }}
              />
              <TextField
                sx={{ marginLeft: "3px", flexBasis: "23%" }}
                id="ads"
                label="Ads"
                type="number"
                value={titleInput.ads}
                onChange={(event) => {
                  setTitleInput({ ...titleInput, ads: event.target.value });
                }}
                inputProps={{
                  min: 1,
                }}
              />
              <TextField
                sx={{ marginLeft: "3px", flexBasis: "23%" }}
                id="discount"
                label="Discount"
                type="number"
                value={titleInput.discount}
                onChange={(event) => {
                  setTitleInput({
                    ...titleInput,
                    discount: event.target.value,
                  });
                }}
                inputProps={{
                  min: 1,
                }}
              />
              <p className="total">{total}</p>
            </Box>

            <TextField
              sx={{ width: "100%", margin: "0px 0px 30px 0px" }}
              id="count"
              label="Count"
              type="number"
              value={titleInput.count}
              onChange={(event) => {
                setTitleInput({ ...titleInput, count: event.target.value });
              }}
            />
            <TextField
              sx={{ width: "100%", margin: "0px 0px 30px 0px" }}
              id="category"
              label="Category"
              value={titleInput.category}
              type="text"
              onChange={(event) => {
                setTitleInput({ ...titleInput, category: event.target.value });
              }}
            />
            <Button
              // check if the inputs full
              disabled={
                titleInput.title == "" ||
                titleInput.price == "" ||
                titleInput.taxes == "" ||
                titleInput.ads == "" ||
                titleInput.discount == "" ||
                titleInput.count == "" ||
                titleInput.category == ""
              }
              type="button"
              sx={{
                width: "100%",
                fontSize: "1.3rem",
                fontWeight: "bold",
                margin: "0px 0px 30px 0px",
              }}
              variant="outlined"
              onClick={() => {
                createNewdata();
              }}
            >
              Create
            </Button>

            <TextField
              sx={{ width: "100%", margin: "0px 0px 30px 0px" }}
              id="search"
              label="Search"
            />

            <Button
              type="button"
              sx={{
                width: "100%",
                fontSize: "1.3rem",
                fontWeight: "bold",
                margin: "0px 0px 30px 0px",
              }}
              variant="outlined"
              color="error"
            >
              DELETE ALL
            </Button>
          </Box>
        </Container>
      </div>

      <div className="table">
        <Container>
          <table>
            <thead>
              <tr>
                <td>TITLE</td>
                <td>PRICE</td>
                <td>TAXES</td>
                <td>ADS</td>
                <td>DISCOUNT</td>
                <td>TOTAL</td>
                <td>CATEGORY</td>
                <td>UPDATE</td>
                <td>DELETE</td>
              </tr>
            </thead>

            <tbody>
              {/* {data.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.price + "$"}</td>
                  <td>{todo.taxes + "%"}</td>
                  <td>{todo.ads + "%"}</td>
                  <td>{todo.discount + "%"}</td>
                  <td>{todo.total + "$"}</td>
                  <td>{todo.category}</td>
                  <td className="update">
                    <button>UPDATE</button>
                  </td>
                  <td className="delete">
                    <button>DELETE</button>
                  </td>
                </tr>
              ))} */}

              {dataTable.map((line) => (
                <tr key={line.id}>
                  <td>{line.title}</td>
                  <td>{line.price + "$"}</td>
                  <td>{line.taxes + "%"}</td>
                  <td>{line.ads + "%"}</td>
                  <td>{line.discount + "%"}</td>
                  <td>{line.total + "$"}</td>
                  <td>{line.category}</td>
                  <td className="update">
                    <button>UPDATE</button>
                  </td>
                  <td
                    className="delete"
                    onClick={() => {
                      removeLine(line.id);
                    }}
                  >
                    <button>DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    </section>
  );
};

export default Crud;
