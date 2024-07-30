import React from "react";
import Header from "./public/component/header.js";
import Footer from "./public/component/footer.js";
import Menu from "./public/component/menu.js";
import Products from "./public/component/products.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
