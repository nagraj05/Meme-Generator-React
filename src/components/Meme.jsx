import { useEffect, useState } from "react";
// import memesdata from "../memesdata"

export default function Meme() {
  const [memeImage, setMemeImage] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMemeImage((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMemeImage((prevMemes) => ({
      ...prevMemes,
      [name]: value,
    }));
  }
  function saveMeme() {
    const canvas = document.createElement("canvas");
    const image = document.createElement("img");

    image.src = memeImage.randomImage;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      context.font = "30px Impact";
      context.fillStyle = "white";
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.textAlign = "center";

      const topText = memeImage.topText.toUpperCase();
      const bottomText = memeImage.bottomText.toUpperCase();

      context.fillText(topText, canvas.width / 2, 40);
      context.strokeText(topText, canvas.width / 2, 40);
      context.fillText(bottomText, canvas.width / 2, canvas.height - 20);
      context.strokeText(bottomText, canvas.width / 2, canvas.height - 20);

      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL();
      link.click();
    };
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top Text"
          className="form-input"
          name="topText"
          value={memeImage.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          className="form-input"
          name="bottomText"
          value={memeImage.bottomText}
          onChange={handleChange}
        />
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={memeImage.randomImage} className="meme--image" />
        <h2 className="meme--text top">{memeImage.topText}</h2>
        <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
      </div>
      <button className="form-button" onClick={saveMeme}>
          Save Meme
        </button>
    </main>
  );
}
