import "./Crud.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const Crud = () => {
  const tmpRef = useRef(null);
  // console.log(tmpRef.current);

  const [mood, setMood] = useState("create");

  const [total, setTotal] = useState("");

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

  // console.log(titleInput);

  // Initialize data state with the data from localStorage
  const [data, setData] = useState([]);

  // I use useEffect to prevent the Too many re-renders && into an infinite loop of re-render
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataTable")) || [];

    savedData.find((sDId) => {
      if (sDId.id == tmpRef.current) {
        console.log("yes I am from saveData");

        sDId = titleInput;

        console.log(sDId);
      }
    });

    setData(savedData);

    // console.log(savedData.find((dId) => console.log(dId.id)));
  }, [titleInput]); // The empty depen

  const createNewdata = () => {
    const newCount = +titleInput.count;
    const newData = [...data];

    if (mood === "create") {
      for (let i = 0; i < newCount; i++) {
        const addNewObject = {
          id: uuidv4(),
          title: titleInput.title,
          price: titleInput.price,
          taxes: titleInput.taxes,
          ads: titleInput.ads,
          discount: titleInput.discount,
          category: titleInput.category,
          total: total,
        };

        newData.push(addNewObject);
      }
    } else {
      data.find((dId) => {
        if (dId.id == tmpRef.current) {
          console.log("yes");

          dId = titleInput;

          console.log(dId);
        }
      });

      console.log(data);
    }

    setData(newData);
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

  useEffect(() => {
    const pricevalue = +titleInput.price || 0;
    const taxesvalue = +titleInput.taxes || 0;
    const adsvalue = +titleInput.ads || 0;
    const discountvalue = +titleInput.discount || 1;
    const result = (pricevalue + taxesvalue + adsvalue) / discountvalue;

    setTotal(parseFloat(result.toFixed(2)) || "TOTAL");
  }, [titleInput.price, titleInput.taxes, titleInput.ads, titleInput.discount]);

  // const updateLine = (id) => {
  //   data.find((chossenLine) => {
  //     if (chossenLine.id == id) {
  //       setMood("update");
  //       // setDisable(true);
  //       setTitleInput({
  //         title: chossenLine.title,
  //         price: chossenLine.price,
  //         taxes: chossenLine.taxes,
  //         ads: chossenLine.ads,
  //         discount: chossenLine.discount,
  //         count: chossenLine.count,
  //         category: chossenLine.category,
  //         total: chossenLine.total,
  //       });
  //       tmpRef.current = id;
  //     }
  //   });
  // };

  // const updateLine = (id) => {
  //   setData((prevData) => {
  //     return prevData.map((line) => {
  //       if (line.id === id) {
  //         return {
  //           ...line,
  //           title: titleInput.title,
  //           price: titleInput.price,
  //           taxes: titleInput.taxes,
  //           ads: titleInput.ads,
  //           discount: titleInput.discount,
  //           count: titleInput.count,
  //           category: titleInput.category,
  //           total: titleInput.total,
  //         };
  //       }
  //       return line;
  //     });
  //   });

  //   setMood("update");
  //   tmpRef.current = id;
  // };

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
              disabled={mood == "update" ? true : false}
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
              className="create"
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
              {mood === "create" ? "Create" : "Update"}
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

              {data.map((line) => (
                <tr key={line.id}>
                  <td>{line.title}</td>
                  <td>{line.price + "$"}</td>
                  <td>{line.taxes + "%"}</td>
                  <td>{line.ads + "%"}</td>
                  <td>{line.discount + "%"}</td>
                  <td>{line.total + "$"}</td>
                  <td>{line.category}</td>
                  <td className="update">
                    <button
                      className="update"
                      onClick={() => {
                        updateLine(line.id);
                      }}
                    >
                      UPDATE
                    </button>
                  </td>
                  <td
                    className="delete"
                    onClick={() => {
                      // removeLine(line.id);
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
