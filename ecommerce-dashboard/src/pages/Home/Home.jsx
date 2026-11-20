// import Carousel from "react-bootstrap/Carousel";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";
// import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
// import Categories from "../../components/Categories/Categories";
// import FlashSale from "../../components/FlashSale/FlashSale";
// import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
// import Testimonials from "../../components/Testimonials/Testimonials";
// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="hero-wrapper">

//       <Carousel fade interval={3000} controls={false} indicators={false}>

//         {/* SLIDE 1 */}
//         <Carousel.Item>
//           <video autoPlay muted loop playsInline className="hero-video">
//             <source src="/videos/coverVideo.mp4" type="video/mp4" />
//           </video>

//           <div className="hero-overlay">
//             <h1>FASHION COLLECTION 2026</h1>
//             <p>Discover Premium Styles & Trends</p>

//             <div className="hero-buttons">
//               <button onClick={() => navigate("/products")}>
//                 Shop Now
//               </button>

//               <button onClick={() => navigate("/login")}>
//                 Sign In
//               </button>
//             </div>
//           </div>
//         </Carousel.Item>

//         {/* SLIDE 2 */}
//         <Carousel.Item>
//           <video autoPlay muted loop playsInline className="hero-video">
//             <source src="/videos/covervideo2.mp4" type="video/mp4" />
//           </video>

//           <div className="hero-overlay">
//             <h1>ELECTRONICS MEGA SALE</h1>
//             <p>Upgrade Your Lifestyle</p>

//             <div className="hero-buttons">
//               <button onClick={() => navigate("/products")}>
//                 Explore
//               </button>

//               <button onClick={() => navigate("/login")}>
//                 Sign In
//               </button>
//             </div>
//           </div>
//         </Carousel.Item>

//         {/* SLIDE 3 */}
//         <Carousel.Item>
//           <video autoPlay muted loop playsInline className="hero-video">
//             <source src="/videos/covervideo3.mp4" type="video/mp4" />
//           </video>

//           <div className="hero-overlay">
//             <h1>PREMIUM SHOES</h1>
//             <p>Comfort Meets Style</p>

//             <div className="hero-buttons">
//               <button onClick={() => navigate("/products")}>
//                 View Collection
//               </button>

//               <button onClick={() => navigate("/login")}>
//                 Sign In
//               </button>
//             </div>
//           </div>
//         </Carousel.Item>

//       </Carousel>

//        {/* Categories */}
//       <Categories />

//       {/* FeaturedProducts */}
//       <FeaturedProducts />

//      {/*FlashSale  */}
//      <FlashSale />

//      {/* NewArrivals  */}
//      {/* <NewArrivals />  */}

//      {/* WhyChooseUs  */}
//      <WhyChooseUs />

//      {/* Testimonials  */}
//      <Testimonials />
//     </div>
//   );
// }

// export default  Home 


import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";

import "./Home.css";

import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Categories from "../../components/Categories/Categories";
import FlashSale from "../../components/FlashSale/FlashSale";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Testimonials from "../../components/Testimonials/Testimonials";

function Home() {
  const navigate = useNavigate();

  // =========================
  // HERO SLIDES DATA
  // =========================

  const heroSlides = [
    {
      id: 1,
      video: "/videos/coverVideo.mp4",
      title: "FASHION COLLECTION 2026",
      description: "Discover Premium Styles & Trends",
      primaryButton: "Shop Now",
      primaryPath: "/products",
      secondaryButton: "Sign In",
      secondaryPath: "/login",
    },

    {
      id: 2,
      video: "/videos/covervideo2.mp4",
      title: "ELECTRONICS MEGA SALE",
      description: "Upgrade Your Lifestyle",
      primaryButton: "Explore",
      primaryPath: "/products",
      secondaryButton: "Sign In",
      secondaryPath: "/login",
    },

    {
      id: 3,
      video: "/videos/covervideo3.mp4",
      title: "PREMIUM SHOES",
      description: "Comfort Meets Style",
      primaryButton: "View Collection",
      primaryPath: "/products",
      secondaryButton: "Sign In",
      secondaryPath: "/login",
    },
  ];

  return (
    <div className="hero-wrapper">

      {/* =========================
          HERO CAROUSEL
      ========================= */}

      <Carousel
        fade
        interval={3000}
        controls={false}
        indicators={false}
      >

        {heroSlides.map((slide) => (
          <Carousel.Item key={slide.id}>

            {/* HERO VIDEO */}

            <video
              autoPlay
              muted
              loop
              playsInline
              className="hero-video"
            >
              <source
                src={slide.video}
                type="video/mp4"
              />
            </video>


            {/* HERO CONTENT */}

            <div className="hero-overlay">

              <h1>
                {slide.title}
              </h1>

              <p>
                {slide.description}
              </p>


              {/* HERO BUTTONS */}

              <div className="hero-buttons">

                <button
                  onClick={() =>
                    navigate(slide.primaryPath)
                  }
                >
                  {slide.primaryButton}
                </button>


                <button
                  onClick={() =>
                    navigate(slide.secondaryPath)
                  }
                >
                  {slide.secondaryButton}
                </button>

              </div>

            </div>

          </Carousel.Item>
        ))}

      </Carousel>


      {/* =========================
          CATEGORIES
      ========================= */}

      <Categories />


      {/* =========================
          FEATURED PRODUCTS
      ========================= */}

      <FeaturedProducts />


      {/* =========================
          FLASH SALE
      ========================= */}

      <FlashSale />


      {/* =========================
          NEW ARRIVALS
      ========================= */}

      {/* 
      <NewArrivals />
      */}


      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <WhyChooseUs />


      {/* =========================
          TESTIMONIALS
      ========================= */}

      <Testimonials />

    </div>
  );
}

export default Home;
