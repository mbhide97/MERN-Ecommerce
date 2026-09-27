 

// import { useEffect, useState } from "react";
// import {
//   useLocation,
//   useSearchParams,
// } from "react-router-dom";

// import API from "../../services/api";

// import ProductCard from "./ProductCard";
// import ProductFilter from "./ProductFilter";

// import "./Products.css";

// function Products() {
//   const location = useLocation();

//   const [searchParams, setSearchParams] =
//     useSearchParams();

//   // =========================
//   // CATEGORY FROM HOME PAGE
//   // =========================

//   const selectedCategory =
//     location.state?.category || "All";

//   // =========================
//   // STATES
//   // =========================

//   const [products, setProducts] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   const [search, setSearch] =
//     useState(
//       searchParams.get("search") || ""
//     );

//   const [category, setCategory] =
//     useState(selectedCategory);

//   const [sort, setSort] =
//     useState("default");

//   const [maxPrice, setMaxPrice] =
//     useState(100000);

//   // =========================
//   // NAVBAR SEARCH
//   // =========================

//   useEffect(() => {
//     const searchValue =
//       searchParams.get("search") || "";

//     setSearch(searchValue);
//   }, [searchParams]);

//   // =========================
//   // UPDATE URL WHEN SEARCH
//   // =========================

//   useEffect(() => {
//     if (search.trim()) {
//       setSearchParams({
//         search: search.trim(),
//       });
//     } else {
//       setSearchParams({});
//     }
//   }, [search]);

//   // =========================
//   // UPDATE CATEGORY
//   // WHEN COMING FROM HOME
//   // =========================

//   useEffect(() => {
//     if (location.state?.category) {
//       setCategory(
//         location.state.category
//       );
//     }
//   }, [location.state]);

//   // =========================
//   // FETCH PRODUCTS
//   // =========================

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         setError("");

//         const response =
//           await API.get("/products");

//         console.log(
//           "Products API Response:",
//           response.data
//         );

//         const productData =
//           Array.isArray(response.data)
//             ? response.data
//             : response.data.products || [];

//         const data =
//           productData.map((item) => ({
//             id:
//               item._id ||
//               item.id,

//             name:
//               item.name ||
//               item.title ||
//               "Product",

//             image:
//               item.image ||
//               item.imageUrl ||
//               "",

//             price:
//               Number(item.price) ||
//               0,

//             oldPrice:
//               Number(item.oldPrice) ||
//               Number(item.price) ||
//               0,

//             category:
//               item.category ||
//               "Other",

//             rating:
//               Number(item.rating) ||
//               Number(
//                 item.rating?.rate
//               ) ||
//               0,
//           }));

//         setProducts(data);

//       } catch (err) {
//         console.error(
//           "Products Fetch Error:",
//           err
//         );

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

//   // =========================
//   // FILTER + SEARCH + SORT
//   // =========================

//   const filteredProducts =
//     products
//       .filter((item) => {

//         const matchSearch =
//           item.name
//             .toLowerCase()
//             .includes(
//               search.toLowerCase()
//             );

//         const matchCategory =
//           category === "All" ||
//           item.category === category;

//         const matchPrice =
//           item.price <= maxPrice;

//         return (
//           matchSearch &&
//           matchCategory &&
//           matchPrice
//         );
//       })

//       .sort((a, b) => {

//         if (sort === "low") {
//           return a.price - b.price;
//         }

//         if (sort === "high") {
//           return b.price - a.price;
//         }

//         if (sort === "rating") {
//           return b.rating - a.rating;
//         }

//         return 0;
//       });

//   // =========================
//   // LOADING
//   // =========================

//   if (loading) {
//     return (
//       <h2 className="loading">
//         Loading Products...
//       </h2>
//     );
//   }

//   // =========================
//   // ERROR
//   // =========================

//   if (error) {
//     return (
//       <h2 className="loading">
//         {error}
//       </h2>
//     );
//   }

//   // =========================
//   // UI
//   // =========================

//   return (
//     <section className="products-page">

//       <h2 className="page-title">
//         {category === "All"
//           ? "Our Products"
//           : `${category} Products`}
//       </h2>

//       {/* FILTER */}

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

//       {/* PRODUCTS */}

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
import {
  useLocation,
  useSearchParams,
} from "react-router-dom";

import API from "../../services/api";

import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

import "./Products.css";

function Products() {
  const location = useLocation();

  const [searchParams, setSearchParams] =
    useSearchParams();

  // =========================
  // CATEGORY FROM HOME PAGE
  // =========================

  const selectedCategory =
    location.state?.category || "All";

  // =========================
  // STATES
  // =========================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState(
      searchParams.get("search") || ""
    );

  const [category, setCategory] =
    useState(selectedCategory);

  const [sort, setSort] =
    useState("default");

  // =========================
  // MAX PRICE
  // =========================

  const [maxPrice, setMaxPrice] =
    useState(5000);

  // =========================
  // NAVBAR SEARCH
  // =========================

  useEffect(() => {
    const searchValue =
      searchParams.get("search") || "";

    setSearch(searchValue);
  }, [searchParams]);

  // =========================
  // UPDATE URL WHEN SEARCH
  // =========================

  useEffect(() => {
    if (search.trim()) {
      setSearchParams({
        search: search.trim(),
      });
    } else {
      setSearchParams({});
    }
  }, [search, setSearchParams]);

  // =========================
  // UPDATE CATEGORY
  // WHEN COMING FROM HOME
  // =========================

  useEffect(() => {
    if (location.state?.category) {
      setCategory(
        location.state.category
      );
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

        const productData =
          Array.isArray(response.data)
            ? response.data
            : response.data?.products || [];

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
              Number(item.price) || 0,

            oldPrice:
              Number(item.oldPrice) ||
              Number(item.price) ||
              0,

            category:
              item.category ||
              "Other",

            rating:
              Number(item.rating) ||
              Number(item.rating?.rate) ||
              0,

            stock:
              Number(item.stock) || 0,
          }));

        console.log(
          "Formatted Products:",
          data
        );

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

        // SEARCH FILTER
        const matchSearch =
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        // CATEGORY FILTER
        const matchCategory =
          category === "All" ||
          item.category === category;

        // PRICE FILTER
        const productPrice =
          Number(item.price);

        const selectedMaxPrice =
          Number(maxPrice);

        const matchPrice =
          productPrice <= selectedMaxPrice;

        return (
          matchSearch &&
          matchCategory &&
          matchPrice
        );
      })

      // =========================
      // SORT
      // =========================

      .sort((a, b) => {

        if (sort === "low") {
          return (
            Number(a.price) -
            Number(b.price)
          );
        }

        if (sort === "high") {
          return (
            Number(b.price) -
            Number(a.price)
          );
        }

        if (sort === "rating") {
          return (
            Number(b.rating) -
            Number(a.rating)
          );
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

      {/* PAGE TITLE */}

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
