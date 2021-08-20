import React from "react";
import preloader from "../../assets/preloader.svg";


export const Preloader: React.FC = () => {
  return <div className="preloader">
    <img src={preloader} alt="preloader" />
  </div>;
};
