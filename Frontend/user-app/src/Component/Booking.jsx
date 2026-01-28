import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import { toast } from "react-toastify";
import SkyHeader from "./SkyHeader";
// import { get } from "mongoose";

const Booking = () => {
  const { id } = useParams(); // flight id
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const adults = Number(searchParams.get("adults")) || 1;
  const cabin = searchParams.get("cabin") || "Economy";
  const query = {
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    departDate: searchParams.get("departDate"),
    adults: searchParams.get("adults"),
    cabin: searchParams.get("cabin"),
  };

  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);

  // create passenger inputs
  useEffect(() => {
    setPassengers(
      Array.from({ length: adults }, () => ({
        name: "",
        age: "",
      })),
    );
  }, [adults]);

  // fetch flight
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/airline/users/flights/${id}`, {searchParams});
        setFlight(res.data);
      } catch (err) {
        toast(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
    console.log(query)
  }, [id]);
  const handleChange = (i, field, value) => {
    const copy = [...passengers];
    copy[i][field] = value;
    setPassengers(copy);
  };

  const handleBooking = async () => {
    if (passengers.some((p) => !p.name || !p.age)) {
      toast("Please fill all passenger details");
      return;
    }

    const pricePerSeat =
      cabin === "Business" ? flight.price.business : flight.price.economy;

    const totalPrice = pricePerSeat * passengers.length;

    try {
      await axios.post(
        "http://localhost:5050/airline/users/book",
        {
          flightId: flight._id,
          passengers: passengers.map((p) => ({
            ...p,
            seatClass: cabin.toLowerCase(),
          })),
          totalPrice,
        },
        { withCredentials: true },
      );

      toast.success("Booking successful");
      navigate("/my-bookings");
    } catch (err) {
      toast(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <div className="loading">Loading booking…</div>;
  if (!flight) return null;

  const seatPrice =
    cabin === "Business" ? flight.price.business : flight.price.economy;

  return (
    <div className="booking-wrapper sky">
      {/* HEADER */}
      <SkyHeader
        summary={`${query.from} → ${query.to} · ${cabin}`}
      />

      <div className="booking-layout">
        {/* LEFT */}
        <div className="booking-left">
          <h3>Passenger details</h3>

          {passengers.map((p, i) => (
            <div key={i} className="passenger-card">
              <h4>Passenger {i + 1}</h4>
              <input
                placeholder="Full name"
                value={p.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
              />
              <input
                type="number"
                placeholder="Age"
                value={p.age}
                onChange={(e) => handleChange(i, "age", e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="booking-right">
          <h3>Price summary</h3>

          <div className="price-row">
            <span>
              {passengers.length} × ₹{seatPrice}
            </span>
            <strong>₹{passengers.length * seatPrice}</strong>
          </div>

          <button className="confirm-btn" onClick={handleBooking}>
            Confirm booking →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
