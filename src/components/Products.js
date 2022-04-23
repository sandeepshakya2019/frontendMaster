import React from "react";

function Products({ msg, products }) {
  return (
    <div className="container-fluid">
      <h1>{msg && msg}</h1>
      {products && console.log(products.product)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Subcategory</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.product.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.SubCategory.category.name}</td>
                  <td>{item.SubCategory.subcateg}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
