gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true },
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  // follwoing line is not required to work pinning on touch screen

  /* pinType: document.querySelector(".smooth-scroll").style.transform
    ? "transform"
    : "fixed"*/
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();



/* -------------------------------------------------------------------------- */
/*                                   CURSOR                                   */
/* -------------------------------------------------------------------------- */
const cursorMain = document.querySelector(".cursor");

// Event listener for mousemove
window.addEventListener("mousemove", function (dets) {
  gsap.to(cursorMain, {
    x: dets.clientX,
    y: dets.clientY,
    duration: 0.5,
    ease: "expo",
  });
});

// Example placeholder for scroll event handling
window.addEventListener("scroll", function () {});

// Additional cursor animation and style change for cursorMask
const cursorMaskElems = document.querySelectorAll(".cursorMask");

cursorMaskElems.forEach(function (cursorHoverMask) {
  cursorHoverMask.addEventListener("mouseenter", function (dets) {
    gsap.to(cursorMain, {
      scale: 6,
      mixBlendMode: "difference", // Change mix-blend-mode
    });
  });

  cursorHoverMask.addEventListener("mouseleave", function (dets) {
    gsap.to(cursorMain, {
      scale: 1,
      mixBlendMode: "normal", // Change mix-blend-mode
    });
  });
});

const cursorSmallElems = document.querySelectorAll(".cursorSmall");

cursorSmallElems.forEach(function (cursorHoverSmall) {
  cursorHoverSmall.addEventListener("mouseenter", function (dets) {
    gsap.to(cursorMain, {
      scale: 0.5,
      mixBlendMode: "difference", // Change mix-blend-mode
    });
  });

  cursorHoverSmall.addEventListener("mouseleave", function (dets) {
    gsap.to(cursorMain, {
      scale: 1,
      mixBlendMode: "normal", // Change mix-blend-mode
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                               BUTTON SECTION                               */
/* -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const buttonBlock = document.querySelector(".animated-btn");
  const link = buttonBlock.querySelector("a");
  const squareContainer = buttonBlock.querySelector(".btn-sq");
  const squareSize = 10;
  const numCols = Math.ceil(buttonBlock.clientWidth / squareSize);
  const numRows = Math.ceil(buttonBlock.clientHeight / squareSize);
  const numSquares = numCols * numRows;

  let hoverTimeline = null;
  let squaresCreated = false;
  let hoverInProgress = false;

  function createSquares() {
    if (!squaresCreated) {
      for (let i = 0; i < numSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        squareContainer.appendChild(square);
      }
      squaresCreated = true;
    }
  }

  function animateSquares(direction) {
    const squares = squareContainer.querySelectorAll(".square");

    if (hoverTimeline) {
      hoverTimeline.kill();
      hoverInProgress = false;
    }

    hoverTimeline = gsap.timeline({
      onComplete: () => {
        hoverTimeline = null;
        hoverInProgress = false;
      },
    });

    if (direction === "in") {
      hoverInProgress = true;
      hoverTimeline.fromTo(
        squares,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "expo.in",
          duration: 0.3,
          stagger: {
            each: 0.02,
            from: "random",
          },
        }
      );
    } else if (direction === "out") {
      hoverTimeline.fromTo(
        squares,
        { opacity: gsap.getProperty(squares[0], "opacity") }, // Get current opacity
        {
          opacity: 0,
          ease: "expo.out",
          duration: 0.3,
          stagger: {
            each: 0.02,
            from: "random",
          },
        }
      );
    }
  }

  function clearSquares() {
    animateSquares("out");
  }

  buttonBlock.addEventListener("mouseenter", () => {
    createSquares();
    animateSquares("in");
    hoverInProgress = false;
  });

  buttonBlock.addEventListener("mouseleave", () => {
    if (hoverTimeline) {
      hoverTimeline.reverse(); // Reverse the current timeline
    } else {
      clearSquares();
    }
    hoverInProgress = true;
  });

  buttonBlock.addEventListener("click", () => {
    link.click();
  });
});

/* -------------------------------------------------------------------------- */
/*                              HOME HERO SECTION                             */
/* -------------------------------------------------------------------------- */

 document.addEventListener("DOMContentLoaded", () => {
   const loaderCounter = document.querySelector(".loader-counter");
   const loader = document.querySelector(".loader");
   const heroImage = document.querySelectorAll(".home-hero-image");
   const homeHeroTxt = document.querySelectorAll(".home-hero-heading h1");

   gsap.set(homeHeroTxt, {
    y: "400%",
    skewX: 10,
  });

  gsap.set(".home-hero-circler-text-con", {
    x: "200%",
    skewX: 10,
   });
   
  gsap.set(".home-hero-svg svg", {
    opacity:0
   });

   gsap.set(heroImage, { height: 0 });
    

   const tl = gsap.timeline();

   function shuffleText(finalText, duration, callback) {
     let i = 0;
     const allowedChars = "!#$%*/-&"; // Allowed characters
     const shuffleInterval = setInterval(() => {
       if (i < finalText.length) {
         let newText = "";
         for (let j = 0; j < finalText.length; j++) {
           newText += allowedChars[Math.floor(Math.random() * allowedChars.length)];
         }
         loaderCounter.innerHTML = newText;
         i++;
       } else {
         clearInterval(shuffleInterval);
         loaderCounter.innerHTML = finalText;
         if (callback) callback();
       }
     }, 100);
   }

   function removeLetters() {
     let text = loaderCounter.innerHTML;
     const removeInterval = setInterval(() => {
       if (text.length > 0) {
         text = text.substring(0, text.length - 1);
         loaderCounter.innerHTML = text;
       } else {
         clearInterval(removeInterval);
         fadeOutLoader();
       }
     }, 100);
   }
   

   const mm = gsap.matchMedia();

   function fadeOutLoader() {
     
      // Ensure the element is initially hidden

      // Animate to the CSS-defined height
      tl.to(heroImage, {
        height: "auto",
        borderRadius: "1rem",
        duration: 2,
        ease: "expo.inOut"
      });
  

     tl.to(
       loader,
       {
         height: 0,
         ease: "expo.inOut",
         pointerEvents: "none",
         duration: 1.8,
         delay: -0.3,
         onComplete: () => {
           loaderCounter.style.display = "none";
         }
       },
       "h"
     );
     
     tl.to(heroImage, {
       rotate:"-10%",
       duration:1.8,
       ease:"expo.inOut",
      //  delay:
      },"h");
      
      tl.to(".home-hero-svg svg",{
        opacity:1,
        ease: "expo.inOut",
        duration: 2,
        delay:-0.4
      },"h");
      
      tl.to(homeHeroTxt,{
        y: "0%",
        ease: "expo.inOut",
        duration: 2.6,
        stagger: 0.1,
        skewX: 0,
        delay: -0.4,
      },"heroElm");
      

  
      tl.to(".home-hero-circler-text-con",{
          x: "0%",
          ease: "expo.inOut",
          duration: 2.6,
          skewX: 0,
          delay: -0.4,
        },"heroElm");



        tl.to("#circleHero1", {
          left: "-6rem",
          top: "-18rem",
          duration: 2,
          delay:0.1,
          ease: "expo.inOut",
        },"heroElm");
        tl.to("#circleHero2", {
          right: "-6rem",
          bottom: "-18rem",
          duration: 2,
          delay:0.1,
          ease: "expo.inOut",
        },"heroElm");
        
    
   }

   tl.to(loaderCounter, {
     innerHTML: 100 + "%",
     duration: 3,
     snap: "innerHTML",
     ease: "none"
   }).add(() => {
     setTimeout(() => {
       shuffleText("VFX DUDES", 20, () => {
         setTimeout(removeLetters, 500);
       });
     }, 500);
   });
 });








const text = document.querySelector(".home-hero-circler-text");
text.innerHTML = text.innerText
  .split("")
  .map(
    (char, i) => `<span style="transform:rotate(${i * 10.3}deg)">${char}</span>`
  )
  .join("");

// document.addEventListener("DOMContentLoaded", () => {
//   const loaderCounter = document.querySelector(".loader-counter");
//   const heroImages = document.querySelectorAll(".hero-img");
//   const heroImage1 = document.querySelector("#home-hero-img-1");
//   const heroImage2 = document.querySelector("#home-hero-img-2");
//   const heroImage3 = document.querySelector("#home-hero-img-3");
//   const loader = document.querySelector(".loader");
//   const homeHeroTxt = document.querySelectorAll(".hero-txt-wrap h1");

//   gsap.set(homeHeroTxt, {
//     y: "400%",
//     skewX: 10
//   });

//   const tl = gsap.timeline();

//   function shuffleText(finalText, duration, callback) {
//     let i = 0;
//     const allowedChars = "!#$%*/-&"; // Allowed characters
//     const shuffleInterval = setInterval(() => {
//       if (i < finalText.length) {
//         let newText = "";
//         for (let j = 0; j < finalText.length; j++) {
//           newText += allowedChars[Math.floor(Math.random() * allowedChars.length)];
//         }
//         loaderCounter.innerHTML = newText;
//         i++;
//       } else {
//         clearInterval(shuffleInterval);
//         loaderCounter.innerHTML = finalText;
//         if (callback) callback();
//       }
//     }, 100);
//   }

//   function removeLetters() {
//     let text = loaderCounter.innerHTML;
//     const removeInterval = setInterval(() => {
//       if (text.length > 0) {
//         text = text.substring(0, text.length - 1);
//         loaderCounter.innerHTML = text;
//       } else {
//         clearInterval(removeInterval);
//         fadeOutLoader();
//       }
//     }, 100);
//   }

//   const mm = gsap.matchMedia();

//   function fadeOutLoader() {
//     tl.to(heroImages, { height: "28rem", duration: 2, ease: "expo.inOut" });

//     tl.to(
//       loader,
//       {
//         height: 0,
//         ease: "expo.inOut",
//         pointerEvents: "none",
//         duration: 1.8,
//         delay: -0.3,
//         onComplete: () => {
//           loaderCounter.style.display = "none";
//         }
//       },
//       "h"
//     );

//     tl.to(
//       homeHeroTxt,
//       {
//         y: "0%",
//         ease: "expo.inOut",
//         duration: 2.6,
//         stagger: 0.1,
//         skewX: 0,
//         delay: -0.4
//       },
//       "h"
//     );

//     mm.add("(min-width: 627px)", () => {
//       tl.to(heroImage2, { x: "140%", duration: 2, ease: "expo.inOut" }, "h");
//       tl.to(heroImage3, { x: "-140%", duration: 2, ease: "expo.inOut" }, "h");
//       tl.to(".hero-img img", { opacity: 0.5, duration: 2, ease: "expo.inOut" }, "h");
//     });
//   }

//   tl.to(loaderCounter, {
//     innerHTML: 100 + "%",
//     duration: 3,
//     snap: "innerHTML",
//     ease: "none"
//   }).add(() => {
//     setTimeout(() => {
//       shuffleText("VFX DUDES", 20, () => {
//         setTimeout(removeLetters, 500);
//       });
//     }, 500);
//   });
// });

/* -------------------------------------------------------------------------- */
/*                             HOME VIDEO SECTION                             */
/* -------------------------------------------------------------------------- */
const homeVidMM = gsap.matchMedia();

homeVidMM.add("(min-width: 950px)", () => {
  const homeVidPlx1 = document.querySelectorAll("#home-vid-col-1");
  const homeVidPlx2 = document.querySelector("#home-vid-col-2");
  const homeVidScale = document.querySelector(".home-video-desk-wrap");

  // Initial set of elements
  homeVidPlx1.forEach((element) => {
    gsap.set(element, {
      x: "15%",
    });
  });

  gsap.set(homeVidPlx2, {
    x: "-13%",
  });

  const homeVidTl = gsap.timeline();

  homeVidTl.to(
    ".home-video-desk-wrapper",
    {
      scrollTrigger: {
        trigger: ".home-video-desk-wrapper",
        scroller: ".smooth-scroll",
        start: "top top",
        end: "600% bottom",
        pin: true,
        // markers: true,
        scrub: true,
      },
    },
    "hvidTL"
  );
  // Create the timeline

  // Add animations to the timeline
  homeVidTl.to(
    homeVidScale,
    {
      scale: 3.9,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".home-video-desk-wrapper",
        scroller: ".smooth-scroll",
        start: "top top",
        end: "500% bottom",
        scrub: 1,
        // markers: true
      },
    },
    "hvidTL"
  );

  homeVidTl.to(
    homeVidPlx1,
    {
      x: 0,
      duration: 5,
      ease: "power.inOut",
      scrollTrigger: {
        trigger: ".home-video-desk-wrapper",
        scroller: ".smooth-scroll",
        start: "top top",
        end: "500% bottom",
        scrub: 1,
        // markers: true
      },
    },
    "hvidTL"
  );

  homeVidTl.from(
    ".home-vid video",
    {
      opacity: ".1",
      duration: 5,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: ".home-video-desk-wrapper",
        scroller: ".smooth-scroll",
        start: "top top",
        end: "400% bottom",
        scrub: 1,
        // markers: true
      },
    },
    "hvidTL"
  );

  homeVidTl.to(
    homeVidPlx2,
    {
      x: 0,
      duration: 5,
      ease: "power.inOut",
      scrollTrigger: {
        trigger: ".home-video-desk-wrapper",
        scroller: ".smooth-scroll",
        start: "top top",
        end: "500% bottom",
        scrub: 1,
        // markers: true
      },
    },
    "hvidTL"
  );
});

/* -------------------------------------------------------------------------- */
/*                             HOME ABOUT SECTION                             */
/* -------------------------------------------------------------------------- */

gsap.from(".h-ab-heading h2", {
  y: "150%",
  rotationZ: "1",
  duration: 1.6,
  ease: "expo.inOut",
  stagger: 0.01,

  scrollTrigger: {
    trigger: ".home-about-wrap",
    scroller: ".smooth-scroll",
    start: "top center",
  },
});

gsap.set(".h-ab-btn-wrap", {
  scale: 0,
});
gsap.to(".h-ab-btn-wrap", {
  scale: 1,
  duration: 1.6,
  ease: "expo.inOut",

  scrollTrigger: {
    trigger: ".home-about-wrap",
    scroller: ".smooth-scroll",
    start: "top center",
  },
});

/* -------------------------------------------------------------------------- */
/*                                     WWD                                    */
/* -------------------------------------------------------------------------- */





// let wwdTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".home-wwd-wrapper",
//     scroller: ".smooth-scroll",
//     start: "top top",
//     end: "500% bottom",
//     scrub: true,
//     pin: true,
//   },
// });

// wwdTl.from(".home-wwd-wrap", {
//   left: "90%",
//   ease: "power1.inOut",
// });

// const cards = [
//   { id: "#card-1", endTranslateX: -2000, rotate: 45 },
//   { id: "#card-2", endTranslateX: -1000, rotate: -30 },
//   { id: "#card-3", endTranslateX: -2000, rotate: 45 },
//   { id: "#card-4", endTranslateX: -1500, rotate: -30 },
// ];

// cards.forEach((card) => {
//   wwdTl.to(
//     card.id,
//     {
//       x: card.endTranslateX,
//       rotate: card.rotate,
//       ease: "power3.inOut",
//     },
//     0
//   ); // The '0' here aligns the animations to start at the same time.
// });

/* -------------------------------------------------------------------------- */
/*                                HOME SERVICES                               */
/* -------------------------------------------------------------------------- */

// this setup code only runs when viewport is at least 992px wide
let wheel = document.querySelector(".wheel__wrapper"),
  numLines = 11,
  radius = numLines * 30,
  angle = -180 / numLines,
  origin = `50% 50% -${radius}px`;

gsap.set(wheel, {
  transformOrigin: "50% 50%",
});
gsap.set(wheel.querySelectorAll(".wheel__text-item"), {
  z: radius,
  rotationX: (index) => angle * index,
  transformOrigin: origin,
});
gsap.to(wheel, {
  rotationX: 160,
  ease: "none",
  transformOrigin: "50% 50%",
  scrollTrigger: {
    trigger: ".wheel__container",
    scroller: ".smooth-scroll",
    start: "top top",
    end: `top+=${window.innerHeight * 3} bottom`,
    // markers: true,
    scrub: true,
    pin: true, // Pin the element during the animation
    // Removed the snap configuration to enable free scrolling
  },
});

// Initialize audio element
const soundEffect = new Audio("Assets/SOUND/SCROLL SOUND.mp3");

// Map to store whether sound is playing for each element
const isSoundPlayingMap = new Map();

// Add event listener for scroll updates
locoScroll.on("scroll", (instance) => {
  let items = document.querySelectorAll(".wheel__text-item");
  let wheel = document.querySelector(".wheel__wrapper");

  items.forEach((item) => {
    let rect = item.getBoundingClientRect();
    let centerX = wheel.offsetWidth / 2;
    let centerY = wheel.offsetHeight / 2;

    // Check if the item's center is within a certain range of the wheel's center
    if (
      rect.left <= centerX &&
      rect.right >= centerX &&
      rect.top <= centerY &&
      rect.bottom >= centerY
    ) {
      item.classList.add("green"); // Add green class if center is within range

      // Play sound effect only if it's not already playing for this element
      if (!isSoundPlayingMap.has(item)) {
        isSoundPlayingMap.set(item, true); // Set flag to indicate sound is playing for this element
        playSoundEffect(); // Play sound effect
      }
    } else {
      item.classList.remove("green"); // Remove green class if center is not within range
      // Remove entry from map when element is not in range
      isSoundPlayingMap.delete(item);
    }
  });
});

// Function to play sound effect
function playSoundEffect() {
  soundEffect.currentTime = 0; // Reset sound to the beginning
  soundEffect.play(); // Play sound effect
}

/* -------------------------------------------------------------------------- */
/*                                HOME PROJECTS                               */
/* -------------------------------------------------------------------------- */

document
  .querySelectorAll(".h-pro-image img, .h-pro-image-xl img")
  .forEach((projectImg, index) => {
    gsap.to(projectImg, {
      y: -50,
      duration: 2,
      scrollTrigger: {
        trigger: projectImg,
        scroller: ".smooth-scroll",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });
  });

/* -------------------------------------------------------------------------- */
/*                              HOME CGI HEADING                              */
/* -------------------------------------------------------------------------- */

gsap.to(".home-cgi-text h2", {
  y: 10,
  scrollTrigger: {
    trigger: ".home-cgi-heading-wrap",
    scroller: ".smooth-scroll",
    start: "top 80%",
    end: "bottom bottom",
    scrub: true,
    // markers:true
  },
});

function randomRotation(element, minRotation, maxRotation, duration) {
  gsap.to(element, {
    rotation: gsap.utils.random(minRotation, maxRotation),
    duration: duration,
    ease: "expo.inOut",
    repeat: -1,
    yoyo: true,
  });
}

randomRotation("#h-cgi-i1", -30, 25, 1);
randomRotation("#h-cgi-i2", -50, 50, 2);
randomRotation("#h-cgi-i3", -50, 50, 3);

/* -------------------------------------------------------------------------- */
/*                               HOME CGI VIDEOS                              */
/* -------------------------------------------------------------------------- */

// create

// Background color change for .home-cgi-videos-wrap
let homeCGIBG = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-cgi-videos-wrap",
    scroller: ".smooth-scroll",
    start: "30% center",
    end: "bottom bottom",
    scrub: true,
    // markers:true
  },
});
homeCGIBG.to(".home-cgi-videos-wrap", {
  backgroundColor: "#a3a3a3",
  duration: 1,
});

let mm = gsap.matchMedia();

document.addEventListener("DOMContentLoaded", function () {
  // Select all video wrapper elements
  const cgiVideoWrappers = document.querySelectorAll(".home-cgi-video");
  const cgiVideos = document.querySelectorAll(".home-cgi-video video");

  // Loop through each video element
  cgiVideos.forEach((video) => {
    // Pause all videos initially
    video.pause();
  });

  // Loop through each video wrapper element
  cgiVideoWrappers.forEach((wrapper) => {
    const video = wrapper.querySelector("video");

    // Add hover event listener to play video and scale wrapper
    wrapper.addEventListener("mouseenter", () => {
      video.play();
      gsap.to(wrapper, { scale: 0.96, duration: 1, ease: "linnar" });
    });

    // Add mouseleave event listener to pause video, reset timeline and scale wrapper
    wrapper.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      gsap.to(wrapper, { scale: 1, duration: 1, ease: "linnar" });
    });
  });
});

// add a media query. When it matches, the associated function will run
mm.add("(min-width: 950px)", () => {
  let cgiVideos1 = document.querySelectorAll(".home-cgi-video:nth-of-type(1)");
  gsap.to(cgiVideos1, {
    y: 100,
    duration: 2,
    scrollTrigger: {
      trigger: ".home-cgi-videos-wrap",
      scroller: ".smooth-scroll",
      start: "top center",
      end: "bottom bottom",
      scrub: true,
    },
  });

  let cgiVideos2 = document.querySelectorAll(".home-cgi-video:nth-of-type(2)");
  gsap.to(cgiVideos2, {
    y: -100,
    duration: 2,
    scrollTrigger: {
      trigger: ".home-cgi-videos-wrap",
      scroller: ".smooth-scroll",
      start: "top center",
      end: "bottom bottom",
      scrub: true,
    },
  });
});

class Shuffle {
  constructor(element, duration = 10.1) {
    this.element = element;
    this.originalText = element.textContent;
    this.duration = duration;
    this.randChars = "!@#$%^&*?!@#$%^&*?!@#$%^&*?";
    this.chars = this.randChars.length;
  }

  shuffleText() {
    const letters = this.originalText.split("");
    const totalLetters = letters.length;

    const timeline = gsap.timeline({
      onComplete: () => {
        this.element.textContent = this.originalText;
      },
    });

    const letterDuration = this.duration / totalLetters;

    for (let i = 0; i < totalLetters; i++) {
      const shuffledArray = [...letters];
      shuffledArray[i] = this.randomChar();
      timeline.to(
        this.element,
        {
          duration: letterDuration,
          textContent: shuffledArray.join(""),
          ease: "none",
        },
        `+=${letterDuration}`
      );
    }

    timeline.repeat(-1); // Repeat indefinitely
  }

  randomChar() {
    const randomIndex = Math.floor(Math.random() * this.chars);
    return this.randChars[randomIndex];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".shuffle");

  elements.forEach((element) => {
    const shuffleInstance = new Shuffle(element, 10.1);

    element.addEventListener("mouseenter", () => {
      shuffleInstance.shuffleText();
    });
  });
});
