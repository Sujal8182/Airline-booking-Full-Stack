import React from "react"
import "./Home.css"

const Home = () => {
  return (
    <div className="home">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <span className="logo">✈</span>
          <span className="brand">SkyRoute</span>
        </div>

        <div className="nav-right">
          <button className="nav-link">Help</button>
          <button className="nav-link">Log in</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Millions of cheap flights. One simple search.</h1>

        {/* SEARCH BAR */}
        <div className="search-wrapper">
          <div className="trip-type">
            <button className="active" onClick={Oneway}>One way</button>
            <button onClick={Round}>Round trip</button>
          </div>

          <div className="search-bar">
            <div className="input-box">
              <label>From</label>
              <input type="text" placeholder="Ahmedabad (AMD)" />
            </div>

            <div className="swap">⇄</div>

            <div className="input-box">
              <label>To</label>
              <input type="text" placeholder="Country, city or airport" />
            </div>

            <div className="input-box">
              <label>Depart</label>
              <input type="date" />
            </div>

            <div className="input-box">
              <label>Travellers and cabin class</label>
              <input type="text" placeholder="1 Adult, Economy" />
            </div>

            <button className="search-btn">Search</button>
          </div>

          <div className="options">
            <label><input type="checkbox" /> Add nearby airports</label>
            <label><input type="checkbox" /> Direct flights</label>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
