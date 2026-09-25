import "./Address.css";

import {  useEffect,useState } from "react";

import {
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";

function Address() {

 const [addresses, setAddresses] = useState(() => {

  const savedAddresses =
    localStorage.getItem("addresses");

  return savedAddresses
    ? JSON.parse(savedAddresses)
    : [
        {
          id: 1,
          name: "Madhura Namjoshi",
          phone: "9876543210",
          address: "Flat No. 203, ABC Apartment",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411046",
          type: "Home",
          isDefault: true,
        },
      ];

});

useEffect(() => {

  localStorage.setItem(
    "addresses",
    JSON.stringify(addresses)
  );

}, [addresses]);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });

  /* ==========================
        INPUT CHANGE
  ========================== */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  /* ==========================
        ADD / UPDATE
  ========================== */

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {

      alert("Please fill all fields");

      return;

    }

    if (editId) {

      setAddresses(
        addresses.map((item) =>
          item.id === editId
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );

      alert("Address Updated Successfully ✅");

    } else {

      const newAddress = {

        id: Date.now(),

        ...formData,

        isDefault: addresses.length === 0,

      };

      setAddresses([
        ...addresses,
        newAddress,
      ]);

      alert("Address Added Successfully ✅");

    }

    resetForm();

  };

  /* ==========================
          RESET FORM
  ========================== */

  const resetForm = () => {

    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });

    setEditId(null);

    setShowForm(false);

  };

  /* ==========================
          EDIT ADDRESS
  ========================== */

  const handleEdit = (address) => {

    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      type: address.type,
    });

    setEditId(address.id);

    setShowForm(true);

  };

  /* ==========================
          DELETE ADDRESS
  ========================== */

  const handleDelete = (id) => {

    if (!window.confirm("Delete this address?")) {
      return;
    }

    const updatedAddresses =
      addresses.filter(
        (item) => item.id !== id
      );

    setAddresses(updatedAddresses);

  };

  /* ==========================
        DEFAULT ADDRESS
  ========================== */

  const setDefaultAddress = (id) => {

    setAddresses(

      addresses.map((item) => ({

        ...item,

        isDefault: item.id === id,

      }))

    );

  };

  return (

    <section className="address-page">

      <div className="address-container">

        {/* HEADER */}

        <div className="address-header">

          <div>

            <h1>

              <FaMapMarkerAlt />

              My Addresses

            </h1>

            <p>
              Manage your delivery addresses
            </p>

          </div>

          <button
            className="add-address-btn"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >

            <FaPlus />

            Add New Address

          </button>

        </div>

        {/* FORM */}

        {showForm && (

          <div className="address-form-card">

            <h2>

              {editId
                ? "Edit Address"
                : "Add New Address"}

            </h2>

            <form onSubmit={handleSubmit}>

              <div className="address-row">

                <div className="address-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />

                </div>

                <div className="address-field">

                  <label>
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />

                </div>

              </div>

              <div className="address-field">

                <label>
                  Complete Address
                </label>

                <textarea
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House / Flat / Street / Area"
                ></textarea>

              </div>

              <div className="address-row">

                <div className="address-field">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />

                </div>

                <div className="address-field">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />

                </div>

              </div>

              <div className="address-row">

                <div className="address-field">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                  />

                </div>

                <div className="address-field">

                  <label>
                    Address Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >

                    <option value="Home">
                      Home
                    </option>

                    <option value="Work">
                      Work
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

              <div className="address-form-actions">

                <button
                  type="submit"
                  className="save-address-btn"
                >

                  {editId
                    ? "Update Address"
                    : "Save Address"}

                </button>

                <button
                  type="button"
                  className="cancel-address-btn"
                  onClick={resetForm}
                >

                  Cancel

                </button>

              </div>

            </form>

          </div>

        )}

        {/* ADDRESS LIST */}

        <div className="address-list">

          {addresses.length === 0 ? (

            <div className="no-address">

              <FaMapMarkerAlt />

              <h2>
                No Saved Address
              </h2>

              <p>
                Add an address for faster checkout.
              </p>

            </div>

          ) : (

            addresses.map((item) => (

              <div
                className="address-card"
                key={item.id}
              >

                <div className="address-card-header">

                  <div>

                    <span className="address-type">
                      {item.type}
                    </span>

                    {item.isDefault && (

                      <span className="default-badge">
                        Default
                      </span>

                    )}

                  </div>

                  <FaMapMarkerAlt />

                </div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  📱 {item.phone}
                </p>

                <p>
                  {item.address}
                </p>

                <p>
                  {item.city}, {item.state} -{" "}
                  <strong>{item.pincode}</strong>
                </p>

                <div className="address-actions">

                  {!item.isDefault && (

                    <button
                      className="default-btn"
                      onClick={() =>
                        setDefaultAddress(item.id)
                      }
                    >

                      <FaStar />

                      Set Default

                    </button>

                  )}

                  <button
                    className="edit-address-btn"
                    onClick={() =>
                      handleEdit(item)
                    }
                  >

                    <FaEdit />

                    Edit

                  </button>

                  <button
                    className="delete-address-btn"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >

                    <FaTrash />

                    Delete

                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </section>

  );

}

export default Address;