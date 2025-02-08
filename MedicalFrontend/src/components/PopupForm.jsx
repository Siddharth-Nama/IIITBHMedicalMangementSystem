import React from "react";

const PopupForm = ({ showPopup, setShowPopup }) => {
  if (!showPopup) return null;

  return (
    <div style={overlayStyles}>
      <div style={popupStyles}>
        <h2>Order Medicine</h2>
        <form>
          <label>
            Medicine Name:
            <input type="text" name="medicineName" required />
          </label>
          <br />
          <label>
            Quantity:
            <input type="number" name="quantity" required />
          </label>
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowPopup(false)}>Close</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const popupStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  textAlign: "center",
};

export default PopupForm;
