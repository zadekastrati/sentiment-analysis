import React from "react";
import "./homepage.css";
import NavBar from "../navbar/navbar";
import bannerImage from "./assets/banner.svg";

const Homepage = () => {
  return (
     <div className="homepage">
         <NavBar />
      <div className="content">
        <h1>
          Hi There! <span className="wave">👋</span>
        </h1>
        <h2>
          We are <span className="name-highlight">Sentimetrics</span>
        </h2>
      </div>
      <div className="illustration">
      <img src={bannerImage} alt="Software Developer at Work" />
      </div>
    </div>
  );
};

export default Homepage;
