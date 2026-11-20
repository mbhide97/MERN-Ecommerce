// import "./Profile.css";

// import { useState } from "react";

// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaEdit,
//   FaSave,
// } from "react-icons/fa";

// function Profile() {

//   const [editMode, setEditMode] = useState(false);

//   const [user, setUser] = useState({

//     name: "Madhura Namjoshi",

//     email: "madhura@gmail.com",

//     phone: "9876543210",

//     address: "Pune, Maharashtra",

//     image:
//       "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

//   });

//   const handleChange = (e) => {

//     setUser({

//       ...user,

//       [e.target.name]: e.target.value,

//     });

//   };

//   const handleSave = () => {

//     setEditMode(false);

//     alert("Profile Updated Successfully ✅");

//   };

//   return (

//     <section className="profile-page">

//       <div className="profile-container">

//         {/* LEFT */}

//         <div className="profile-left">

//           <img
//             src={user.image}
//             alt={user.name}
//             className="profile-image"
//           />

//           <h2>{user.name}</h2>

//           <p>Premium Member</p>

//         </div>

//         {/* RIGHT */}

//         <div className="profile-right">

//           <div className="profile-header">

//             <h1>My Profile</h1>

//             {!editMode ? (

//               <button
//                 className="edit-btn"
//                 onClick={() => setEditMode(true)}
//               >

//                 <FaEdit />

//                 Edit

//               </button>

//             ) : (

//               <button
//                 className="save-btn"
//                 onClick={handleSave}
//               >

//                 <FaSave />

//                 Save

//               </button>

//             )}

//           </div>
//                     {/* Name */}

//           <div className="profile-field">

//             <label>

//               <FaUserCircle />

//               Full Name

//             </label>

//             <input
//               type="text"
//               name="name"
//               value={user.name}
//               onChange={handleChange}
//               disabled={!editMode}
//             />

//           </div>

//           {/* Email */}

//           <div className="profile-field">

//             <label>

//               <FaEnvelope />

//               Email

//             </label>

//             <input
//               type="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//               disabled={!editMode}
//             />

//           </div>

//           {/* Phone */}

//           <div className="profile-field">

//             <label>

//               <FaPhone />

//               Mobile Number

//             </label>

//             <input
//               type="text"
//               name="phone"
//               value={user.phone}
//               onChange={handleChange}
//               disabled={!editMode}
//             />

//           </div>

//           {/* Address */}

//           <div className="profile-field">

//             <label>

//               <FaMapMarkerAlt />

//               Address

//             </label>

//             <textarea
//               rows="4"
//               name="address"
//               value={user.address}
//               onChange={handleChange}
//               disabled={!editMode}
//             ></textarea>

//           </div>
//                     {/* ==========================
//                 PROFILE STATS
//           ========================== */}

//           <div className="profile-stats">

//             <div className="stat-card">

//               <h2>12</h2>

//               <p>Total Orders</p>

//             </div>

//             <div className="stat-card">

//               <h2>8</h2>

//               <p>Wishlist Items</p>

//             </div>

//             <div className="stat-card">

//               <h2>5</h2>

//               <p>Cart Items</p>

//             </div>

//             <div className="stat-card">

//               <h2>₹52,450</h2>

//               <p>Total Spending</p>

//             </div>

//           </div>

//           {/* ==========================
//                 MEMBERSHIP CARD
//           ========================== */}

//           <div className="membership-card">

//             <div>

//               <h2>🌟 Premium Member</h2>

//               <p>

//                 Enjoy Free Delivery, Early Access Deals
//                 & Exclusive Discounts.

//               </p>

//             </div>

//             <button className="upgrade-btn">

//               Active

//             </button>

//           </div>

//         </div>

//       </div>

//     </section>

//   );

// }

// export default Profile;

// import "./Profile.css";

// import { useState } from "react";

// import { useNavigate } from "react-router-dom";

// import {

//   FaUserCircle,

//   FaEnvelope,

//   FaPhone,

//   FaMapMarkerAlt,

//   FaEdit,

//   FaSave,

//   FaCamera,

//   FaShoppingBag,

//   FaHeart,

//   FaShoppingCart,

//   FaLock,

//   FaSignOutAlt,

//   FaCheckCircle,

//   FaCalendarAlt,

// } from "react-icons/fa";

// function Profile() {

//   const navigate = useNavigate();

//   const [editMode, setEditMode] = useState(false);

//   const [user, setUser] = useState({

//     name: "Madhura Namjoshi",

//     email: "madhura@gmail.com",

//     phone: "9876543210",

//     address: "Pune, Maharashtra",

//     joined: "20 July 2026",

//     status: "Verified",

//     image:
//       "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

//   });

//   const handleChange = (e) => {

//     setUser({

//       ...user,

//       [e.target.name]: e.target.value,

//     });

//   };

//   /* ==========================
//         PROFILE IMAGE
//   ========================== */

//   const handleImageChange = (e) => {

//     const file = e.target.files[0];

//     if (file) {

//       const imageUrl = URL.createObjectURL(file);

//       setUser({

//         ...user,

//         image: imageUrl,

//       });

//     }

//   };

//   /* ==========================
//           SAVE
//   ========================== */

//   const handleSave = () => {

//     setEditMode(false);

//     alert("Profile Updated Successfully ✅");

//   };

//   /* ==========================
//           LOGOUT
//   ========================== */

//   const handleLogout = () => {

//     localStorage.removeItem("token");

//     localStorage.removeItem("user");

//     navigate("/login");

//   };

//   return (

//     <section className="profile-page">

//       <div className="profile-container"></div>
//               {/* ==========================
//                 LEFT SIDE
//         ========================== */}

//         <div className="profile-left">

//           <div className="profile-image-box">

//             <img

//               src={user.image}

//               alt={user.name}

//               className="profile-image"

//             />

//             {editMode && (

//               <>

//                 <input

//                   type="file"

//                   id="profileImage"

//                   accept="image/*"

//                   hidden

//                   onChange={handleImageChange}

//                 />

//                 <label

//                   htmlFor="profileImage"

//                   className="camera-btn"

//                 >

//                   <FaCamera />

//                 </label>

//               </>

//             )}

//           </div>

//           <h2>{user.name}</h2>

//           <p className="member-tag">

//             👑 Premium Member

//           </p>

//           <div className="profile-info-box">

//             <p>

//               <FaCalendarAlt />

//               Joined

//             </p>

//             <span>{user.joined}</span>

//           </div>

//           <div className="profile-info-box verified">

//             <FaCheckCircle />

//             <span>{user.status}</span>

//           </div>

//         </div>

//         {/* ==========================
//                 RIGHT SIDE
//         ========================== */}

//         <div className="profile-right">

//           <div className="profile-header">

//             <h1>My Profile</h1>

//             {!editMode ? (

//               <button

//                 className="edit-btn"

//                 onClick={() => setEditMode(true)}

//               >

//                 <FaEdit />

//                 Edit Profile

//               </button>

//             ) : (

//               <button

//                 className="save-btn"

//                 onClick={handleSave}

//               >

//                 <FaSave />

//                 Save Changes

//               </button>

//             )}

//           </div>
//                     {/* ==========================
//                 PERSONAL DETAILS
//           ========================== */}

//           <div className="profile-field">

//             <label>

//               <FaUserCircle />

//               Full Name

//             </label>

//             <input

//               type="text"

//               name="name"

//               value={user.name}

//               onChange={handleChange}

//               disabled={!editMode}

//             />

//           </div>

//           <div className="profile-field">

//             <label>

//               <FaEnvelope />

//               Email Address

//             </label>

//             <input

//               type="email"

//               name="email"

//               value={user.email}

//               onChange={handleChange}

//               disabled={!editMode}

//             />

//           </div>

//           <div className="profile-field">

//             <label>

//               <FaPhone />

//               Mobile Number

//             </label>

//             <input

//               type="text"

//               name="phone"

//               value={user.phone}

//               onChange={handleChange}

//               disabled={!editMode}

//             />

//           </div>

//           <div className="profile-field">

//             <label>

//               <FaMapMarkerAlt />

//               Address

//             </label>

//             <textarea

//               rows="4"

//               name="address"

//               value={user.address}

//               onChange={handleChange}

//               disabled={!editMode}

//             ></textarea>

//           </div>

//           {/* ==========================
//                 PROFILE STATS
//           ========================== */}

//           <div className="profile-stats">

//             <div className="stat-card">

//               <FaShoppingBag className="stat-icon" />

//               <h2>12</h2>

//               <p>Total Orders</p>

//             </div>

//             <div className="stat-card">

//               <FaHeart className="stat-icon" />

//               <h2>8</h2>

//               <p>Wishlist</p>

//             </div>

//             <div className="stat-card">

//               <FaShoppingCart className="stat-icon" />

//               <h2>5</h2>

//               <p>Cart Items</p>

//             </div>

//             <div className="stat-card">

//               <h2>₹52,450</h2>

//               <p>Total Spending</p>

//             </div>

//           </div>
//                     {/* ==========================
//                 MEMBERSHIP CARD
//           ========================== */}

//           <div className="membership-card">

//             <div>

//               <h2>🌟 Premium Membership</h2>

//               <p>

//                 Enjoy Free Delivery, Early Access Deals,
//                 Exclusive Discounts and Priority Support.

//               </p>

//             </div>

//             <button className="upgrade-btn">

//               Active

//             </button>

//           </div>

//           {/* ==========================
//                 QUICK ACTIONS
//           ========================== */}

//           <div className="profile-actions">

//             <button
//               className="action-btn"
//               onClick={() => navigate("/orders")}
//             >
//               <FaShoppingBag />

//               My Orders

//             </button>

//             <button
//               className="action-btn"
//               onClick={() => navigate("/wishlist")}
//             >
//               <FaHeart />

//               Wishlist

//             </button>

//             <button
//               className="action-btn"
//               onClick={() => navigate("/cart")}
//             >
//               <FaShoppingCart />

//               My Cart

//             </button>

//             <button
//               className="action-btn"
//               onClick={() => navigate("/address")}
//             >
//               <FaMapMarkerAlt />

//               Saved Address

//             </button>

//             <button
//               className="action-btn"
//               onClick={() => navigate("/reset-password")}
//             >
//               <FaLock />

//               Change Password

//             </button>

//             <button
//               className="logout-btn"
//               onClick={handleLogout}
//             >
//               <FaSignOutAlt />

//               Logout

//             </button>

//           </div>

//           {/* ==========================
//                 RECENT ORDERS
//           ========================== */}

//           <div className="recent-orders">

//             <h2>Recent Orders</h2>

//             <div className="recent-order-card">

//               <img
//                 src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
//                 alt="product"
//               />

//               <div>

//                 <h3>Fjallraven Backpack</h3>

//                 <p>Delivered Successfully ✅</p>

//               </div>

//               <h4>₹9,999</h4>

//             </div>

//             <div className="recent-order-card">

//               <img
//                 src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
//                 alt="product"
//               />

//               <div>

//                 <h3>Mens Cotton Jacket</h3>

//                 <p>Out For Delivery 🚚</p>

//               </div>

//               <h4>₹5,499</h4>

//             </div>

//           </div>
//                     {/* ==========================
//                 WISHLIST PREVIEW
//           ========================== */}

//           <div className="wishlist-preview">

//             <h2>Wishlist Preview</h2>

//             <div className="wishlist-card">

//               <img
//                 src="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
//                 alt="wishlist"
//               />

//               <div>

//                 <h3>WD External Hard Drive</h3>

//                 <p>₹6,999</p>

//               </div>

//               <button
//                 className="move-cart-btn"
//                 onClick={() => navigate("/cart")}
//               >

//                 Move To Cart

//               </button>

//             </div>

//           </div>

//           {/* ==========================
//                 ACCOUNT SUMMARY
//           ========================== */}

//           <div className="account-summary">

//             <h2>Account Summary</h2>

//             <div className="summary-grid">

//               <div className="summary-item">

//                 <h3>12</h3>

//                 <p>Total Orders</p>

//               </div>

//               <div className="summary-item">

//                 <h3>₹52,450</h3>

//                 <p>Total Spending</p>

//               </div>

//               <div className="summary-item">

//                 <h3>8</h3>

//                 <p>Wishlist</p>

//               </div>

//               <div className="summary-item">

//                 <h3>★★★★★</h3>

//                 <p>Premium Member</p>

//               </div>

//             </div>

//           </div>

//         </div>

      

//     </section>

//   );

// }

// export default Profile;

import "./Profile.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaCamera,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaLock,
  FaSignOutAlt,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

function Profile() {

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({

    name: "Madhura Namjoshi",

    email: "madhura@gmail.com",

    phone: "9876543210",

    address: "Pune, Maharashtra",

    joined: "20 July 2026",

    status: "Verified",

    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

  });

  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]: e.target.value,

    });

  };

  /* ==========================
        PROFILE IMAGE
  ========================== */

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const imageUrl = URL.createObjectURL(file);

      setUser({

        ...user,

        image: imageUrl,

      });

    }

  };

  /* ==========================
          SAVE
  ========================== */

  const handleSave = () => {

    setEditMode(false);

    alert("Profile Updated Successfully ✅");

  };

  /* ==========================
          LOGOUT
  ========================== */

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <section className="profile-page">

      {/* ==========================
              MAIN CONTAINER
      ========================== */}

      <div className="profile-container">

        {/* ==========================
                LEFT SIDE
        ========================== */}

        <div className="profile-left">

          <div className="profile-image-box">

            <img
              src={user.image}
              alt={user.name}
              className="profile-image"
            />

            {editMode && (

              <>

                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />

                <label
                  htmlFor="profileImage"
                  className="camera-btn"
                >

                  <FaCamera />

                </label>

              </>

            )}

          </div>

          <h2>{user.name}</h2>

          <p className="member-tag">

            👑 Premium Member

          </p>

          <div className="profile-info-box">

            <p>

              <FaCalendarAlt />

              Joined

            </p>

            <span>{user.joined}</span>

          </div>

          <div className="profile-info-box verified">

            <FaCheckCircle />

            <span>{user.status}</span>

          </div>

        </div>


        {/* ==========================
                RIGHT SIDE
        ========================== */}

        <div className="profile-right">

          {/* ==========================
                  PROFILE HEADER
          ========================== */}

          <div className="profile-header">

            <h1>My Profile</h1>

            {!editMode ? (

              <button
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >

                <FaEdit />

                Edit Profile

              </button>

            ) : (

              <button
                className="save-btn"
                onClick={handleSave}
              >

                <FaSave />

                Save Changes

              </button>

            )}

          </div>


          {/* ==========================
                PERSONAL DETAILS
          ========================== */}

          <div className="profile-field">

            <label>

              <FaUserCircle />

              Full Name

            </label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editMode}
            />

          </div>


          <div className="profile-field">

            <label>

              <FaEnvelope />

              Email Address

            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editMode}
            />

          </div>


          <div className="profile-field">

            <label>

              <FaPhone />

              Mobile Number

            </label>

            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editMode}
            />

          </div>


          <div className="profile-field">

            <label>

              <FaMapMarkerAlt />

              Address

            </label>

            <textarea
              rows="4"
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!editMode}
            ></textarea>

          </div>


          {/* ==========================
                PROFILE STATS
          ========================== */}

          <div className="profile-stats">

            <div className="stat-card">

              <FaShoppingBag className="stat-icon" />

              <h2>12</h2>

              <p>Total Orders</p>

            </div>


            <div className="stat-card">

              <FaHeart className="stat-icon" />

              <h2>8</h2>

              <p>Wishlist</p>

            </div>


            <div className="stat-card">

              <FaShoppingCart className="stat-icon" />

              <h2>5</h2>

              <p>Cart Items</p>

            </div>


            <div className="stat-card">

              <h2>₹52,450</h2>

              <p>Total Spending</p>

            </div>

          </div>


          {/* ==========================
                MEMBERSHIP CARD
          ========================== */}

          <div className="membership-card">

            <div>

              <h2>🌟 Premium Membership</h2>

              <p>

                Enjoy Free Delivery, Early Access Deals,
                Exclusive Discounts and Priority Support.

              </p>

            </div>

            <button className="upgrade-btn">

              Active

            </button>

          </div>


          {/* ==========================
                QUICK ACTIONS
          ========================== */}

          <div className="profile-actions">

            <button
              className="action-btn"
              onClick={() => navigate("/orders")}
            >

              <FaShoppingBag />

              My Orders

            </button>


            <button
              className="action-btn"
              onClick={() => navigate("/wishlist")}
            >

              <FaHeart />

              Wishlist

            </button>


            <button
              className="action-btn"
              onClick={() => navigate("/cart")}
            >

              <FaShoppingCart />

              My Cart

            </button>


            <button
              className="action-btn"
              onClick={() => navigate("/address")}
            >

              <FaMapMarkerAlt />

              Saved Address

            </button>


            <button
              className="action-btn"
              onClick={() => navigate("/reset-password")}
            >

              <FaLock />

              Change Password

            </button>


            <button
              className="logout-btn"
              onClick={handleLogout}
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>


          {/* ==========================
                RECENT ORDERS
          ========================== */}

          <div className="recent-orders">

            <h2>Recent Orders</h2>


            <div className="recent-order-card">

              <img
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                alt="Fjallraven Backpack"
              />

              <div>

                <h3>Fjallraven Backpack</h3>

                <p>
                  Delivered Successfully ✅
                </p>

              </div>

              <h4>₹9,999</h4>

            </div>


            <div className="recent-order-card">

              <img
                src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
                alt="Mens Cotton Jacket"
              />

              <div>

                <h3>Mens Cotton Jacket</h3>

                <p>
                  Out For Delivery 🚚
                </p>

              </div>

              <h4>₹5,499</h4>

            </div>

          </div>


          {/* ==========================
                WISHLIST PREVIEW
          ========================== */}

          <div className="wishlist-preview">

            <h2>Wishlist Preview</h2>


            <div className="wishlist-card">

              <img
                src="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
                alt="WD External Hard Drive"
              />

              <div>

                <h3>WD External Hard Drive</h3>

                <p>₹6,999</p>

              </div>


              <button
                className="move-cart-btn"
                onClick={() => navigate("/cart")}
              >

                Move To Cart

              </button>

            </div>

          </div>


          {/* ==========================
                ACCOUNT SUMMARY
          ========================== */}

          <div className="account-summary">

            <h2>Account Summary</h2>


            <div className="summary-grid">

              <div className="summary-item">

                <h3>12</h3>

                <p>Total Orders</p>

              </div>


              <div className="summary-item">

                <h3>₹52,450</h3>

                <p>Total Spending</p>

              </div>


              <div className="summary-item">

                <h3>8</h3>

                <p>Wishlist</p>

              </div>


              <div className="summary-item">

                <h3>★★★★★</h3>

                <p>Premium Member</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Profile;