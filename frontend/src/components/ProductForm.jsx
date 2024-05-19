import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ refreshTable }) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (action) => {
    try {
      switch (action) {
        case "add":
          const addResponse = await axios.post(
            "http://localhost:5000/api/products",
            product
          );
          console.log("Product added:", addResponse.data);
          break;
        case "update":
          const updateResponse = await axios.put(
            `http://localhost:5000/api/products/${product.id}`,
            product
          );
          console.log("Product updated:", updateResponse.data);
          break;
        case "delete":
          const deleteResponse = await axios.delete(
            `http://localhost:5000/api/products/${product.id}`
          );
          console.log("Product deleted:", deleteResponse.data);
          break;
        default:
          break;
      }
      setProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
      });
      refreshTable();
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to perform the operation. Please try again later.");
    }
  };

  return (
    <div>
      <form>
        <h2 className="text-center">Add/Update/Delete Product</h2>
        <div className="mb-3 mt-4">
          <input
            type="text"
            className="form-control"
            name="id"
            value={product.id}
            onChange={handleChange}
            placeholder="Enter Product ID (required for update/delete)"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter Product Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter Product Description"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter Product Price"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Enter Product Category"
          />
        </div>
        <div className="text-center">
          <button
            className="btn btn-success mx-2"
            style={{ width: "200px" }}
            onClick={() => handleSubmit("add")}
            type="button"
          >
            Add Product
          </button>
          <button
            className="btn btn-primary mx-2"
            style={{ width: "200px" }}
            onClick={() => handleSubmit("update")}
            type="button"
          >
            Update Product
          </button>
          <button
            className="btn btn-danger mx-2"
            style={{ width: "200px" }}
            onClick={() => handleSubmit("delete")}
            type="button"
          >
            Delete Product
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
