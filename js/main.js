
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
      image: "../images/noise-cancelling-microphones.png"
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
  
  //Event Listener
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });
})();

  


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
        //The HTMLElement.offsetWidth read-only property returns the layout width of an element. 
    
    function onDown() {
      dragging = true;
    }
    
    function onUp() {
      dragging = false;
    }
    
    function onMove(event) {
      if(dragging===true) {
        var x = event.clientX - imageCon.getBoundingClientRect().left;
        //The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred
        //The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
        //X-coordinate, relative to the viewport origin, of the left of the rectangle box. Read only
        console.log(event.clientX);
        console.log(imageCon.getBoundingClientRect().left);
      //need logic to keep slider in box
        if(x < min) { //if x less than 0
          x = min;    //set x = 0
        }
       else if(x > max) { //otherwise if x is greater than 900
          x = max-4; //set x to equal the max width minus 2 (width of slider)
        }
        drag.style.left = x + 'px';
        left.style.width = x + 'px';
      }
    }
    
    drag.addEventListener('mousedown', onDown, false); 
    //add listener to actual drag div, if user clicks on it
    //drag.addEventListener('touchstart', onDown);
    document.body.addEventListener('mouseup', onUp, false);
    //document.body.addEventListener('mo', onUp);
    document.body.addEventListener('mousemove', onMove, false);
    //document.body.addEventListener('touchmove', onMove);
    
    })();
    
    
    /*231-187.5 = 43.5.  43.5 is how much of the car is left showing*/
    
    /*
    The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred (as opposed to the coordinates within the page). For example, clicking in the top-left corner of the client area will always result in a mouse event with a clientX value of 0, regardless of whether the page is scrolled horizontally.
    */

  
})();
  