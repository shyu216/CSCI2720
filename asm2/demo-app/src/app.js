
import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from 'react';
// why this work?
// const { useState, useEffect } = React;
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import Slideshow from './slideshow';

const data = [
    { filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK" },
    { filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK" },
    { filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem" },
    { filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings" },
    { filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus" },
  ];
  
  const NoMatch = () => {
    let location = useLocation();
    return (
      <React.StrictMode>
        <div>
          <h3>No match for <code>{location.pathname}</code></h3>
        </div>
      </React.StrictMode>
    );
  }
  
  const App = (props) => {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Title name={props.name} />
          <div>
            <ul>
              <li> <Link to="/">Home</Link> </li>
              <li> <Link to="/gallery">Images</Link> </li>
              <li> <Link to="/slideshow">Slideshow</Link> </li>
            </ul>
          </div>
  
          <hr />
  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/slideshow" element={<Slideshow />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
  
  const Title = (props) => {
    return (
      <React.StrictMode>
        <header className="bg-warning">
          <h1 className="display-4 text-center">{props.name}</h1>
        </header>
      </React.StrictMode>
    );
  }
  
  const Gallery = () => {
    useEffect(() => {
      let lazyloadImages = document.getElementsByName("lazyimg");
      let imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.setAttribute("name", "loadedimg");
            image.src = image.dataset.src;
            imageObserver.unobserve(image);
          }
        });
      });
      lazyloadImages.forEach(image => imageObserver.observe(image));
    });
    return (
      <React.StrictMode>
        <main className="container">
          {data.map((file, index) => <FileCard i={index} key={index} />)}
        </main>
      </React.StrictMode>
    );
  }
  
  const FileCard = (props, state) => {
    const [selected, setSelect] = useState(-1);
    const handleMouseOver = (index, e) => {
      setSelect(index);
      // console.log(index);
    }
    const handleMouseOut = (index, e) => {
      setSelect(-1);
      // console.log(index);
    }
    let i = props.i;
    return (
      <React.StrictMode>
        <div onMouseOver={(e) => handleMouseOver(i, e)} onMouseOut={(e) => handleMouseOut(i, e)} className="card d-inline-block m-2" style={{ width: selected == i ? 220 : 200 }}>
          <img data-src={"images/" + data[i].filename} className="w-100" name="lazyimg" />
          <div className="card-body">
            <h6 className="card-title">{data[i].filename}</h6>
            <p className="card-text">{data[i].year}</p>
            {selected == i && <p className="card-text">{data[i].remarks}</p>}
          </div>
        </div>
      </React.StrictMode>
    );
  }
  
  
  const Home = () => {
    return (
      <React.StrictMode>
        <div className="container text-center">
          <div className="card d-inline-block m-2" style={{ width: "50%" }}>
            <img src={"./diagram.png"} className="w-100" />
            <div className="card-body">
              <h6 className="card-title text-start">diagram.png</h6>
            </div>
          </div>
          <hr />
          <h3 className="text-center">CHALLENGE REQUIREMENTS</h3>
          <p className="text-start">Enable <b>React.StrictMode</b> for all React components to enhance development. It is a tool for highlighting potential problems in an application.</p>
          <p className="text-start">Build all React components as <b>React functional components</b>. Functional components are able to accomplish the same tasks by using less code than class components do.</p>
          <p className="text-start">Lazy load all the images in the <b>Gallery</b>, which will help save your bandwidth. As I don't know what images you will use to test me. Please add more images for the <b>data</b> variables in my index.js.</p>
        </div>
      </React.StrictMode>
    );
  }
  
export default App;