import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting){
      entry.target.classList.add("show");
    }
    else{
      entry.target.classList.remove("show");
    }

  });
});


var vid = document.getElementById("openingVideo")
const playVideo = document.getElementById("seedpacketImage")

playVideo.addEventListener("click", function(){
  vid.play();
})

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

