
import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from 'react';
// why this work?
// const { useState, useEffect } = React;
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';


const data = [
    { filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK" },
    { filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK" },
    { filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem" },
    { filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings" },
    { filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus" },
  ];

  const Slideshow = () => {
    const [currentImageID, nextID] = useState(0);
    const [currentInterval, update] = useState(1500);
    const [currentStatus, setStatus] = useState(false);
    const start = () => {
      setStatus(true);
      update(1500);
      // console.log("start")
    }
    const stop = () => {
      setStatus(false);
      // console.log("stop")
    }
    const slow = () => {
      update(currentInterval + 200);
      // console.log("slower")
    }
    const fast = () => {
      let newInterval = currentInterval - 200;
      update(newInterval > 200 ? newInterval : 200);
      // console.log("faster")
    }
  
    useEffect(() => {
      if (currentStatus) {
        let next = currentImageID + 1;
        let max = data.length;
        // console.log("current ID is " + currentImageID + ", out of " + max)
        const id = setInterval(() => { nextID(next < max ? next : 0) }, currentInterval);
        return () => clearInterval(id);
      }
    })
    return (
      <React.StrictMode>
        <div>
          <nav className="navbar navbar-expand-lg justify-content-center text-center">
            <ul className="navbar-nav gap-3">
              <li className="nav-item"><button className="btn btn-outline-primary" onClick={() => start()}>Start slideshow</button> </li>
              <li className="nav-item"><button className="btn btn-outline-primary" onClick={() => stop()}>Stop slodeshow</button> </li>
              <li className="nav-item"><button className="btn btn-outline-primary" onClick={() => slow()}>Slower</button> </li>
              <li className="nav-item"><button className="btn btn-outline-primary" onClick={() => fast()}>Faster</button> </li>
            </ul>
          </nav>
          <hr />
          <div className="container text-center">
            <div className="card d-inline-block m-2" style={{ width: "50%" }}>
              <img src={"images/" + data[currentImageID].filename} className="w-100" />
              <div className="card-body">
                <h6 className="card-title text-start">{data[currentImageID].filename}</h6>
              </div>
            </div>
          </div>
        </div>
      </React.StrictMode>
    );
  }
  
  export default Slideshow;