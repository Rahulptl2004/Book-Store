"use client";
import React, { useEffect, useState } from "react";
import "../style/address.css";
import Cookie from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;
const Address = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pinCode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [house, setHouse] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [addressId, setAddressId] = useState<string | null>(null);

  const [showDetail, setShowDetail] = useState<any[]>([]);
  // Cookie.set("userId", user.id);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`/api/profile/address`);
      setShowDetail(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const data = {
    name,
    mobile,
    pinCode,
    locality,
    house,
    city,
    state,
    landmark,
    altMobile,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isEdit && addressId) {
        await axios.put(`/api/profile/address`, { ...data, addressId });
        console.log("Address updated successfully");
      } else {
        await axios.post(`/api/profile/address`, data);
        console.log("New address added");
      }
      getData();
      resetForm();
    } catch (err) {
      console.log("Address error:", err);
    }
  };

  const handleEdit = (item: any) => {
    setShowForm(true);
    setIsEdit(true);
    setAddressId(item.id);

    setName(item.name);
    setMobile(item.mobile);
    setPincode(item.pinCode);
    setLocality(item.locality);
    setHouse(item.house);
    setCity(item.city);
    setState(item.state);
    setLandmark(item.landmark);
    setAltMobile(item.altMobile);
  };

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`/api/profile/address?addressID=${id}`);
      console.log("Address removed");
      getData();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setMobile("");
    setPincode("");
    setLocality("");
    setHouse("");
    setCity("");
    setState("");
    setLandmark("");
    setAltMobile("");
    setAddressId(null);
    setIsEdit(false);
    setShowForm(false);
  };

  return (
    <div className="address-container">
      <div className="address-box">
        <h2>Manage Addresses</h2>

        {!showForm && (
          <div className="add-new" onClick={() => setShowForm(true)}>
            <span>+ ADD A NEW ADDRESS</span>
          </div>
        )}

        {showForm && (
          <div className="address-form">
            <h3>{isEdit ? "EDIT ADDRESS" : "+ ADD A NEW ADDRESS"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile Number"
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Pincode"
                />
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Locality"
                />
              </div>

              <div className="formrow">
                <input
                  type="text"
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                  placeholder="House no., Flat, Apartment"
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City/District/Town"
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Landmark (optional)"
                />
                <input
                  type="text"
                  value={altMobile}
                  onChange={(e) => setAltMobile(e.target.value)}
                  placeholder="Alternate Phone (optional)"
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  {isEdit ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="saved-address">
          {showDetail && showDetail.length > 0 ? (
            showDetail.map((item: any, i) => (
              <div key={i} className="saved-card">
                <div className="saved-header">
                  <div>
                    <span className="name">{item.name}</span>
                  </div>
                  <div className="edit-remove">
                    <span onClick={() => handleEdit(item)} className="edit">
                      Edit
                    </span>
                    <span
                      onClick={() => handleRemove(item.id)}
                      className="remove"
                    >
                      Remove
                    </span>
                  </div>
                </div>
                <p>
                  {item.house}, {item.locality}, {item.city} - {item.pinCode}
                </p>
                <p>{item.mobile}</p>
              </div>
            ))
          ) : (
            <p>No saved addresses yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
