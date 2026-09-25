// import "./FlashSale.css";

// function FlashSale() {

//   const saleProducts = [
//     {
//       id: 1,
//       name: "Shoes",
//       image: "/products/shoes sale4.jpg",
//       price: 2499,
//       oldPrice: 4999,
//       discount: "50% OFF",
//     },
//     {
//       id: 2,
//       name: "Women dress",
//       image: "/products/dress sale3.jpg",
//       price: 3999,
//       oldPrice: 6999,
//       discount: "40% OFF",
//     },
//     {
//       id: 3,
//       name: "Watch",
//       image: "/products/watch sale2.jpg",
//       price: 2999,
//       oldPrice: 4999,
//       discount: "40% OFF",
//     },
//     {
//       id: 4,
//       name: "Men Shirt",
//       image: "/products/tshirt sale1.jpg",
//       price: 1999,
//       oldPrice: 3999,
//       discount: "50% OFF",
//     },
//   ];

//   return (
//     <section className="flash-sale">

//       <div className="sale-header">
//         <h2>🔥 Flash Sale</h2>

//         <div className="countdown">
//           <span>02</span> :
//           <span>14</span> :
//           <span>35</span> :
//           <span>18</span>
//         </div>
//       </div>

//       <div className="sale-grid">

//         {saleProducts.map((item) => (

//           <div className="sale-card" key={item.id}>

//             <span className="sale-badge">
//               {item.discount}
//             </span>

//             <img
//               src={item.image}
//               alt={item.name}
//             />

//             <h3>{item.name}</h3>

//             <div className="price">

//               <span className="new-price">
//                 ₹{item.price}
//               </span>

//               <span className="old-price">
//                 ₹{item.oldPrice}
//               </span>

//             </div>

//             <button>
//               Shop Now
//             </button>

//           </div>

//         ))}

//       </div>

//     </section>
//   );
// }

// export default FlashSh
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";

import "./FlashSale.css";

function FlashSale() {
  const navigate = useNavigate();

  const [saleProducts, setSaleProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // Flash Sale Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 18,
  });

  // Fetch Products
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const response =
          await API.get("/products");

        const productData =
          Array.isArray(response.data)
            ? response.data
            : response.data.products || [];

        const products =
          productData
            .filter(
              (item) =>
                Number(item.price) > 0
            )
            .slice(0, 4)
            .map((item) => {
              const price =
                Number(item.price) || 0;

              const oldPrice =
                Math.round(price * 1.5);

              const discount =
                Math.round(
                  ((oldPrice - price) /
                    oldPrice) *
                    100
                );

              return {
                id:
                  item._id ||
                  item.id,

                name:
                  item.name ||
                  "Product",

                image:
                  item.image ||
                  "",

                price,

                oldPrice,

                discount:
                  `${discount}% OFF`,
              };
            });

        setSaleProducts(products);
      } catch (error) {
        console.error(
          "Flash Sale Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  // Countdown
  useEffect(() => {
    const timer =
      setInterval(() => {
        setTimeLeft((previous) => {
          let {
            days,
            hours,
            minutes,
            seconds,
          } = previous;

          if (seconds > 0) {
            seconds -= 1;
          } else {
            seconds = 59;

            if (minutes > 0) {
              minutes -= 1;
            } else {
              minutes = 59;

              if (hours > 0) {
                hours -= 1;
              } else {
                hours = 23;

                if (days > 0) {
                  days -= 1;
                } else {
                  days = 0;
                  hours = 0;
                  minutes = 0;
                  seconds = 0;
                }
              }
            }
          }

          return {
            days,
            hours,
            minutes,
            seconds,
          };
        });
      }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleShopNow = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return (
      <section className="flash-sale">

        <div className="sale-header">
          <h2>
            🔥 Flash Sale
          </h2>
        </div>

        <h3 className="sale-loading">
          Loading Sale Products...
        </h3>

      </section>
    );
  }

  return (
    <section className="flash-sale">

      <div className="sale-header">

        <h2>
          🔥 Flash Sale
        </h2>

        <div className="countdown">

          <span>
            {String(timeLeft.days).padStart(
              2,
              "0"
            )}
          </span>

          :

          <span>
            {String(timeLeft.hours).padStart(
              2,
              "0"
            )}
          </span>

          :

          <span>
            {String(timeLeft.minutes).padStart(
              2,
              "0"
            )}
          </span>

          :

          <span>
            {String(timeLeft.seconds).padStart(
              2,
              "0"
            )}
          </span>

        </div>

      </div>


      <div className="sale-grid">

        {saleProducts.map((item) => (

          <div
            className="sale-card"
            key={item.id}
          >

            <span className="sale-badge">
              {item.discount}
            </span>


            <div className="sale-image">

              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.style.display =
                    "none";
                }}
              />

            </div>


            <h3>
              {item.name}
            </h3>


            <div className="price">

              <span className="new-price">
                ₹{item.price}
              </span>

              <span className="old-price">
                ₹{item.oldPrice}
              </span>

            </div>


            <button
              type="button"
              onClick={() =>
                handleShopNow(item.id)
              }
            >
              Shop Now
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FlashSale;

