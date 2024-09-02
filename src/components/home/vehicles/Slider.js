import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import './slider.css'; // Import CSS file for styling

const images = [
  { url: "https://assets.tractorjunction.com/truck-junction/assets/images/truck/blazo-x-28-transit-mixer-1614682581.webp?format=webp" },
  { url: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" },
  { url: "images/3.jpg" },
  { url: "images/4.jpg" },
  { url: "images/5.jpg" },
  { url: "images/6.jpg" },
  { url: "images/7.jpg" },
];

const Slider = () => {
  return (
    <div className="slider-container">
      <SimpleImageSlider
        width={'100%'}
        height={'70vh'}
        images={images}
        showBullets={true}
        showNavs={true}
      />
      <br />
      <div className="boxes2">
        {/* Seven boxes here */}
        {/* You can map over your data to render the boxes */}
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="box2"></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
