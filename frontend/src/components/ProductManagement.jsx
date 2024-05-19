import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (action) => {
    try {
      switch (action) {
        case "add":
          await axios.post("http://localhost:5000/api/products", product);
          console.log("Product added successfully.");
          break;
        case "update":
          await axios.put(
            `http://localhost:5000/api/products/${product.id}`,
            product
          );
          console.log("Product updated successfully.");
          break;
        case "delete":
          await axios.delete(
            `http://localhost:5000/api/products/${product.id}`
          );
          console.log("Product deleted successfully.");
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
      fetchProducts(); // Refresh product list after add/update/delete
    } catch (error) {
      console.error("Error performing operation:", error);
      setError("Failed to perform the operation. Please try again later.");
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h2 className="text-center">Product Management</h2>
      <form>
        <h3>Add/Update/Delete Product</h3>
        <div className="mb-3">
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
      </form>
      <h2 className="text-center mt-5">Product List</h2>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
