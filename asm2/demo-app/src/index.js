/**
 * CSCI2720/ESTR2106 Assignment 2
 * Simple Image System in React
 *
 * I declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * I also acknowledge that I am aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: YU Sihong
 * Student ID  : 1155141630
 * Date        : 11/11
 */


 import ReactDOM from "react-dom/client";
 import React, { useState, useEffect } from 'react';

import App from './app';


// ReactDOM.render(<App name="CUHK Pictures"/>, document.querySelector("#app"));
// Below: new for React@18

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<React.StrictMode><App name="CSCI2720 Assignment2" /></React.StrictMode>);