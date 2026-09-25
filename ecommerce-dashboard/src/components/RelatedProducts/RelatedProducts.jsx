import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import "./RelatedProducts.css";

function RelatedProducts({ category, currentId }) {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    API.get("/products")

      .then((res) => {

        const data = res.data.filter((item) =>

          item.category === category &&
          item.id !== currentId

        );

        setProducts(data);

      })

      .catch((err) => console.log(err));

  }, [category, currentId]);

  return (

    <section className="related-products">

      <h2>You May Also Like</h2>

      <div className="related-grid">

        {products.slice(0,4).map((item)=>(

          <div
            className="related-card"
            key={item.id}
            onClick={() =>
              navigate(`/product/${item.id}`)
            }
          >

            <img
              src={item.image}
              alt={item.title}
            />

            <h3>{item.title}</h3>

            <p>₹ {Math.round(item.price*85)}</p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default RelatedProducts;