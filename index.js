import { pixelit } from "./pixel.js";
const imgContainer = document.getElementById("img_container");
const pixelContainer = document.getElementById("pixel_container");
document.getElementById("filesImg").addEventListener("change", (e) => {
  console.log("e.target.files[0]");
  Object.entries(e.target.files).forEach((element) => {
    const [key, file] = element;
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const newImage = document.createElement("img");
      const previewImage = document.createElement("img");
      newImage.src = reader.result;
      previewImage.className = "w-40 ";
      previewImage.src = reader.result;
      newImage.id = "img_" + key;

      const newCanvas = document.createElement("canvas");
      newCanvas.id = "pixelitcanvas_" + key;
      newCanvas.className = "w-40";

      imgContainer.appendChild(previewImage);
      pixelContainer.appendChild(newImage);
      pixelContainer.appendChild(newCanvas);

      newImage.onload = () => {
        console.log(document.getElementById(newImage.id));
        const px = new pixelit({
          from: document.getElementById(newImage.id),
          to: document.getElementById(newCanvas.id),
          scale: 14,
        });
        px.draw().pixelate();
      };
    };
  });
});

const downloasAllPixelArts = () => {
  document.querySelectorAll("canvas").forEach((element) => {
    
    const link = document.createElement("a");
    link.download = element.id + ".png";
    link.href = element.toDataURL();
    link.click();
  });
};
document
  .getElementById("btnDownload")
  .addEventListener("click", downloasAllPixelArts);
// const px = new pixelit();
// px.draw().pixelate();
