import ReactDOM from "react-dom/client";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { useParams, useLocation } from
'react-router-dom';

function File() {
  let { id } = useParams();
  return (
  <div>
  <h3>ID: {id}</h3>
  </div>
  );
  }

  function NoMatch() {
    let location = useLocation();
    return (
    <div>
    <h3>
    No match for <code>{location.pathname}</code>
    </h3>
    </div>
    );
  }
    
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/about">About</Link> </li>
            <li> <Link to="/file/fileA">fileA</Link> </li>
            <li> <Link to="/file/fileB">fileB</Link> </li>
            <li> <Link to="/file/fileC">fileC</Link> </li>
          </ul>
        </div>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/file/:id" element={<File/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

class Home extends React.Component {
  render() {
    return <h2>Home</h2>;
  }
}

class About extends React.Component {
  render() {
    return <h2>About</h2>;
  }
}


const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
