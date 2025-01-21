import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState<{ name: string; price: number }[]>([]);

  useEffect(() => {
    fetch("https://localhost:5227/api/products")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <div>
      <h1 style={{ color: "red" }}>E-Commerce</h1>
      <ul>
        {product.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
