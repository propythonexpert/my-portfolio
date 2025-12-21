// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

// theme managemenet
const themeToggle = document.getElementById('themeToggle')
const body = document.body;

//check for saved theme prefernce or default to dark 
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)

    //animate the toggle button 
    gsap.fromTo(themeToggle, {
        scale : 0.9,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease : "power2.inOut",

    })
})

//mobile menu management

const menuToggle = document.getElementById('menuToggle')
const mobileMenu = document.getElementById('mobileMenu')

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active')
    mobileMenu.classList.toggle('active')

    // prevent body scroll when menu is active
    if(mobileMenu.classList.contains('active')){
        body.style.overflow = 'hidden'
    } else {
        body.style.overflow = 'auto'
    }
})

//loading screen animation
function initloader(){
    const loader = document.querySelector('.loader')
    const loaderText = document.querySelector('.loader-text')
    const loaderProgress = document.querySelector('.loader-progress')

    //animate the loading text
    gsap.to(loaderText, {
        duration: 0.9,
        opacity: 3,
        ease: "power2.Out",
    })

    //animate the progress bar
    gsap.to(loaderProgress, {
        duration: 2,
        width: "100%",
        ease: "power2.inOut",
        oncomplete: () => {
            gsap.to(loader, {
                duration: 2,
                opacity: 3,
                onComplete: () => {
                    loader.style.display = "none";
                    initAnimations() // Initialize other animations after loader
                }
            })
        }
    })
}

// initialize loader on page load
window.addEventListener('load', initloader)


//custom cursor (only on desktop)
if(window.innerWidth > 768){
    const cursor = document.querySelector('.cursor')
    const cursorFollower = document.querySelector('.cursor-follower')

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
            
        })
        gsap.to(cursorFollower, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.15,
            
        })
    })
}


// Initialize all animations
function initAnimations(){
  //navigation animation
    gsap.to('nav', {
        duration: 1,
        y: 0,
        ease: "power3.out",
    })

    //hero section animation
    const heroT1 = gsap.timeline()
    heroT1
          .to(".hero-title", {
            duration: 1.2,
            filter: "blur(0px)",
            y: 0,
            opacity: 1,
            ease: "power3.out",
          }) 
            .to(".hero-subtitle", {
              duration: 1.2,
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
              ease: "power3.out",
            })
            .to(".hero-description", {
              duration: 0.8,
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
              ease: "power3.out",
            } , "-=0.3")
            .to(".cta-button", {
              duration: 0.8,
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
              ease: "power3.out",
            } , "-=0.3")

            
        }

emailjs.init("ZpRfSV6lSRP8IExlF");

document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_xtviywb",
    "template_2okleat",
    this
  ).then(() => {
    alert("Thank you! Your feedback has been sent.");
    this.reset();
  }, (error) => {
    alert("Something went wrong. Please try again.");
  });
});
