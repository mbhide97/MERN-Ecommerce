// import "./Categories.css";

// function Categories() {
//   const categories = [
//     {
//       id: 1,
//       name: "Men",
//       image: "/categories/men.jpg",
//     },
//     {
//       id: 2,
//       name: "Women",
//       image: "/categories/women.jpg",
//     },
//     {
//       id: 3,
//       name: "Shoes",
//       image: "/categories/sneakers.jpg",
//     },
//     {
//       id: 4,
//       name: "Electronics",
//       image: "/categories/electronics.jpg",
//     },
//   ];

//   return (
//     <section className="categories">

//       <div className="container">

//         <h2 className="section-title">
//           Shop By Category
//         </h2>

//         <div className="category-grid">

//           {categories.map((item) => (
//             <div
//               key={item.id}
//               className="category-card"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//               />

//               <div className="category-overlay">
//                 <h3>{item.name}</h3>

//                 <button>
//                   Explore
//                 </button>
//               </div>

//             </div>
//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }

// export default Categories
import { useNavigate } from "react-router-dom";

import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Clothing",
      image: "/categories/men.jpg",
      filter: "Clothing",
    },
    {
      id: 2,
      name: "Footwear",
      image: "/categories/sneakers.jpg",
      filter: "Footwear",
    },
    {
      id: 3,
      name: "Bags",
      image: "/categories/women.jpg",
      filter: "Bags",
    },
    {
      id: 4,
      name: "Accessories",
      image: "/categories/electronics.jpg",
      filter: "Accessories",
    },
  ];

  const handleCategory = (category) => {
    navigate("/products", {
      state: {
        category,
      },
    });
  };

  return (
    <section className="categories">

      <div className="container">

        <h2 className="section-title">
          Shop By Category
        </h2>

        <div className="category-grid">

          {categories.map((item) => (
            <div
              key={item.id}
              className="category-card"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="category-overlay">

                <h3>
                  {item.name}
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    handleCategory(item.filter)
                  }
                >
                  Explore
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;

