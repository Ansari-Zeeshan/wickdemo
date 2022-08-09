const section2 = document.querySelector('.section2');
const s2img = document.querySelectorAll('.section2 .img');

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
mbtl.to('.banner .mobile .mobile-back', {duration: 8, x: -55, rotate: -33})
mbtl.to('.banner .mobile', {duration: 2, y: -140})

ScrollTrigger.create({
  animation: mbtl,
  trigger: '.banner .mobile',
  start: 'top 75%',
  end: 'top 40%',
  toggleActions: 'restart reverse reverse reverse',
  pinSpaing: true,
  pin:false,
  scrub: 1
}) 

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
  rotate: 1,
  duration: 0.5,
  transformOrigin: "center left",
  ease: 'power1.in'
})

section2.addEventListener('mousemove', moveSection2);

function moveSection2(e){
  e.stopPropagation();
  s2img.forEach((img)=>{
    let move_value = img.getAttribute('data-speed');
    let x = (e.clientX * move_value)/250;
    let y = (e.clientY * move_value)/250;
    img.style.transform = `translate(${x}px, ${y}px)`
  })
}

s2img.forEach(function(img){
  img.addEventListener('mousemove', function (e){
    let position = this.getBoundingClientRect();
    let x = e.clientX - position.left - position.width / 2;
    let y = e.clientY - position.top - position.height / 2;
    console.log(`${x} and ${y}`);
    this.style.transform = `translate(${x*9}px, ${y*9}px)`;
  })

  img.addEventListener('mouseout',function (){
    this.style.transform = `translate(0px, 0px)`;
  })
});