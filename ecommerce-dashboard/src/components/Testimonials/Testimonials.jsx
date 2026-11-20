// import "./Testimonials.css";
// import { FaStar } from "react-icons/fa";

// function Testimonials() {
//   const reviews = [
//     {
//       id: 1,
//       name: "Rahul Sharma",
//       image: "/users/user1.jpg",
//       review:
//         "Excellent quality products and super fast delivery. I will definitely shop again.",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "Priya Patil",
//       image: "/users/user2.jpg",
//       review:
//         "Amazing shopping experience. Product quality is exactly as shown in the pictures.",
//       rating: 5,
//     },
//     {
//       id: 3,
//       name: "Amit Joshi",
//       image: "/users/user3.jpg",
//       review:
//         "Customer support is very helpful and delivery was on time. Highly recommended.",
//       rating: 5,
//     },
//   ];

//   return (
//     <section className="testimonial-section">

//       <div className="section-title">
//         <span>OUR CUSTOMERS</span>
//         <h2>What Our Customers Say</h2>
//         <p>Thousands of happy customers trust our store.</p>
//       </div>

//       <div className="testimonial-grid">

//         {reviews.map((item) => (
//           <div className="testimonial-card" key={item.id}>

//             <img src={item.image} alt={item.name} />

//             <div className="stars">
//               {[...Array(item.rating)].map((_, index) => (
//                 <FaStar key={index} />
//               ))}
//             </div>

//             <p>"{item.review}"</p>

//             <h4>{item.name}</h4>

//           </div>
//         ))}

//       </div>

//     </section>
//   );
// }

// export default Testimonials;

import "./Testimonials.css";

import {
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      image: "/users/user1.jpg",
      review:
        "Excellent quality products and super fast delivery. I will definitely shop again.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Patil",
      image: "/users/user2.jpg",
      review:
        "Amazing shopping experience. Product quality is exactly as shown in the pictures.",
      rating: 5,
    },
    {
      id: 3,
      name: "Amit Joshi",
      image: "/users/user3.jpg",
      review:
        "Customer support is very helpful and delivery was on time. Highly recommended.",
      rating: 5,
    },
  ];

  return (
    <section className="testimonial-section">

      <div className="testimonial-container">

        {/* Section Header */}

        <div className="testimonial-header">

          <span>
            OUR CUSTOMERS
          </span>

          <h2>
            What Our Customers Say
          </h2>

          <p>
            Thousands of happy customers
            trust ShopSphere.
          </p>

        </div>


        {/* Reviews */}

        <div className="testimonial-grid">

          {reviews.map((item) => (

            <div
              className="testimonial-card"
              key={item.id}
            >

              <div className="quote-icon">
                <FaQuoteLeft />
              </div>


              <div className="customer-image">

                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.style.display =
                      "none";
                  }}
                />

              </div>


              <div className="stars">

                {[...Array(item.rating)].map(
                  (_, index) => (
                    <FaStar
                      key={index}
                    />
                  )
                )}

              </div>


              <p className="review-text">
                "{item.review}"
              </p>


              <h4>
                {item.name}
              </h4>

              <span className="verified">
                ✓ Verified Customer
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;

