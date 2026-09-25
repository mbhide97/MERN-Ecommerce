// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../context/CartContext";
// import products from "../../data/products";
// import { WishlistContext } from "../../context/WishlistContext";
// import {FaShoppingCart,FaHeart,FaStar,} from "react-icons/fa";
// import "./Products.css";

// function Products() {
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);
//   const {wishlist,addToWishlist,removeFromWishlist,} = useContext(WishlistContext);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [sort, setSort] = useState("default");
//   const [maxPrice, setMaxPrice] = useState(10000);

//   const filteredProducts = products
//     .filter((item) => {
//       const matchSearch = item.name
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const matchCategory =
//         category === "All" ||
//         item.category === category;

//       const matchPrice =
//         item.price <= maxPrice;

//       return (
//         matchSearch &&
//         matchCategory &&
//         matchPrice
//       );
//     })
//     .sort((a, b) => {
//       if (sort === "low") {
//         return a.price - b.price;
//       }

//       if (sort === "high") {
//         return b.price - a.price;
//       }

//       if (sort === "rating") {
//         return b.rating - a.rating;
//       }

//       return 0;
//     });

//   return (
//     <div className="products-page">
//       <h2>🛍 Our Products</h2>

//       <div className="top-bar">
//         <input
//           type="text"
//           placeholder="Search Products..."
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//         />

//         <select
//           value={category}
//           onChange={(e) =>
//             setCategory(e.target.value)
//           }
//         >
//           <option value="All">All Categories</option>
//           <option value="Fashion">
//             Fashion
//           </option>
//           <option value="Women">
//             Women
//           </option>
//           <option value="Shoes">
//             Shoes
//           </option>
//           <option value="Electronics">
//             Electronics
//           </option>
//         </select>

//         <select
//           value={sort}
//           onChange={(e) =>
//             setSort(e.target.value)
//           }
//         >
//           <option value="default">
//             Sort By
//           </option>
//           <option value="low">
//             Price Low → High
//           </option>
//           <option value="high">
//             Price High → Low
//           </option>
//           <option value="rating">
//             Highest Rating
//           </option>
//         </select>
//       </div>

//       <div className="price-filter">
//         <label>
//           Max Price : ₹{maxPrice}
//         </label>

//         <input
//           type="range"
//           min="1000"
//           max="10000"
//           step="500"
//           value={maxPrice}
//           onChange={(e) =>
//             setMaxPrice(
//               Number(e.target.value)
//             )
//           }
//         />
//       </div>

//       <div className="product-grid">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((item) => (
//             <div
//               className="product-card"
//               key={item.id}
//               onClick={() =>
//                 navigate(
//                   `/product/${item.id}`
//                 )
//               }
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//               />

//               <div className="product-info">
//                 <span className="category">
//                   {item.category}
//                 </span>

//                 <h3>{item.name}</h3>

//                 <div className="rating">
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />

//                   <span>
//                     ({item.rating})
//                   </span>
//                 </div>

//                 <div className="price-box">
//                   <span className="new-price">
//                     ₹{item.price}
//                   </span>

//                   <span className="old-price">
//                     ₹{item.oldPrice}
//                   </span>
//                 </div>

//                 <div className="buttons">
//                  <button
//   className="wish-btn"
//   onClick={(e) => {
//     e.stopPropagation();

//     const exist = wishlist.find(
//       (p) => p.id === item.id
//     );

//     if (exist) {
//       removeFromWishlist(item.id);
//     } else {
//       addToWishlist(item);
//     }
//   }}
// >
//   <FaHeart
//     color={
//       wishlist.find((p) => p.id === item.id)
//         ? "red"
//         : ""
//     }
//   />
// </button>

//                   <button
//                     className="cart-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart(item);
//                     }}
//                   >
//                     <FaShoppingCart />
//                     Add To Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <h3
//             style={{
//               textAlign: "center",
//               gridColumn: "1/-1",
//             }}
//           >
//             No Products Found 😔
//           </h3>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Products;









//  import { useEffect, useState } from "react";
// import API from "../../services/api";

// function Products() {

//   const [products, setProducts] = useState([]);

//   useEffect(() => {

//     API.get("/products")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//   }, []);

//   return (
//     <div>

//       <h1>All Products</h1>

//       {
//         products.map((item) => (
//           <div key={item.id}>
//             <h3>{item.title}</h3>
//             <img
//               src={item.image}
//               alt={item.title}
//               width="150"
//             />
//             <h4>₹ {item.price}</h4>
//             <hr />
//           </div>
//         ))
//       }

//     </div>
//   );
// }

// export default Products;




// import { useEffect, useState } from "react";

// import API from "../../services/api";

// import ProductCard from "./ProductCard";
// import ProductFilter from "./ProductFilter";

// import "./Products.css";

// function Products() {
//   const [products, setProducts] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");

//   const [category, setCategory] = useState("All");

//   const [sort, setSort] = useState("default");

//   const [maxPrice, setMaxPrice] = useState(100000);

//   // Fetch Products from MongoDB Backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await API.get("/products");

//         console.log("Products API Response:", response.data);

//         // Backend response handle
//         const productData = Array.isArray(response.data)
//           ? response.data
//           : response.data.products || [];

//         const data = productData.map((item) => ({
//           id: item._id || item.id,

//           name: item.name || item.title || "Product",

//           image: item.image || item.imageUrl || "",

//           price: Number(item.price) || 0,

//           oldPrice:
//             Number(item.oldPrice) ||
//             Number(item.price) ||
//             0,

//           category: item.category || "Other",

//           rating:
//             Number(item.rating) ||
//             Number(item.rating?.rate) ||
//             0,
//         }));

//         setProducts(data);
//       } catch (err) {
//         console.error("Products Fetch Error:", err);

//         setError(
//           err.response?.data?.message ||
//             "Failed to load products."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Filter + Search + Sort
//   const filteredProducts = products
//     .filter((item) => {
//       const matchSearch = item.name
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const matchCategory =
//         category === "All" ||
//         item.category === category;

//       const matchPrice = item.price <= maxPrice;

//       return (
//         matchSearch &&
//         matchCategory &&
//         matchPrice
//       );
//     })
//     .sort((a, b) => {
//       if (sort === "low") {
//         return a.price - b.price;
//       }

//       if (sort === "high") {
//         return b.price - a.price;
//       }

//       if (sort === "rating") {
//         return b.rating - a.rating;
//       }

//       return 0;
//     });

//   // Loading
//   if (loading) {
//     return (
//       <h2 className="loading">
//         Loading Products...
//       </h2>
//     );
//   }

//   // Error
//   if (error) {
//     return (
//       <h2 className="loading">
//         {error}
//       </h2>
//     );
//   }

//   return (
//     <section className="products-page">
//       <h2 className="page-title">
//         Our Products
//       </h2>

//       <ProductFilter
//         search={search}
//         setSearch={setSearch}
//         category={category}
//         setCategory={setCategory}
//         sort={sort}
//         setSort={setSort}
//         maxPrice={maxPrice}
//         setMaxPrice={setMaxPrice}
//       />

//       <div className="product-grid">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((item) => (
//             <ProductCard
//               key={item.id}
//               item={item}
//             />
//           ))
//         ) : (
//           <h2 className="no-product">
//             No Products Found 😔
//           </h2>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Products;



import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import API from "../../services/api";

import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

import "./Products.css";

function Products() {
  const location = useLocation();

  // =========================
  // CATEGORY FROM HOME PAGE
  // =========================

  const selectedCategory =
    location.state?.category || "All";


  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState(selectedCategory);

  const [sort, setSort] =
    useState("default");

  const [maxPrice, setMaxPrice] =
    useState(100000);


  // =========================
  // UPDATE CATEGORY
  // WHEN COMING FROM HOME
  // =========================

  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);


  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        setError("");

        const response =
          await API.get("/products");

        console.log(
          "Products API Response:",
          response.data
        );


        // Backend response handle

        const productData =
          Array.isArray(response.data)
            ? response.data
            : response.data.products || [];


        // Format products

        const data =
          productData.map((item) => ({
            id:
              item._id ||
              item.id,

            name:
              item.name ||
              item.title ||
              "Product",

            image:
              item.image ||
              item.imageUrl ||
              "",

            price:
              Number(item.price) ||
              0,

            oldPrice:
              Number(item.oldPrice) ||
              Number(item.price) ||
              0,

            category:
              item.category ||
              "Other",

            rating:
              Number(item.rating) ||
              Number(
                item.rating?.rate
              ) ||
              0,
          }));


        setProducts(data);

      } catch (err) {

        console.error(
          "Products Fetch Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load products."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);


  // =========================
  // FILTER + SEARCH + SORT
  // =========================

  const filteredProducts =
    products
      .filter((item) => {

        // Search

        const matchSearch =
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );


        // Category

        const matchCategory =
          category === "All" ||
          item.category === category;


        // Price

        const matchPrice =
          item.price <= maxPrice;


        return (
          matchSearch &&
          matchCategory &&
          matchPrice
        );

      })

      .sort((a, b) => {

        // Low → High

        if (sort === "low") {
          return a.price - b.price;
        }


        // High → Low

        if (sort === "high") {
          return b.price - a.price;
        }


        // Rating

        if (sort === "rating") {
          return b.rating - a.rating;
        }


        return 0;

      });


  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <h2 className="loading">
        Loading Products...
      </h2>
    );
  }


  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <h2 className="loading">
        {error}
      </h2>
    );
  }


  // =========================
  // UI
  // =========================

  return (
    <section className="products-page">

      <h2 className="page-title">
        {category === "All"
          ? "Our Products"
          : `${category} Products`}
      </h2>


      {/* FILTER */}

      <ProductFilter
        search={search}
        setSearch={setSearch}

        category={category}
        setCategory={setCategory}

        sort={sort}
        setSort={setSort}

        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />


      {/* PRODUCTS */}

      <div className="product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))

        ) : (

          <h2 className="no-product">
            No Products Found 😔
          </h2>

        )}

      </div>

    </section>
  );
}

export default Products;
 
