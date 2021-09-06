import "./App.css";
import { useState, useEffect } from "react";

const data = {
  Title: "The Vacaville Story",
  Artist: ["Raymond Pettibon", "Nelson Tarpenny"],
  ConstituentID: [7500, 47667],
  ArtistBio: ["American, born 1957"],
  Nationality: ["American"],
  BeginDate: [1957, 0],
  EndDate: [0, 0],
  Gender: ["Male"],
  Date: "1989",
  Medium: "Artist's book, lithograph printed",
  Dimensions:
    'page (each): 8 1/2 x 5 1/2" (21.6 x 14 cm); overall (closed): 8 1/2 x 5 1/2 x 1/16" (21.6 x 14 x 0.2 cm)',
  CreditLine:
    "Acquired from The Eileen and Michael Cohen Collection through the The Sue and Edgar Wachenheim III Endowment",
  AccessionNumber: "1089.2014.142",
  Classification: "Illustrated Book",
  Department: "Drawings & Prints",
  DateAcquired: "2014-12-17",
  Cataloged: "Y",
  ObjectID: 191132,
  URL: "http://www.moma.org/collection/works/191132",
  ThumbnailURL:
    "http://www.moma.org/media/W1siZiIsIjMyNDE3OSJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDMwMHgzMDBcdTAwM2UiXV0.jpg?sha=665062a473d10060",
  "Height (cm)": 21.6,
  "Width (cm)": 14.0,
};

const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img className="card-x" src={data.ThumbnailURL} alt={data.Title} />
      </div>
      <div className="card-content">
        <h4>
          {data.Title}
          <br />
        </h4>
          <span className="card-date">{data.Date}</span>
        <div className="card-artist">
          <h5>Creator:</h5>
          
          {data.Artist.map((i) => {
            return <p className="card-span"> {i} </p>;
          })}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [arrAuthors, setArrAuthors] = useState([]);
  const [arrPictures, setArrPictures] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/authors")
      .then((res) => res.json())
      .then((data) => {
        setArrAuthors(data);
        console.log(data);
      });
  }, []);

  const searchAuthor = (e) => {
    e.preventDefault();
    console.log(e.target.textContent);
    fetch(`http://localhost:5000/author/${e.target.textContent}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArrPictures(data);
      }).catch((err) => {
        console.log(err);
      })
      window.scrollTo(0, 0);
  };
  const lookAuthor = (e) => {
    let author_container = document.getElementById("author_container");
    let list = author_container.getElementsByTagName("li");
    Object.keys(list).forEach((key) => {
      if (
        list[key].textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        list[key].style.display = "";
      } else {
        list[key].style.display = "none";
      }
    });

  };

  return (
    <div className="App">
      <div className="App-searcher">
        <h1>MoMa Museum</h1>
        <input
          onKeyUp={lookAuthor}
          className="search"
          type="text"
          placeholder="Search"
        />
        <div id="cards" className="card-container">
          {arrPictures.map((i) => {
            return <Card data={i} />;
          })}
        </div>
      </div>
      <header className="App-header">
          
        <div id="author_container" className="container">
          {arrAuthors.map((author, index) => (
            <li onClick={searchAuthor} key={index} className="author">
              {author}
            </li>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
