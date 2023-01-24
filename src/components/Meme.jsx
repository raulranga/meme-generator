import { useState } from "react";
import React from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    randomImg: "",
    topText: "",
    bottomText: "",
  });
  const [allMeme, setAllMeme] = useState([]);
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((resp) => resp.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  function getImg() {
    const random = Math.trunc(Math.random() * (allMeme.length + 1));
    const { url } = allMeme[random];
    setMeme((prevMeme) => ({ ...prevMeme, randomImg: url }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }
  return (
    <main>
      <form className="form">
        <input
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          className="form--input"
        ></input>
        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          className="form--input"
        ></input>
        <button type="button" className="form--btn" onClick={getImg}>
          Get a new meme image
          <ion-icon name="image"></ion-icon>
        </button>
      </form>

      <div className="meme">
        <img src={meme.randomImg} className="meme--image"></img>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
