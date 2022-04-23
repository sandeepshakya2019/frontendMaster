import React, { useState, useEffect } from "react";
import axios from "axios";

function FormProduct({ submit }) {
  const [subcategory, setsubcategory] = useState();
  const [category, setcategory] = useState();
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState("");
  const [categ, setcateg] = useState("");
  const [subcateg, setsubcateg] = useState("");
  const [count, setcount] = useState(0);

  const [msg, setmsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        setcategory(res.data);
        console.log(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function selectSubcateg(cate) {
    axios
      .get("http://localhost:5000/subcategories/" + cate)
      .then((res) => {
        setsubcategory(res.data);
        // console.log("sub", res.data);
      })
      .catch((err) => {
        setmsg("no subcategory found please choose diifrent one");
        console.log(err);
        setsubcategory({ subcategories: [] });
      });
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(name, desc, price, categ, subcateg, count);
    // if (!name || !desc || price || !categ || !subcateg || !count) {
    //   setmsg("Please fill all fields");
    //   return 0;
    // } else {
    axios
      .post("http://localhost:5000/products", {
        name: name,
        description: desc,
        price: price,
        SubCategory: subcateg,
        countInStock: count,
      })
      .then((res) => {
        console.log(res);
        setmsg("Data is Created");
        submit(true);
      })
      .catch((err) => {
        console.log(err);
        setmsg("Something is went worng ");
      });
  }
  //   }
  return (
    <form onSubmit={submitHandler}>
      <p style={{ color: "red" }}>{msg && msg}</p>
      <div class="form-group">
        <label for="productname">Product Name</label>
        <input
          type="text"
          class="form-control"
          id="productname"
          aria-describedby="emailHelp"
          placeholder="Enter Product Name"
          name="productname"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          placeholder="Description"
          name="description"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          class="form-control"
          id="price"
          placeholder="Price"
          name="price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="price">CountInStock</label>
        <input
          type="number"
          class="form-control"
          id="price"
          placeholder="Price"
          name="count"
          value={count}
          onChange={(e) => setcount(e.target.value)}
        />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select
          id="category"
          class="form-control"
          value={categ}
          onChange={(e) => {
            setcateg(e.target.value);
            selectSubcateg(e.target.value);
          }}
        >
          <option value={null}>Choose Category</option>
          {category &&
            category.categories.map((i) => {
              return (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              );
            })}
        </select>
      </div>
      <div class="form-group">
        <label for="subcateg">SubCatgeory</label>
        <select
          id="subcateg"
          class="form-control"
          value={subcateg}
          onChange={(e) => {
            setsubcateg(e.target.value);
          }}
        >
          <option value={null}>Choose Category</option>
          {subcategory &&
            subcategory.subcategories.map((i) => {
              return (
                <option key={i._id} value={i._id}>
                  {i.subcateg}
                </option>
              );
            })}
        </select>
      </div>
      <br />
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default FormProduct;
