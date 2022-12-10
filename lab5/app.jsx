const data = [
  {filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK"},
  {filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK"},
  {filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem"},
  {filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings"},
  {filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus"},
];


class App extends React.Component {
  render() {
    {/* <> fragment for >1 components */}
    return (
      <> 
        <Title name={this.props.name}/>
        <Gallery />
      </>  
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <header className="bg-warning">
        <h1 className="display-4 text-center">{this.props.name}</h1>
      </header>
    );
  }
}

class Gallery extends React.Component {
  render() {
    return (
      <main className="container">
        {data.map((file,index) => <FileCard i={index} key={index}/>)}
      </main> 
    );
  }
} 

class FileCard extends React.Component {
  render() {
    let i = this.props.i;
    return (
      <div className="card d-inline-block m-2" style={{width:200}}>
        <img src={"images/"+data[i].filename} className="w-100" />
        <div className="card-body">
          <h6 className="card-title">{data[i].filename}</h6>
          <p className="card-text">{data[i].year}</p>
        </div>
      </div>
    );
  }
}


// ReactDOM.render(<App name="CUHK Pictures"/>, document.querySelector("#app"));
// Below: new for React@18

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App name="CUHK Pictures"/>);

