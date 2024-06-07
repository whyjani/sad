// import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvaswwd');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/09gStsys0t6jx7bp/scene.splinecode')
// .then(() => {
//     const BOT = app.findObjectByName("BOT");
//     // gsap.to(BOT.position,{
//     //      y: -500,
//     //     scrollTrigger:{
//     //     trigger: ".wwd-wrap",
//     //             scroller:".smooth-scroll",
//     //             start: "top top",
//     //             end: "1000% bottom",
//     //             scrub: true,
//     //             // markers: true
//     //     }
//     //  });


// });

// gsap.to(".h-wwd-txt h1",{
//     y: -500,
//     duration:1.5,
//     ease:"expo.inOut",
//    scrollTrigger:{
//    trigger: ".wwd-wrap",
//            scroller:".smooth-scroll",
//            start: "top top",
//            end: "300% bottom",
//            scrub: true,
//            // markers: true
//    }
// });
// const ServicesCanvas = document.getElementById('canvas3d');
// const SerivesApp = new Application(ServicesCanvas);

// SerivesApp.load('https://prod.spline.design/JqfvZdJpB8A-jHsh/scene.splinecode')
//     .then(() => {
//         const VISUAL_EFFECTS = SerivesApp.findObjectByName("VISUAL_EFFECTS");
//         const Animation_3D = SerivesApp.findObjectByName("3D_Animation");
//         const Filming = SerivesApp.findObjectByName("Filming");
//         const Content_Creation = SerivesApp.findObjectByName("Content_Creation");
//         const CGI = SerivesApp.findObjectByName("CGI");
//         // const FinAn = [-250, -200, -150, -100, -50];

//         const objects = [VISUAL_EFFECTS, Animation_3D, Filming, Content_Creation, CGI];

//         objects.forEach((obj, i) => {
//             gsap.set(obj.position, { x: 1000 });
//         });

//         // Animate the objects' position and rotationZ simultaneously
//         gsap.to(objects.map(obj => obj.position), {
//             x: -1500, // Ensure each object's x position is mapped correctly
//             stagger: 0.07,
//             // duration:1,
//             ease:"power1.inOut",
//             scrollTrigger: {
//                 trigger: ".wwd-wrap",
//                 scroller:".smooth-scroll",
//                 pin: true,
//                 start: "top top",
//                 end: "800% bottom",
//                 scrub: true,
//                 markers: true
//             }
//         });

// });

import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvaswwd');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/09gStsys0t6jx7bp/scene.splinecode')
// .then(() => {
//     const BOT = app.findObjectByName("BOT");
//     // gsap.to(BOT.position,{
//     //      y: -500,
//     //     scrollTrigger:{
//     //     trigger: ".wwd-wrap",
//     //             scroller:".smooth-scroll",
//     //             start: "top top",
//     //             end: "1000% bottom",
//     //             scrub: true,
//     //             // markers: true
//     //     }
//     //  });


// });

gsap.to(".h-wwd-txt h1",{
    y: -500,
    duration:1.5,
    ease:"expo.inOut",
   scrollTrigger:{
   trigger: ".wwd-wrap",
           scroller:".smooth-scroll",
           start: "top top",
           end: "300% bottom",
           scrub: true,
           // markers: true
   }
});
const ServicesCanvas = document.getElementById('canvas3d');
const SerivesApp = new Application(ServicesCanvas);

SerivesApp.load('https://prod.spline.design/5QU9P7ne66z-XQRi/scene.splinecode')
    .then(() => {
        const VISUAL_EFFECTS = SerivesApp.findObjectByName("VISUAL_EFFECTS");
        const Animation_3D = SerivesApp.findObjectByName("3D_Animation");
        const Filming = SerivesApp.findObjectByName("Filming");
        const Content_Creation = SerivesApp.findObjectByName("Content_Creation");
        const CGI = SerivesApp.findObjectByName("CGI");
        // const FinAn = [-250, -200, -150, -100, -50];

        const objects = [VISUAL_EFFECTS, Animation_3D, Filming, Content_Creation, CGI];

        objects.forEach((obj, i) => {
            gsap.set(obj.position, { x: 1500 });
        });

        // Animate the objects' position and rotationZ simultaneously
        gsap.to(objects.map(obj => obj.position), {
            x: -1500, // Ensure each object's x position is mapped correctly
            stagger: 0.07,
            // duration:1,
            ease:"power1.inOut",
            scrollTrigger: {
                trigger: ".wwd-wrap",
                scroller:".smooth-scroll",
                pin: true,
                start: "top top",
                end: "800% bottom",
                scrub: true,
                // markers: true
            }
        });

});