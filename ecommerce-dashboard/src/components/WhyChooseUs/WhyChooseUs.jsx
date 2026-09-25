// import "./WhyChooseUs.css";
// import {
//   FaShippingFast,
//   FaUndoAlt,
//   FaLock,
//   FaHeadset,
// } from "react-icons/fa";

// function WhyChooseUs() {
//   const features = [
//     {
//       id: 1,
//       icon: <FaShippingFast />,
//       title: "Free Shipping",
//       desc: "Free delivery on all orders above ₹999.",
//     },
//     {
//       id: 2,
//       icon: <FaUndoAlt />,
//       title: "Easy Returns",
//       desc: "7 days easy return and exchange policy.",
//     },
//     {
//       id: 3,
//       icon: <FaLock />,
//       title: "Secure Payment",
//       desc: "100% secure payment with trusted gateways.",
//     },
//     {
//       id: 4,
//       icon: <FaHeadset />,
//       title: "24/7 Support",
//       desc: "Our support team is available anytime.",
//     },
//   ];

//   return (
//     <section className="why-section">

//       <div className="section-title">
//         <span>WHY CHOOSE US</span>
//         <h2>Why Shop With Us?</h2>
//         <p>
//           We provide the best shopping experience with quality
//           products and trusted service.
//         </p>
//       </div>

//       <div className="why-grid">

//         {features.map((item) => (
//           <div className="why-card" key={item.id}>

//             <div className="why-icon">
//               {item.icon}
//             </div>

//             <h3>{item.title}</h3>

//             <p>{item.desc}</p>

//           </div>
//         ))}

//       </div>

//     </section>
//   );
// }

// export default WhyChooseUs;


import "./WhyChooseUs.css";

import {
  FaShippingFast,
  FaUndoAlt,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <FaShippingFast />,
      title: "Free Shipping",
      desc: "Free delivery on all orders above ₹999.",
    },
    {
      id: 2,
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      desc: "7 days easy return and exchange policy.",
    },
    {
      id: 3,
      icon: <FaLock />,
      title: "Secure Payment",
      desc: "100% secure payment with trusted gateways.",
    },
    {
      id: 4,
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Our support team is available anytime.",
    },
  ];

  return (
    <section className="why-section">

      <div className="why-container">

        {/* Section Header */}

        <div className="why-header">

          <span>
            WHY CHOOSE US
          </span>

          <h2>
            Why Shop With Us?
          </h2>

          <p>
            We provide the best shopping
            experience with quality products
            and trusted service.
          </p>

        </div>


        {/* Features */}

        <div className="why-grid">

          {features.map((item) => (

            <div
              className="why-card"
              key={item.id}
            >

              <div className="why-icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;
