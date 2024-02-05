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

  // Initialize data state with the data from localStorage
  const [data, setData] = useState([]);

  const totalItems = data.length;

  // I use useEffect to prevent the Too many re-renders && into an infinite loop of re-render
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataTable")) || [];

    setData(savedData);
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
          total: parseFloat(total),
        };

        newData.push(addNewObject);
      }
    }

    setData(newData);

    // Update local storage with the modified data
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

  const updateLine = (id) => {
    data.find((chossenLine) => {
      if (chossenLine.id == id) {
        setMood("update");
        setTitleInput({
          title: chossenLine.title,
          price: chossenLine.price,
          taxes: chossenLine.taxes,
          ads: chossenLine.ads,
          discount: chossenLine.discount,
          count: chossenLine.count,
          category: chossenLine.category,
          total: chossenLine.total,
        });
        tmpRef.current = id;
      }
    });
  };

  // updateData && updateLine connected with each other
  const updateData = () => {
    if (mood === "update") {
      const updateData = data.map((upData) => {
        if (upData.id === tmpRef.current) {
          console.log(upData);
          return {
            id: upData.id,
            title: titleInput.title,
            price: titleInput.price,
            taxes: titleInput.taxes,
            ads: titleInput.ads,
            discount: titleInput.discount,
            category: titleInput.category,
            total: parseFloat(total),
          };
        } else {
          return upData;
        }
      });

      // Update local storage with the modified data
      localStorage.setItem("dataTable", JSON.stringify(updateData));

      setData(updateData);
    }
  };

  const removeLine = (id) => {
    const removeData = data.filter((rLine) => {
      return rLine.id != id;
    });
    // Update local storage with the modified data
    localStorage.setItem("dataTable", JSON.stringify(removeData));

    setData(removeData);
  };

  useEffect(() => {
    const pricevalue = +titleInput.price || 0;
    const taxesvalue = +titleInput.taxes || 0;
    const adsvalue = +titleInput.ads || 0;
    const discountvalue = +titleInput.discount || 1;
    const result = (pricevalue + taxesvalue + adsvalue) / discountvalue;

    setTotal(parseFloat(result.toFixed(2)) || "TOTAL");
  }, [titleInput.price, titleInput.taxes, titleInput.ads, titleInput.discount]);

  const DeleteAll = () => {
    // alert("Delete All");
    window.localStorage.clear();
    setData(data.length > 0 ? [] : data);
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
              // value={titleInput.count}
              value={mood === "update" ? "" : titleInput.count}
              onChange={(e) => {
                setTitleInput({ ...titleInput, count: e.target.value });
              }}
              disabled={mood === "update"}
            />
            <TextField
              sx={{ width: "100%", margin: "0px 0px 30px 0px" }}
              id="category"
              label="Category"
              value={titleInput.category}
              type="text"
              onChange={(e) => {
                setTitleInput({ ...titleInput, category: e.target.value });
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

                setMood(mood === "update" ? "create" : "create");

                {
                  mood === "update" ? updateData() : "";
                }
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
              onClick={DeleteAll}
            >
              DELETE ALL {`(${totalItems})`}
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

            {data.map((line) => (
              <tbody key={line.id}>
                <tr>
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
                      removeLine(line.id);
                    }}
                  >
                    <button>DELETE</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </Container>
      </div>
    </section>
  );
};

export default Crud;
