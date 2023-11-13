
//  General

window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });
  
  // Restore scroll position when the page is loaded
  window.addEventListener('load', function () {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  });
  


const navIcon = document.querySelector('#nav-icon1');
const burgerCon = document.querySelector('#burger-con');

navIcon.addEventListener('click', function() {
  navIcon.classList.toggle('open');
  burgerCon.classList.toggle('show');
});





// Scroll trigger video

(() => {
  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");

  // Set canvas dimensions based on the desired aspect ratio
  const aspectRatio = 16 / 9; // You can adjust this ratio based on your design
  const maxWidth = 800; // Set a maximum width based on your design
  canvas.width = maxWidth;
  canvas.height = maxWidth / aspectRatio;

  const frameCount = 660;
  const images = [];

  const buds = {
    frame: 0,
  };

  // Run a for loop to populate our images array
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/${(i + 1).toString().padStart(5, '0')}.jpg`;
    images.push(img);
  }

  gsap.to(buds, {
    frame: 659,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      
      start: "center center",
    },
    onUpdate: render,
  });

  images[0].addEventListener("load", render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0, canvas.width, canvas.height);
  }
})();








// AR model



  (() => {

  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  
  const infoBoxes = [
    {
      title: "Noise-cancelling microphones",
      text: "Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.",
      image: "../images/earphone-rubbers.png"
    }

    

  ]

  
  function modelLoaded() {
    //console.log(hotspots);
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index+1}`); //index start from 0
      console.log(selected);

      let title = document.createElement("h2");
      textContent = infoBox.title

      let text = document.createElement("p");
      textContent = infoBox.text

      let image = document.createElement("img");
      textContent = infoBox.image

    })
  }
  
  loadInfo();

  function showInfo() {
    //console.log(this.slot);
    //console.log(`#${this.slot}`);
    //since the slot value matches the id value I can use the slot value as a selector to get to the div I want.
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    //console.log(this.slot);
    //console.log(`#${this.slot}`);
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }
  
 
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });
})();

  



// colour

  let cont = document.querySelector(".img-carousel");

  gsap.to("img", {
    ease: "none",
    x: () => -(cont.scrollWidth - window.innerWidth),
    scrollTrigger: {
      trigger: cont,
      pin: cont,
      start: "center center",
      end: () => "+=" + 2 * (cont.scrollWidth - window.innerWidth), 
      scrub: true,
      invalidateOnRefresh: true,
      duration: 2, 
    }
  });
  



  // x-ray


  (() => {
    (function(){
        "use strict";
    
    
    var imageCon = document.querySelector('#imageCon'),
        drag = document.querySelector('.image-drag'),
        left = document.querySelector('.image-left'),
        dragging = false,
        min = 0,
        max = imageCon.offsetWidth;
    
    function onDown() {
      dragging = true;
    }
    
    function onUp() {
      dragging = false;
    }
    
    function onMove(event) {
      if(dragging===true) {
        var x = event.clientX - imageCon.getBoundingClientRect().left;
        console.log(event.clientX);
        console.log(imageCon.getBoundingClientRect().left);
      
        if(x < min) { 
          x = min;   
        }
       else if(x > max) { 
          x = max-4; 
        }
        drag.style.left = x + 'px';
        left.style.width = x + 'px';
      }
    }
    
    drag.addEventListener('mousedown', onDown, false); 
    document.body.addEventListener('mouseup', onUp, false);
    document.body.addEventListener('mousemove', onMove, false);
    })();
    
    
   
  
})();
  