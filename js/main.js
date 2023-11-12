
// Save scroll position when the page is unloaded (before reload)
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


(() => {

      

  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;
  const frameCount = 660;
  const images = []; 


  const buds = {
      frame: 0
  }

  //run a for loop to populate our images array
  for(let i=0; i<frameCount; i++) {
      //console.log(i);
      const img = new Image();
      //string I am tryign to create: images/explode_0013.webp
      img.src = `images/${(i+1).toString().padStart(5, '0')}.jpg`;
      images.push(img);  
  }


  gsap.to(buds, {
      frame: 659  ,
      snap: "frame",
      scrollTrigger: {
          trigger: "#explode-view",
          pin: true, //to stop the trigger
          scrub: 1,
          markers: true,
          start: "center center"
      },
      onUpdate: render
  })

  images[0].addEventListener("onload", render);

  function render() {
      console.log(buds.frame);
      console.log(images[buds.frame]);
      context.clearRect(0,0, canvas.width, canvas.height);
      context.drawImage(images[buds.frame],0,0);
  }

})();




const colorButtons = document.querySelectorAll('.color-button');
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');

let currentImageIndex = 0;

colorButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Remove the 'selected' class from all buttons
    colorButtons.forEach((btn) => btn.classList.remove('selected'));

    // Add the 'selected' class to the clicked button
    button.classList.add('selected');

    // Change image source based on button index
    currentImageIndex = 1 - currentImageIndex; // Toggle between 0 and 1
    box1.innerHTML = `<img src="image${index + 1}${currentImageIndex === 0 ? 'a' : 'b'}.jpg" alt="Image 1">`;
    box2.innerHTML = `<img src="image${index + 1}${currentImageIndex === 0 ? 'b' : 'a'}.jpg" alt="Image 2">`;
  });
});





// ar

// Handles loading the events for <model-viewer>'s slotted progress bar
// const onProgress = (event) => {
//     const progressBar = event.target.querySelector('.progress-bar');
//     const updatingBar = event.target.querySelector('.update-bar');
//     updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
//     if (event.detail.totalProgress === 1) {
//       progressBar.classList.add('hide');
//       event.target.removeEventListener('progress', onProgress);
//     } else {
//       progressBar.classList.remove('hide');
//     }
//   };
//   document.querySelector('model-viewer').addEventListener('progress', onProgress);



  

//   document.addEventListener("DOMContentLoaded", function () {
//     var arModelViewer = document.getElementById("arModelViewer");

//     // Disable camera controls by default
//     arModelViewer.cameraControls = false;

//     // Enable camera controls on model click
//     arModelViewer.addEventListener("click", function () {
//       arModelViewer.cameraControls = true;
//     });
//   });



  (() => {
    //console.log("IIFE Fired");
    //variables
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
  
    const infoBoxes = [
      {
        title: "Noise-cancelling microphones",
        text: "Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.",
        image: "../images/noise-cancelling-microphones.png"
      }
  
    ]
  
    //functions
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
  
        // selected.appendChild(title);
        // selected.appendChild(text);
        // selected.appendChild(image);
  
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
      markers: true,
      duration: 2, 
    }
  });
  
  