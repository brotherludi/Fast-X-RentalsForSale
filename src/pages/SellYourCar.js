import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { postSellCar } from "../api";
import "../SellYourCar.css";

const SellYourCar = () => {
  const [formData, setFormData] = useState({
    car_make: "",
    car_model: "",
    mileage: "",
    price: "",
    year: "",
    color: "",
    images: [],
    car_luxury: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData1 = new FormData();
    formData1.append("car_make", formData.car_make);
    formData1.append("car_model", formData.car_model);
    formData1.append("mileage", formData.mileage);
    formData1.append("price", formData.price);
    formData1.append("year", formData.year);
    formData1.append("color", formData.color);
    formData1.append("car_luxury", formData.car_luxury);
    formData1.append("images", e.target.images.files[0]);

    try {
      await postSellCar(formData);
      setShowModal(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error posting car for sale:", error);
      setErrorMessage("Failed to add car for sale");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleOkButtonClick = () => {
    setShowModal(false);
    // Redirect to Cars For Sale page
    window.location.href = "/cars";
  };

  return (
    <div className="sell-car-page">
      <Header />
      <div className="sell-car-content">
        <h2>Sell Your Car</h2>
        <form onSubmit={handleSubmit} className="sell-car-form">
          <label>
            Car Make:
            <input
              type="text"
              name="car_make"
              value={formData.car_make}
              onChange={handleChange}
            />
          </label>
          <label>
            Car Model:
            <input
              type="text"
              name="car_model"
              value={formData.car_model}
              onChange={handleChange}
            />
          </label>
          <label>
            Mileage:
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <label>
            Year:
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </label>
          <label>
            Color:
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </label>
          <label>
            Images:
            <input type="file" name="images" multiple onChange={handleChange} />
          </label>
          <label>
            Luxury Car:
            <input
              type="checkbox"
              name="car_luxury"
              checked={formData.car_luxury}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p className="success-message">
              Car added for sale successfully! 😃
            </p>
            <button className="modal-button" onClick={handleOkButtonClick}>
              OK
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SellYourCar;
