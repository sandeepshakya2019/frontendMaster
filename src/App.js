import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import CreateProduct from "./components/CreateProduct";
import Products from "./components/Products";

function App() {
  const [products, setProducts] = useState();
  const [msg, setmsg] = useState();
  const [render, setrender] = useState(false);
  const [asc, setasc] = useState(false);
  const [change, setchange] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setmsg("Product Fetched");
      })
      .catch((err) => {
        console.log(err);
        setmsg("Something Went Wrong in Fetching the Product");
      });
  }, []);

  // const sortData = (sort, products) => {
  //   // setrender(true);
  //   setmsg("sorting is done on price");
  //   products.product.sort((a, b) => {
  //     a = Number(a.price);
  //     b = Number(b.price);
  //     if (sort === "asec") {
  //       return a - b;
  //     } else {
  //       return b - a;
  //     }
  //   });
  //   setProducts(products);
  //   console.log(products);
  //   setrender(true);
  // };
  const asec = () => {
    if (products) {
      if (change) {
        products.product.sort((A, B) => {
          A = Number(A.price);
          B = Number(B.price);
          return A - B;
        });
        setProducts(products);
        console.log(products);
        setasc(true);
        setchange(false);
      } else {
        products.product.sort((A, B) => {
          A = Number(A.price);
          B = Number(B.price);
          return B - A;
        });
        setProducts(products);
        console.log(products);
        setasc(true);
        setchange(true);
      }
    }
  };

  const submit = (bool) => {
    console.log(bool);
    if (bool === true) {
      axios
        .get("http://localhost:5000/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setmsg("Product Fetched");
        })
        .catch((err) => {
          console.log(err);
          setmsg("Something Went Wrong in Fetching the Product");
        });
    }
  };

  return (
    <div className="container-fluid">
      {products && <Products msg={msg} products={products} />}
      {/* Click one time to sort in asec and again click to sort in dsec */}
      <button className="btn btn-outline-danger right" onClick={() => asec()}>
        Sort
      </button>

      <CreateProduct submit={submit} />
    </div>
  );
}

export default App;
