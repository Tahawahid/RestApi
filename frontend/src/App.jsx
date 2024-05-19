import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductManagement from "./components/ProductManagement";

const App = () => {
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-5">
            <ProductManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
