import React, { useState } from "react";
import "./CollegeMap.css";

const CollegeMap = () => {
  let mapElement = [
    {name:"B-1", symbole:"" , xCoordinate : "3%", yCoordinate : "8%", height : "15%", width : "10%"},
    {name:"B-2", symbole:"" , xCoordinate : "60%", yCoordinate : "50%", height : "20%", width : "30%"},
    {name:"B-3", symbole:"" , xCoordinate : "30%", yCoordinate : "10%", height : "5%", width : "8%"},
    {name:"B-4", symbole:"" , xCoordinate : "40%", yCoordinate : "70%", height : "20%", width : "9%"},    
    {name:"B-5", symbole:"" , xCoordinate : "80%", yCoordinate : "10%", height : "5%", width : "5%"}    
  ]
  return (
    <>
      <div className="college-map">
        <nav className="nav-bar-college-map">
            <span>Home</span> &nbsp; &nbsp; &nbsp;
            <span>Create Map</span>
        </nav>
        <div className="college-map-main">
          <div className="college-map-outer-box">
            {
                mapElement.map((element) => (
                    <div className="college-map-box"
                    style={{
                        backgroundColor: "lightblue",
                        height: element.height,
                        width: element.width,
                        position: "absolute",
                        top: element.yCoordinate,
                        left: element.xCoordinate,
                        borderRadius: "8px",
                      }}>
                        <ul>
                            <li>{element.name}</li>
                            <li>{element.symbole}</li>
                        </ul>
                    </div>
                ))
            }
          </div>
          <nav className="college-map-main-nav">
            <span>Mark Location</span>
            <span>OPTION-2</span>
            <span>OPTION-3</span>
            <span>OPTION-4</span>

          </nav>
        </div>
      </div>
    </>
  );
};

export default CollegeMap;
