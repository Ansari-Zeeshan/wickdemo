const section2 = document.querySelector('.section2');
const section5 = document.querySelector('.section5');
const s2imgdiv = document.querySelectorAll('.section2 .img');
const s5imgdiv = document.querySelectorAll('.section5 .img');
const s2con = document.querySelector('.section2 .content');
const s5con = document.querySelector('.section5 .center-text');
const s3rvlgif = document.querySelectorAll('.section3 .scroll h3');
const gifCon = document.querySelector('.section3 .gif-div img');
const gifCondiv = document.querySelector('.section3 .gif-div');
const giflist = ['gif/attitude.gif', 'gif/gif2.gif', 'gif/gif3.gif', 'gif/gif4.gif']

//confetti falling
var confettiSettings = { 
  target: 'confetti',
  max: 15,
  size: 1.8,
  clock: 11,
  respawn: true,
  props: ['circle', 'circle', 'circle', 'line'],
  colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
  start_from_edge: true,
  rotate: false
};
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

gsap.registerPlugin(ScrollTrigger);

let mbtl = gsap.timeline({defaults: {ease: 'linear'}});
mbtl.to('.banner .mobile .mobile-back', {duration: 8, x: -58, rotate: -29})
mbtl.to('.banner .mobile', {duration: 2, y: -140})

ScrollTrigger.create({
  animation: mbtl,
  trigger: '.banner .mobile',
  start: 'top 75%',
  end: 'top 40%',
  toggleActions: 'restart reverse reverse reverse',
  pinSpaing: true,
  pin: false,
  scrub: 1
}) 

// section 2 animated
gsap.to('.section2',{
  scrollTrigger: 
  {
    trigger: '.section2',
    start: 'top 80%',
    end: 'top center',
    toggleActions: 'restart reverse reverse none',
    pinSpaing: true,
    pin: false
  },
  skewY: 5,
  duration: 0.5,
  transformOrigin: "center left",
  ease: 'power1.in'
})

let s2fadeImgtl = gsap.timeline({defaults: {duarion: 0.5, ease: 'power3.easeInOut'}})
.from('.section2 .img1', {opacity: 0, x: 20, y: 20}) 
.from('.section2 .img2', {opacity: 0, y: 20}, '-=0.5') 
.from('.section2 .img3', {opacity: 0, y: 20}, '-=0.5') 
.from('.section2 .img4', {opacity: 0, x: -20, y: 20}, '-=0.5') 
.from('.section2 .img5', {opacity: 0, x: -20, y: -20}, '-=0.5') 
.from('.section2 .img6', {opacity: 0, y: -20}, '-=0.5') 
.from('.section2 .img7', {opacity: 0, y: -20}, '-=0.5') 
.from('.section2 .img8', {opacity: 0, x: 20, y: -20}, '-=0.5')

ScrollTrigger.create({
  animation: s2fadeImgtl,
  trigger: '.section2',
  start: 'top 65%',
  end: 'bottom bottom',
  scrub: true,
  pinSpacing: true,
  pin: false
})

section2.addEventListener('mousemove', (e)=>{
  let values = moveSection(e);
  let x = values[0];
  let y = values[1];
  moveElement(x,y,s2con);
});
section5.addEventListener('mousemove', (e)=>{
  let values = moveSection(e);
  let [x,y] = values;
  moveElement(x,y,s5con);
});

function moveSection(e){
  e.stopPropagation();
  let move_value = -5;
  let x = (e.clientX * move_value)/150;
  let y = (e.clientY * move_value)/150;
  return [x,y];
}
function moveElement(x,y,elem){
  elem.style.transform = `translate(${x}px, ${y}px) rotateY(${y}deg)`;
}

s2imgdiv.forEach(function(img){
  img.addEventListener('mousemove', function (e){
    moveImg(e,this);
  })

  img.addEventListener('mouseout',function (){
    steadyImg(this);
  }) 
});

s5imgdiv.forEach(function(img){
  img.addEventListener('mousemove', function (e){
    moveImg(e,this);
  })

  img.addEventListener('mouseout',function (){
    steadyImg(this);
  }) 
});

function moveImg(e,img){
  let position = img.getBoundingClientRect();
  let x = e.clientX - position.left - position.width / 2;
  let y = e.clientY - position.top - position.height / 2;
  img.style.transform = `translate(${x*7.5}px, ${y*7.5}px)`;
}
function steadyImg(img){
  img.style.transform = `translate(0px, 0px)`;
}

// section3 animated
ScrollTrigger.matchMedia({
  "(min-width: 750px)": function(){
    const tlCase = gsap.timeline({defaults:{delay:1, ease: 'power1.in'}});
    tlCase.to(".section3 .scroll-div",3,{x: -window.innerWidth *2 + 80})
    
    ScrollTrigger.create({
        animation:  tlCase,
        trigger: '.section3',
        start: 'bottom 100%',
        end: '+=3000',
        scrub: 1,
        pinSpacing: true,
        pin: true
    })
  }
})

s3rvlgif.forEach((all,ind)=>{
  all.imgInd = ind;
  ['mousemove','mouseenter','mouseleave','mouseout'].forEach((e)=>{
      all.addEventListener(e, gifReveal);
  })
})

function gifReveal(e){
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  let ind = this.imgInd;
  if(e.type==='mousemove'){
      let tl = gsap.timeline();
      gifCon.src= giflist[ind];
      tl.to(gifCondiv,{
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        x: mouseX,
        y: mouseY,
        ease: Expo.ease
      })
  }
  else if(e.type==='mouseenter'){
      let tl = gsap.timeline();
      gifCon.src= giflist[ind];
      tl.to(gifCondiv,{
        autoAlpha: 1,
        scale: 1
      })
  }
  else if(e.type==='mouseleave' || e.type==='mouseout'){
    let tl = gsap.timeline();
    gifCon.src= '';
    tl.to(gifCondiv,{
      autoAlpha: 0,
      scale: 0.3
    })
  }
}

// section4 animated
function hoverbtnAnimation(){
  const btnAnime = document.querySelectorAll('.hover-anime');

  btnAnime.forEach(li => {
   let a = li.querySelector('a');
   let text = a.innerText;
   let words = text.split(' ');
   let wordsArr = [];
   let chars = 0;
   a.innerHTML = '';

   words.forEach(word => {
     let html = '';
     [...word].forEach(char=>{
       html += `<span class="char" data-text='${char}' style="--i: ${chars}">${char}</span>`;
       chars++;
     })
     wordsArr.push(`<span class="word">${html}</span>`)
   });
   a.innerHTML=wordsArr.join(' ');
  });
}
hoverbtnAnimation();

// section 5 animated
gsap.to('.section5',{
  scrollTrigger: 
  {
    trigger: '.section5',
    start: 'top 80%',
    end: 'top center',
    toggleActions: 'restart reverse reverse none',
    pinSpaing: true,
    pin: false
  },
  skewY: 5,
  duration: 0.5,
  transformOrigin: "center left",
  ease: 'power1.in'
})

let s5fadeImgtl = gsap.timeline({defaults: {duarion: 1, ease: 'power3.easeInOut'}})
.from('.section5 .img8', {opacity: 0, x: 20, y: 20}) 
.from('.section5 .img1', {opacity: 0, y: 20}, '-=0.5') 
.from('.section5 .img2', {opacity: 0, y: 20}, '-=0.5') 
.from('.section5 .img3', {opacity: 0, x: -20, y: 20}, '-=0.5') 
.from('.section5 .img4', {opacity: 0, x: -20, y: -20}, '-=0.5') 
.from('.section5 .img5', {opacity: 0, y: -20}, '-=0.5') 
.from('.section5 .img6', {opacity: 0, y: -20}, '-=0.5') 
.from('.section5 .img7', {opacity: 0, x: 20, y: -20}, '-=0.5')

ScrollTrigger.create({
  animation: s5fadeImgtl,
  trigger: '.section5',
  start: 'top 65%',
  end: 'bottom bottom',
  scrub: true,
  pinSpacing: true,
  pin: false
})